"use client";
import { useState, useRef, useCallback } from "react";
import { Upload, Download, Loader2, CircleDot, BarChart3 } from "lucide-react";
import { analyzeImage, type AnalysisResult } from "./analyzeEngine";

/* ── Main component ───────────────────────────────────────────── */
export default function TubeAnalyzer() {
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<"overlay" | "stats" | "json">("overlay");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    setResult(null);
    const url = URL.createObjectURL(f);
    setPreview(url);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith("image/")) handleFile(f);
  }, [handleFile]);

  const runAnalysis = useCallback(() => {
    if (!preview) return;
    setAnalyzing(true);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // Use setTimeout to avoid blocking UI
      setTimeout(() => {
        const res = analyzeImage(img);
        setResult(res);
        setAnalyzing(false);
      }, 100);
    };
    img.src = preview;
  }, [preview]);

  const downloadJSON = useCallback(() => {
    if (!result) return;
    const blob = new Blob([result.jsonPayload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `tube_analysis_${Date.now()}.json`; a.click();
    URL.revokeObjectURL(url);
  }, [result]);

  const downloadOverlay = useCallback(() => {
    if (!result) return;
    const a = document.createElement("a"); a.href = result.overlayDataUrl;
    a.download = `tube_overlay_${Date.now()}.png`; a.click();
  }, [result]);

  return (
    <section className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4" style={{ backgroundColor: "var(--accent-primary)", color: "var(--bg-primary)" }}>
            LIVE ANALYZER
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Upload &amp; Analyze
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Upload a tube sheet image. Our analyzer detects tubes, classifies open vs plugged, and calculates spacing — all in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Upload */}
          <div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} suppressHydrationWarning />
            
            {!preview ? (
              <div
                onClick={() => fileRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                className="rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-accent/50 min-h-[400px]"
                style={{ backgroundColor: "var(--bg-card)", border: "2px dashed var(--border)" }}
              >
                <Upload size={48} className="text-accent mb-4" />
                <p className="text-lg font-semibold mb-2">Drop image here or click to upload</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>Supports JPG, PNG • Max 20MB</p>
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element -- Preview uses browser object URLs and generated canvas data URLs. */}
                  <img src={result?.overlayDataUrl || preview} alt="Tube sheet" className="w-full object-contain" style={{ maxHeight: "500px" }} />
                  {analyzing && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
                      <div className="text-center">
                        <Loader2 size={40} className="text-accent animate-spin mx-auto mb-3" />
                        <p className="text-sm font-semibold">Analyzing tube sheet...</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 flex gap-3 flex-wrap">
                  <button onClick={runAnalysis} disabled={analyzing} className="px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors" style={{ backgroundColor: "var(--accent-primary)", color: "var(--bg-primary)", opacity: analyzing ? 0.5 : 1 }} suppressHydrationWarning>
                    {analyzing ? <Loader2 size={14} className="animate-spin" /> : <CircleDot size={14} />}
                    {analyzing ? "Analyzing..." : result ? "Re-Analyze" : "Analyze Image"}
                  </button>
                  <button onClick={() => { setPreview(null); setResult(null); }} className="px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }} suppressHydrationWarning>
                    Clear
                  </button>
                  {result && (
                    <>
                      <button onClick={downloadOverlay} className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }} suppressHydrationWarning>
                        <Download size={14} /> Overlay PNG
                      </button>
                      <button onClick={downloadJSON} className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }} suppressHydrationWarning>
                        <Download size={14} /> JSON Report
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right: Results */}
          <div>
            {!result ? (
              <div className="rounded-2xl p-12 flex flex-col items-center justify-center min-h-[400px]" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <BarChart3 size={48} className="mb-4" style={{ color: "var(--text-muted)" }} />
                <p className="text-lg font-semibold mb-2" style={{ color: "var(--text-muted)" }}>Results will appear here</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>Upload an image and click Analyze</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Stats cards */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Total Tubes", value: result.totalTubes, color: "var(--text-primary)" },
                    { label: "Open", value: result.openTubes, color: "rgb(60,210,80)" },
                    { label: "Plugged", value: result.pluggedTubes, color: "rgb(60,160,255)" },
                  ].map(s => (
                    <div key={s.label} className="rounded-xl p-4 text-center" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                      <div className="text-3xl font-bold mb-1" style={{ color: s.color, fontFamily: "var(--font-display)" }}>{s.value}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Spacing / Dimensions */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "H-Spacing", value: `${result.pitchX.toFixed(1)} px` },
                    { label: "V-Spacing", value: `${result.pitchY.toFixed(1)} px` },
                    { label: "Inlet Diameter", value: `${result.inletDiameter.toFixed(1)} px` },
                    { label: "Grid", value: `${result.rows}R × ${result.cols}C` },
                  ].map(s => (
                    <div key={s.label} className="rounded-xl p-3" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                      <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                      <div className="text-sm font-bold">{s.value}</div>
                    </div>
                  ))}
                </div>

                {/* Tab switcher */}
                <div className="flex gap-1 rounded-lg p-1" style={{ backgroundColor: "var(--bg-secondary)" }}>
                  {(["overlay", "stats", "json"] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className="flex-1 px-3 py-2 rounded-md text-xs font-semibold transition-colors capitalize" style={{ backgroundColor: activeTab === tab ? "var(--bg-card)" : "transparent", color: activeTab === tab ? "var(--text-primary)" : "var(--text-muted)" }} suppressHydrationWarning>
                      {tab === "overlay" ? "Tube Map" : tab === "stats" ? "Details" : "JSON"}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="rounded-xl overflow-auto" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", maxHeight: "320px" }}>
                  {activeTab === "overlay" && (
                    <div className="p-4 space-y-2">
                      {result.tubes.slice(0, 50).map((t, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs py-1" style={{ borderBottom: "1px solid var(--border)" }}>
                          <span className="w-6 text-right font-mono" style={{ color: "var(--text-muted)" }}>{i + 1}</span>
                          <span className="font-mono">{`R${String(t.row).padStart(2,"0")}_C${String(t.col).padStart(2,"0")}`}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${t.isPlugged ? "text-blue-400 bg-blue-400/10" : "text-green-400 bg-green-400/10"}`}>
                            {t.isPlugged ? "PLUGGED" : "OPEN"}
                          </span>
                          <span className="ml-auto font-mono" style={{ color: "var(--text-muted)" }}>{Math.round(t.x)}, {Math.round(t.y)}</span>
                        </div>
                      ))}
                      {result.tubes.length > 50 && <p className="text-xs text-center py-2" style={{ color: "var(--text-muted)" }}>... and {result.tubes.length - 50} more tubes</p>}
                    </div>
                  )}
                  {activeTab === "stats" && (
                    <div className="p-4 space-y-3">
                      {[
                        { l: "Total Tubes Detected", v: result.totalTubes },
                        { l: "Open (Unsealed)", v: result.openTubes },
                        { l: "Plugged (Sealed)", v: result.pluggedTubes },
                        { l: "Plug Rate", v: result.totalTubes > 0 ? `${((result.pluggedTubes / result.totalTubes) * 100).toFixed(1)}%` : "N/A" },
                        { l: "Horizontal Spacing", v: `${result.pitchX.toFixed(2)} px` },
                        { l: "Vertical Spacing", v: `${result.pitchY.toFixed(2)} px` },
                        { l: "Inlet Diameter", v: `${result.inletDiameter.toFixed(2)} px` },
                        { l: "Rows", v: result.rows },
                        { l: "Max Columns", v: result.cols },
                        { l: "Shell Radius", v: `${result.shellRadius.toFixed(1)} px` },
                      ].map(s => (
                        <div key={s.l} className="flex justify-between text-sm" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>
                          <span style={{ color: "var(--text-secondary)" }}>{s.l}</span>
                          <span className="font-bold">{s.v}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === "json" && (
                    <pre className="p-4 text-xs font-mono overflow-auto" style={{ color: "var(--text-secondary)" }}>
                      {result.jsonPayload}
                    </pre>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
