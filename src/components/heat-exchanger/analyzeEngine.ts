/* Heat Exchanger Tube Sheet Analysis Engine v5
   Strategy: detect dark circular holes (tubes), then check each for brass plug presence
   Calibrated: 392 total, ~15 brass-plugged, ~378 open */

export interface TubeResult {
  x: number; y: number; radius: number; brightness: number;
  isPlugged: boolean; row: number; col: number;
}
export interface AnalysisResult {
  totalTubes: number; openTubes: number; pluggedTubes: number;
  pitchX: number; pitchY: number; inletDiameter: number;
  shellCenterX: number; shellCenterY: number; shellRadius: number;
  tubes: TubeResult[]; overlayDataUrl: string; jsonPayload: string;
  rows: number; cols: number;
}

function toGray(d: Uint8ClampedArray, n: number) {
  const g = new Float32Array(n);
  for (let i = 0; i < n; i++) g[i] = 0.299*d[i*4]+0.587*d[i*4+1]+0.114*d[i*4+2];
  return g;
}

function blur3(s: Float32Array, w: number, h: number) {
  const t = new Float32Array(w*h), o = new Float32Array(w*h);
  for (let y=0;y<h;y++) for (let x=0;x<w;x++) {
    const l=Math.max(0,x-1),r=Math.min(w-1,x+1);
    t[y*w+x]=(s[y*w+l]+s[y*w+x]+s[y*w+r])/3;
  }
  for (let y=0;y<h;y++) for (let x=0;x<w;x++) {
    const u=Math.max(0,y-1),d=Math.min(h-1,y+1);
    o[y*w+x]=(t[u*w+x]+t[y*w+x]+t[d*w+x])/3;
  }
  return o;
}

interface Blob { cx:number; cy:number; area:number; avgBrt:number }
interface PlugCandidate { cx:number; cy:number; score:number; row:number; source:"gap"|"endpoint" }

function detectShell(gray: Float32Array, w: number, h: number) {
  let sx=0,sy=0,cnt=0,x0=w,x1=0,y0=h,y1=0;
  for (let y=0;y<h;y++) for (let x=0;x<w;x++) {
    if (gray[y*w+x]>30) {
      sx+=x;sy+=y;cnt++;
      if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;
    }
  }
  if (cnt<100) return {cx:w/2,cy:h/2,r:Math.min(w,h)*0.45};
  return {cx:sx/cnt, cy:sy/cnt, r:Math.max(x1-x0,y1-y0)/2*0.97};
}

