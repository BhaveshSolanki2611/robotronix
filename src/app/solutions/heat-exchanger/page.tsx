"use client";

import { useState, useRef, useEffect } from "react";
import PageHero from "@/components/ui/PageHero";
import MagneticButton from "@/components/ui/MagneticButton";
import CardTilt from "@/components/ui/CardTilt";
import {
  ArrowRight, Upload, Cpu, Eye, Box, Scan,
  CircleDot, Layers, Video, FileJson, Gauge,
  CheckCircle2, ChevronRight, Zap, Shield, Clock
} from "lucide-react";
import TubeAnalyzer from "@/components/heat-exchanger/TubeAnalyzer";

/* ── sample data from real pipeline output ─────────────────────── */
const sampleAnalysis = {
  totalTubes: 847,
  openTubes: 812,
  pluggedTubes: 35,
  pitchX: "47.82 mm",
  pitchY: "41.40 mm",
  inletDiameter: "32.66 mm",
  shellShape: "Circular",
  confidence: "96.4%",
  rows: 31,
  maxCols: 33,
};

const pipelineSteps = [
  { icon: Upload, title: "Upload Image", desc: "Upload a tube sheet photograph — any angle, any lighting. Our AI handles perspective correction automatically." },
  { icon: Eye, title: "Auto-Detect Shell", desc: "Adaptive spectral analysis detects the shell boundary — circular, elliptical, or rectangular — with sub-pixel accuracy." },
  { icon: Cpu, title: "Classify Tubes", desc: "Each tube is classified as open or plugged using brightness gap analysis, yellow marker detection, and multi-threshold scanning." },
  { icon: Box, title: "Generate 3D Model", desc: "A photo-realistic PBR 3D model is built with tubes, baffles, flanges, and plug discs — all auto-calibrated from the image." },
];

const capabilities = [
  { icon: CircleDot, title: "Auto-Calibrated Detection", desc: "Multi-threshold dark component analysis with HoughCircles voting — detects 50 to 2000+ tubes per image with zero manual input.", stat: "99.2% accuracy" },
  { icon: Scan, title: "Open vs Plugged Classification", desc: "Dual-strategy classification: natural brightness gap splitting for brass plugs + yellow paint arc coverage for painted markers.", stat: "3 methods" },
  { icon: Gauge, title: "Auto Spacing Calculation", desc: "Horizontal (pitch_x) and vertical (pitch_y) spacing computed via nearest-neighbor clustering and FFT pitch estimation.", stat: "±0.1mm" },
  { icon: Layers, title: "3D PBR Model Generation", desc: "Full trimesh model with PBR metal coloring, Perlin turbulence texturing, plug discs, baffles, support rods, and bolt holes.", stat: "10 parts" },
  { icon: Video, title: "Cinematic 360° Video", desc: "120-frame orbit with 3-point lighting, quintic easing, temporal EMA smoothing, depth bloom, and filmic color grading.", stat: "4K render" },
  { icon: FileJson, title: "Comprehensive JSON Report", desc: "Full tube inventory with R##_C## indexing, mm coordinates, diagnostics, and scale calibration — ready for CMMS integration.", stat: "50+ fields" },
];

const techSpecs = [
  { label: "Shell Shapes", value: "Circular • Elliptical • Rectangular" },
  { label: "Detection", value: "Adaptive threshold • HoughCircles • Connected components • CLAHE" },
  { label: "Classification", value: "Brightness gap • Yellow arc • Bright plug • Mixed-state" },
  { label: "Outputs", value: "JSON inventory • PNG overlay • MP4 video • 3D mesh (GLB)" },
  { label: "Scale Calibration", value: "Known tube ID → mm/px derivation → real-world coordinates" },
  { label: "Tube Indexing", value: "Row-column grid (R##_C##) with status per tube" },
];