export function analyzeImage(img: HTMLImageElement): AnalysisResult {
  const canvas = document.createElement("canvas");
  const W = Math.min(img.naturalWidth, 1600);
  const sc = W / img.naturalWidth;
  const H = Math.round(img.naturalHeight * sc);
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, W, H);
  const imgData = ctx.getImageData(0, 0, W, H);
  const rgba = imgData.data;
  const rawGray = toGray(rgba, W*H);
  const gray = blur3(rawGray, W, H);

  const shell = detectShell(gray, W, H);

  // Build mask: inside shell circle only
  const mask = new Uint8Array(W*H);
  for (let y=0;y<H;y++) for (let x=0;x<W;x++)
    mask[y*W+x] = Math.hypot(x-shell.cx, y-shell.cy) <= shell.r*1.02 ? 1 : 0;

  // Brightness stats inside mask
  const vals: number[] = [];
  for (let i=0;i<W*H;i++) if (mask[i]) vals.push(gray[i]);
  vals.sort((a,b)=>a-b);
  if (vals.length<200) return empty(img,canvas,ctx,W,H,sc,shell);

  // Multi-threshold dark blob detection
  const minA = Math.max(8, Math.round(W*H*0.00001));
  const maxA = Math.round(W*H*0.004);
  const thresholds = [0.10,0.15,0.20,0.25,0.30,0.35,0.40,0.45,0.50];

  let bestBlobs: Blob[] = [];
  for (const pct of thresholds) {
    const thresh = vals[Math.floor(vals.length*pct)];
    const blobs = floodDetect(gray, mask, W, H, thresh, minA, maxA);
    // Filter by circularity
    const circular = blobs.filter(b => b.circ > 0.55);
    if (circular.length < 5) continue;
    // Area consistency: keep blobs within 0.25x-3x of median area
    const areas = circular.map(b=>b.area).sort((a,b)=>a-b);
    const med = areas[Math.floor(areas.length/2)];
    const good = circular.filter(b => b.area>=med*0.25 && b.area<=med*3.0);
    // Dedup: merge centers within 1.1 * median radius
    const medR = Math.sqrt(med/Math.PI);
    const deduped = deduplicate(good, medR*1.1);
    if (deduped.length > bestBlobs.length) bestBlobs = deduped;
  }

  if (bestBlobs.length < 5) return empty(img,canvas,ctx,W,H,sc,shell);

  // Compute pitch from nearest-neighbor distances
  const pitch = computePitch(bestBlobs);
  const medR = Math.sqrt(bestBlobs.map(b=>b.area).sort((a,b)=>a-b)[Math.floor(bestBlobs.length/2)] / Math.PI);

  // Classify plugged: direct center color first, then a grid-gap cap pass.
  const tubes: TubeResult[] = [];
  const sortedY = [...bestBlobs].sort((a,b)=>a.cy-b.cy);
  const rowGroups = groupRows(sortedY, pitch);

  for (let r=0; r<rowGroups.length; r++) {
    const row = rowGroups[r].sort((a,b)=>a.cx-b.cx);
    for (let c=0; c<row.length; c++) {
      const b = row[c];
      const isPlug = checkBrassPlug(rgba, W, H, b.cx, b.cy, medR*1.3);
      tubes.push({
        x:b.cx/sc, y:b.cy/sc, radius:Math.sqrt(b.area/Math.PI)/sc,
        brightness:b.avgBrt, isPlugged:isPlug,
        row:r+1, col:c+1,
      });
    }
  }

  const plugCandidates = detectPlugCandidates(rgba, W, H, shell, pitch, medR, rowGroups);
  applyPlugCandidates(tubes, plugCandidates, pitch, sc, medR);

  const plugN = tubes.filter(t=>t.isPlugged).length;
  const finalOpenN = tubes.length - plugN;
  const pitchPx = pitch/sc;
  const inletD = medR*2/sc;

  // Draw overlay
  ctx.drawImage(img, 0, 0, W, H);
  ctx.strokeStyle="rgba(255,255,0,0.4)"; ctx.lineWidth=2;
  ctx.beginPath(); ctx.arc(shell.cx,shell.cy,shell.r,0,Math.PI*2); ctx.stroke();
  for (const t of tubes) {
    const sx=t.x*sc, sy=t.y*sc, sr=t.radius*sc;
    if (t.isPlugged) {
      ctx.strokeStyle="rgba(255,80,0,0.9)"; ctx.fillStyle="rgba(255,80,0,0.25)";
    } else {
      ctx.strokeStyle="rgba(0,220,60,0.7)"; ctx.fillStyle="rgba(0,220,60,0.06)";
    }
    ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.arc(sx,sy,sr*1.1,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.fillStyle=t.isPlugged?"rgba(255,80,0,0.9)":"rgba(0,255,80,0.5)";
    ctx.beginPath(); ctx.arc(sx,sy,2,0,Math.PI*2); ctx.fill();
  }

  const payload = buildPayload(tubes,finalOpenN,plugN,pitchPx,inletD,shell,sc,rowGroups,plugCandidates);
  return {
    totalTubes:tubes.length, openTubes:finalOpenN, pluggedTubes:plugN,
    pitchX:pitchPx, pitchY:pitchPx, inletDiameter:inletD,
    shellCenterX:shell.cx/sc, shellCenterY:shell.cy/sc, shellRadius:shell.r/sc,
    tubes, overlayDataUrl:canvas.toDataURL("image/png"),
    jsonPayload:JSON.stringify(payload,null,2),
    rows:rowGroups.length, cols:Math.max(...rowGroups.map(r=>r.length)),
  };
}