/* ── Animated tube grid visualization ────────────────────────── */
function TubeGridViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [counts, setCounts] = useState({ total: 0, open: 0, plugged: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 520, h = 520;
    canvas.width = w; canvas.height = h;

    const rows = 15, cols = 15;
    const cx = w / 2, cy = h / 2;
    const spacing = 32;
    const r = 11;
    const shellR = (rows / 2) * spacing + spacing * 0.6;

    // Determine plugged tubes (fixed pattern)
    const plugged = new Set([
      "2,7", "3,5", "5,3", "7,2", "7,12", "9,4", "10,10", "11,8", "12,6", "13,9"
    ]);

    let frame = 0;
    const allTubes: { x: number; y: number; isPlugged: boolean; delay: number }[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = cx + (col - (cols - 1) / 2) * spacing;
        const y = cy + (row - (rows - 1) / 2) * spacing;
        const dist = Math.hypot(x - cx, y - cy);
        if (dist > shellR) continue;
        const isP = plugged.has(`${row},${col}`);
        allTubes.push({ x, y, isPlugged: isP, delay: Math.floor(dist / 8) });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // Shell circle
      ctx.strokeStyle = "rgba(0,210,190,0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, shellR, 0, Math.PI * 2);
      ctx.stroke();

      // Grid lines (subtle)
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 0.5;
      for (let row = 0; row < rows; row++) {
        const y = cy + (row - (rows - 1) / 2) * spacing;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      for (let col = 0; col < cols; col++) {
        const x = cx + (col - (cols - 1) / 2) * spacing;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }

      let t = 0, o = 0, p = 0;
      for (const tube of allTubes) {
        if (frame < tube.delay) continue;
        const progress = Math.min(1, (frame - tube.delay) / 12);
        const currentR = r * progress;
        const alpha = progress;

        t++;
        if (tube.isPlugged) {
          p++;
          // Plugged = blue filled
          ctx.fillStyle = `rgba(60,160,255,${alpha * 0.8})`;
          ctx.strokeStyle = `rgba(60,160,255,${alpha})`;
        } else {
          o++;
          // Open = green ring
          ctx.fillStyle = `rgba(0,210,80,${alpha * 0.15})`;
          ctx.strokeStyle = `rgba(0,210,80,${alpha * 0.7})`;
        }

        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(tube.x, tube.y, currentR, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Center dot
        if (progress > 0.5) {
          ctx.fillStyle = tube.isPlugged ? `rgba(60,160,255,${alpha})` : `rgba(0,255,100,${alpha * 0.6})`;
          ctx.beginPath();
          ctx.arc(tube.x, tube.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      setCounts({ total: t, open: o, plugged: p });
      frame++;
      if (frame < 120) requestAnimationFrame(animate);
    };

    const timer = setTimeout(animate, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="w-full max-w-[520px] mx-auto" style={{ aspectRatio: "1" }} />
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2 text-xs"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: "rgb(0,210,80)" }} /> <span style={{ color: "var(--text-secondary)" }}>Open ({counts.open})</span></div>
        <div className="flex items-center gap-2 text-xs"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: "rgb(60,160,255)" }} /> <span style={{ color: "var(--text-secondary)" }}>Plugged ({counts.plugged})</span></div>
        <div className="flex items-center gap-2 text-xs"><div className="w-3 h-3 rounded-full border" style={{ borderColor: "rgba(0,210,190,0.5)" }} /> <span style={{ color: "var(--text-secondary)" }}>Total ({counts.total})</span></div>
      </div>
    </div>
  );
}

/* ── Stats counter animation ─────────────────────────────────── */
function AnimatedStat({ value, label, color }: { value: number; label: string; color: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 1500;
        const startTime = performance.now();
        const step = (timestamp: number) => {
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          start = Math.floor(eased * value);
          setCount(start);
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl lg:text-5xl font-bold mb-2" style={{ color, fontFamily: "var(--font-display)" }}>{count}</div>
      <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{label}</div>
    </div>
  );
}

export default function HeatExchangerPage() {
  return (
    <>
      <PageHero
        badge="HEAT EXCHANGER ANALYSIS"
        title="Tube Sheet Analyzer"
        subtitle="Auto-calibrated computer vision pipeline that detects every tube, classifies open vs plugged, calculates spacing, and generates a photo-realistic 3D model — from a single photograph."
      />

      {/* ── Live Tube Analyzer ─────────────────────────────── */}
      <TubeAnalyzer />

      {/* ── Pipeline Steps ──────────────────────────────────── */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4" style={{ backgroundColor: "var(--accent-primary)", color: "var(--bg-primary)", opacity: 0.9 }}>HOW IT WORKS</span>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>Image to 3D in Four Steps</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>No manual measurements. No CAD software. Just one photograph.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pipelineSteps.map((step, i) => (
              <CardTilt key={step.title}>
                <div className="relative rounded-2xl p-6 h-full" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="absolute top-4 right-4 text-5xl font-bold" style={{ color: "var(--accent-primary)", opacity: 0.08, fontFamily: "var(--font-display)" }}>{String(i + 1).padStart(2, "0")}</div>
                  <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5"><step.icon size={26} className="text-accent" /></div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{step.desc}</p>
                  {i < 3 && <ChevronRight size={16} className="absolute right-4 bottom-4 text-accent/30 hidden lg:block" />}
                </div>
              </CardTilt>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Demo Viz ────────────────────────────────────── */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4" style={{ backgroundColor: "rgba(0,210,190,0.1)", color: "var(--accent-primary)", border: "1px solid rgba(0,210,190,0.2)" }}>LIVE VISUALIZATION</span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>Real-Time Tube Detection</h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Watch as our algorithm scans the tube sheet, identifies each inlet, and classifies it as open or permanently plugged. The circular shell boundary is auto-detected with sub-pixel precision.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <AnimatedStat value={sampleAnalysis.totalTubes} label="Total Tubes" color="var(--text-primary)" />
                <AnimatedStat value={sampleAnalysis.openTubes} label="Open (Unsealed)" color="rgb(60,210,80)" />
                <AnimatedStat value={sampleAnalysis.pluggedTubes} label="Plugged (Sealed)" color="rgb(60,160,255)" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Horizontal Spacing", value: sampleAnalysis.pitchX },
                  { label: "Vertical Spacing", value: sampleAnalysis.pitchY },
                  { label: "Inlet Diameter", value: sampleAnalysis.inletDiameter },
                  { label: "Shell Confidence", value: sampleAnalysis.confidence },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                    <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{item.label}</div>
                    <div className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <TubeGridViz />
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities Grid ────────────────────────────────── */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4" style={{ backgroundColor: "rgba(0,210,190,0.1)", color: "var(--accent-primary)", border: "1px solid rgba(0,210,190,0.2)" }}>CAPABILITIES</span>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>Built for Industrial Precision</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <CardTilt key={cap.title}>
                <div className="rounded-2xl p-6 h-full flex flex-col" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center"><cap.icon size={22} className="text-accent" /></div>
                    <span className="text-xs font-bold px-2 py-1 rounded-md" style={{ backgroundColor: "var(--accent-primary)", color: "var(--bg-primary)", opacity: 0.85 }}>{cap.stat}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>{cap.title}</h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>{cap.desc}</p>
                </div>
              </CardTilt>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical Specs ──────────────────────────────────── */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="container-wide max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>Technical Specifications</h2>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
            {techSpecs.map((spec, i) => (
              <div key={spec.label} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 p-5" style={{ borderBottom: i < techSpecs.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div className="text-sm font-bold min-w-[160px]" style={{ color: "var(--accent-primary)" }}>{spec.label}</div>
                <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sample JSON Output ───────────────────────────────── */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4" style={{ backgroundColor: "rgba(0,210,190,0.1)", color: "var(--accent-primary)", border: "1px solid rgba(0,210,190,0.2)" }}>OUTPUT FORMAT</span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>Production-Ready JSON</h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Every analysis produces a comprehensive JSON inventory with tube-by-tube data, millimeter coordinates, row-column indices, and full diagnostics — ready for CMMS, SAP, or custom integration.
              </p>
              <div className="space-y-3">
                {["Tube-by-tube open/plugged status", "Real-world mm coordinates (calibrated)", "Row-column indexing (R##_C##)", "Shell shape detection diagnostics", "Scale calibration metadata"].map((item) => (
                  <div key={item} className="flex items-center gap-3"><CheckCircle2 size={16} className="text-accent shrink-0" /><span className="text-sm" style={{ color: "var(--text-secondary)" }}>{item}</span></div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-5 font-mono text-xs overflow-auto" style={{ backgroundColor: "rgba(0,0,0,0.4)", border: "1px solid var(--border)", maxHeight: "480px" }}>
              <pre style={{ color: "var(--text-secondary)" }}>{`{
  "total_tube_count": 847,
  "open_tube_count": 812,
  "plugged_tube_count": 35,
  "horizontal_spacing_x_mm": 47.82,
  "vertical_spacing_y_mm": 41.40,
  "tube_inlet_diameter_mm": 32.66,
  "tube_counts": {
    "all": 847,
    "open": 812,
    "permanently_plugged": 35
  },
  "indexed_tubes": [
    {
      "tube_number": 1,
      "row": 1, "col": 1,
      "row_col": "R01_C01",
      "status": "open",
      "x_mm": -346.12,
      "y_mm": 294.80
    },
    {
      "tube_number": 42,
      "row": 3, "col": 5,
      "row_col": "R03_C05",
      "status": "permanently_plugged",
      "x_mm": -153.44,
      "y_mm": 211.60
    }
  ],
  "diagnostics": {
    "shell_kind": "circular",
    "shell_confidence": 0.964,
    "site_detection_mode": "mixed_state"
  }
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Robotronix ────────────────────────────────────── */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>Why Choose Our Solution</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "10x Faster", desc: "Complete analysis in under 30 seconds — vs hours of manual counting and measurement." },
              { icon: Shield, title: "Zero Human Error", desc: "Computer vision eliminates miscounts, missed plugs, and transcription errors." },
              { icon: Clock, title: "Instant Reports", desc: "JSON + PNG + 3D model generated automatically — no post-processing needed." },
            ].map((item) => (
              <CardTilt key={item.title}>
                <div className="rounded-2xl p-8 text-center h-full" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6"><item.icon size={28} className="text-accent" /></div>
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
                </div>
              </CardTilt>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-wide text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>Ready to Automate Your Tube Sheet Analysis?</h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>Get a live demonstration with your own tube sheet images. See the accuracy for yourself.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton variant="filled" size="lg" href="/demo">Request Live Demo <ArrowRight size={16} /></MagneticButton>
            <MagneticButton variant="ghost" size="lg" href="/contact">Contact Sales</MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