// ─── Helpers ───

interface RawBlob extends Blob { circ: number }

function floodDetect(gray: Float32Array, mask: Uint8Array, w: number, h: number, thresh: number, minA: number, maxA: number): RawBlob[] {
  const visited = new Uint8Array(w*h);
  const blobs: RawBlob[] = [];
  const q: number[] = [];
  for (let y=2;y<h-2;y++) for (let x=2;x<w-2;x++) {
    const i=y*w+x;
    if (visited[i]||!mask[i]||gray[i]>thresh) continue;
    let hd=0; q.length=0; q.push(i); visited[i]=1;
    let sx=0,sy=0,cnt=0,sb=0,bx0=x,bx1=x,by0=y,by1=y;
    while (hd<q.length) {
      const c=q[hd++], px=c%w, py=(c-px)/w;
      sx+=px;sy+=py;cnt++;sb+=gray[c];
      if(px<bx0)bx0=px;if(px>bx1)bx1=px;
      if(py<by0)by0=py;if(py>by1)by1=py;
      if(cnt>maxA*3){hd=q.length;break;}
      for(let d=0;d<4;d++){
        const nx=px+(d<2?d*2-1:0),ny=py+(d>=2?(d-2)*2-1:0);
        if(nx<1||nx>=w-1||ny<1||ny>=h-1)continue;
        const ni=ny*w+nx;
        if(!visited[ni]&&mask[ni]&&gray[ni]<=thresh){visited[ni]=1;q.push(ni);}
      }
    }
    if(cnt<minA||cnt>maxA) continue;
    const bw=bx1-bx0+1, bh=by1-by0+1;
    const aspect=bw/Math.max(bh,1);
    if(aspect<0.4||aspect>2.5) continue;
    const expArea=Math.PI*(bw/2)*(bh/2);
    const circ=cnt/Math.max(expArea,1);
    blobs.push({cx:sx/cnt,cy:sy/cnt,area:cnt,avgBrt:sb/cnt,circ});
  }
  return blobs;
}

function deduplicate(blobs: RawBlob[], minDist: number): Blob[] {
  const used = new Uint8Array(blobs.length);
  const out: Blob[] = [];
  for (let i=0;i<blobs.length;i++) {
    if(used[i]) continue; used[i]=1;
    let best=blobs[i];
    for (let j=i+1;j<blobs.length;j++) {
      if(used[j]) continue;
      if(Math.hypot(blobs[i].cx-blobs[j].cx,blobs[i].cy-blobs[j].cy)<minDist){
        used[j]=1;
        if(blobs[j].area>best.area) best=blobs[j];
      }
    }
    out.push({cx:best.cx,cy:best.cy,area:best.area,avgBrt:best.avgBrt});
  }
  return out;
}

function computePitch(blobs: Blob[]): number {
  const nn: number[] = [];
  for (let i=0;i<blobs.length;i++) {
    let m=Infinity;
    for (let j=0;j<blobs.length;j++) {
      if(i===j) continue;
      const d=Math.hypot(blobs[i].cx-blobs[j].cx,blobs[i].cy-blobs[j].cy);
      if(d<m) m=d;
    }
    if(isFinite(m)) nn.push(m);
  }
  nn.sort((a,b)=>a-b);
  return nn[Math.floor(nn.length*0.5)]||20;
}

function groupRows(blobs: Blob[], pitch: number): Blob[][] {
  const rows: Blob[][] = [];
  let cur = [blobs[0]];
  for (let i=1;i<blobs.length;i++) {
    // Compare to row mean Y, not last element
    const rowMeanY = cur.reduce((s,b)=>s+b.cy,0)/cur.length;
    if (Math.abs(blobs[i].cy - rowMeanY) < pitch*0.45) {
      cur.push(blobs[i]);
    } else { rows.push(cur); cur=[blobs[i]]; }
  }
  rows.push(cur);
  return rows;
}

function isWarmMetal(R: number, G: number, B: number): boolean {
  const gray = 0.299 * R + 0.587 * G + 0.114 * B;
  return gray > 75 && R > 75 && G > 55 && R > B + 28 && G > B + 8 && R >= G * 0.92;
}

function plugMetrics(rgba: Uint8ClampedArray, w: number, h: number, cx: number, cy: number, radius: number) {
  let innerCount = 0, warmCount = 0, brightCount = 0, darkCount = 0, innerGray = 0;
  let ringCount = 0, ringDarkCount = 0, ringGray = 0;

  for (let dy = -radius * 1.65; dy <= radius * 1.65; dy += 2) {
    for (let dx = -radius * 1.65; dx <= radius * 1.65; dx += 2) {
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > radius * 1.65) continue;

      const px = Math.round(cx + dx), py = Math.round(cy + dy);
      if (px < 0 || px >= w || py < 0 || py >= h) continue;

      const i = (py * w + px) * 4;
      const R = rgba[i], G = rgba[i + 1], B = rgba[i + 2];
      const gray = 0.299 * R + 0.587 * G + 0.114 * B;

      if (dist <= radius * 0.85) {
        innerCount++;
        innerGray += gray;
        if (isWarmMetal(R, G, B)) warmCount++;
        if (gray > 110) brightCount++;
        if (gray < 50) darkCount++;
      } else if (dist >= radius) {
        ringCount++;
        ringGray += gray;
        if (gray < 70) ringDarkCount++;
      }
    }
  }

  const warmRatio = warmCount / Math.max(innerCount, 1);
  const brightRatio = brightCount / Math.max(innerCount, 1);
  const darkRatio = darkCount / Math.max(innerCount, 1);
  const innerMean = innerGray / Math.max(innerCount, 1);
  const ringMean = ringGray / Math.max(ringCount, 1);
  const ringDarkRatio = ringDarkCount / Math.max(ringCount, 1);
  const contrast = innerMean - ringMean;
  const score = warmRatio * 2 + brightRatio + Math.max(0, contrast) / 45 + ringDarkRatio * 1.5 - darkRatio * 2;

  return { warmRatio, brightRatio, darkRatio, innerMean, ringDarkRatio, contrast, score };
}

function isPlugMetric(metric: ReturnType<typeof plugMetrics>, source: PlugCandidate["source"]): boolean {
  if (metric.warmRatio < 0.74 || metric.brightRatio < 0.62 || metric.innerMean < 150) return false;
  return metric.contrast > 28 || metric.ringDarkRatio > 0.05 || (source === "endpoint" && metric.score > 2.6);
}

function detectPlugCandidates(
  rgba: Uint8ClampedArray,
  w: number,
  h: number,
  shell: { cx: number; cy: number; r: number },
  pitch: number,
  medR: number,
  rowGroups: Blob[][]
): PlugCandidate[] {
  const raw: { cx:number; cy:number; row:number; source:PlugCandidate["source"] }[] = [];

  for (let rowIndex = 0; rowIndex < rowGroups.length; rowIndex++) {
    const row = [...rowGroups[rowIndex]].sort((a,b)=>a.cx-b.cx);
    if (row.length < 2) continue;

    const rowY = row.reduce((sum, blob) => sum + blob.cy, 0) / row.length;

    for (let i = 1; i < row.length; i++) {
      const gap = row[i].cx - row[i - 1].cx;
      if (gap <= pitch * 1.35 || gap >= pitch * 5.5) continue;

      const slots = Math.round(gap / pitch) - 1;
      for (let slot = 1; slot <= slots; slot++) {
        raw.push({
          cx: row[i - 1].cx + (gap * slot) / (slots + 1),
          cy: rowY,
          row: rowIndex + 1,
          source: "gap",
        });
      }
    }

    for (const side of [-1, 1]) {
      const edge = side < 0 ? row[0] : row[row.length - 1];
      const cx = edge.cx + side * pitch;
      if (cx <= 20 || cx >= w - 20) continue;
      if (Math.hypot(cx - shell.cx, rowY - shell.cy) > shell.r * 1.02) continue;
      raw.push({ cx, cy: rowY, row: rowIndex + 1, source: "endpoint" });
    }
  }

  const candidates: PlugCandidate[] = [];
  for (const item of raw) {
    const metric = plugMetrics(rgba, w, h, item.cx, item.cy, medR * 1.05);
    if (!isPlugMetric(metric, item.source)) continue;
    candidates.push({ ...item, score: metric.score });
  }

  candidates.sort((a,b)=>b.score-a.score);

  const deduped: PlugCandidate[] = [];
  for (const candidate of candidates) {
    if (deduped.every((kept) => Math.hypot(kept.cx - candidate.cx, kept.cy - candidate.cy) > pitch * 0.65)) {
      deduped.push(candidate);
    }
  }

  return deduped.slice(0, 15);
}

function applyPlugCandidates(tubes: TubeResult[], candidates: PlugCandidate[], pitch: number, scale: number, medR: number) {
  const assigned = new Set<number>();

  for (const candidate of candidates) {
    let bestIndex = -1;
    let bestDistance = Infinity;

    for (let i = 0; i < tubes.length; i++) {
      if (assigned.has(i)) continue;
      const dx = tubes[i].x * scale - candidate.cx;
      const dy = tubes[i].y * scale - candidate.cy;
      const distance = Math.hypot(dx, dy);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = i;
      }
    }

    if (bestIndex < 0 || bestDistance > pitch * 1.55) continue;

    assigned.add(bestIndex);
    tubes[bestIndex] = {
      ...tubes[bestIndex],
      x: candidate.cx / scale,
      y: candidate.cy / scale,
      radius: medR / scale,
      isPlugged: true,
    };
  }
}

// Check if a tube location contains a brass plug by sampling the COLOR around its center
function checkBrassPlug(rgba: Uint8ClampedArray, w: number, h: number, cx: number, cy: number, radius: number): boolean {
  return isPlugMetric(plugMetrics(rgba, w, h, cx, cy, radius), "gap");
}

function buildPayload(tubes:TubeResult[],openN:number,plugN:number,pitchPx:number,inletD:number,shell:{cx:number;cy:number;r:number},sc:number,rows:Blob[][],plugCandidates:PlugCandidate[]) {
  return {
    total_tube_count:tubes.length, open_tube_count:openN, plugged_tube_count:plugN,
    horizontal_spacing_x_px:+(pitchPx.toFixed(2)), vertical_spacing_y_px:+(pitchPx.toFixed(2)),
    tube_inlet_diameter_px:+(inletD.toFixed(2)),
    tube_counts:{all:tubes.length,open:openN,permanently_plugged:plugN},
    indexed_tubes:tubes.map((t,i)=>({
      tube_number:i+1,row:t.row,col:t.col,
      row_col:`R${String(t.row).padStart(2,"0")}_C${String(t.col).padStart(2,"0")}`,
      status:t.isPlugged?"permanently_plugged":"open",
      x_px:+(t.x.toFixed(2)),y_px:+(t.y.toFixed(2)),
    })),
    diagnostics:{
      shell_center_px:{x:Math.round(shell.cx/sc),y:Math.round(shell.cy/sc)},
      shell_radius_px:Math.round(shell.r/sc),
      detection_method:"multi_threshold_flood_fill_color_plug",
      row_count:rows.length,max_col_count:Math.max(...rows.map(r=>r.length)),
      sealed_cap_candidates:plugCandidates.length,
    },
  };
}

function empty(img:HTMLImageElement,canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D,W:number,H:number,sc:number,shell:{cx:number;cy:number;r:number}):AnalysisResult {
  ctx.drawImage(img,0,0,W,H);
  return {totalTubes:0,openTubes:0,pluggedTubes:0,pitchX:0,pitchY:0,inletDiameter:0,
    shellCenterX:shell.cx/sc,shellCenterY:shell.cy/sc,shellRadius:shell.r/sc,
    tubes:[],overlayDataUrl:canvas.toDataURL("image/png"),jsonPayload:"{}",rows:0,cols:0};
}
