"use client";

import { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import MagneticButton from "@/components/ui/MagneticButton";
import CardTilt from "@/components/ui/CardTilt";
import { ArrowRight, MapPin, Briefcase, Clock, X, Send, CheckCircle2 } from "lucide-react";

const perks = ["Competitive Salary", "Health Insurance", "Flexible Hours", "Learning Budget", "Latest Equipment", "Patent Contributions", "Team Retreats", "Stock Options"];

const openings = [
  { title: "Senior Robotics Engineer", dept: "Engineering", type: "Full-time", location: "Gurgaon", desc: "Design and develop robotic systems for confined space and height inspection applications. 5+ years experience required." },
  { title: "Embedded Systems Developer", dept: "Engineering", type: "Full-time", location: "Gurgaon", desc: "Develop firmware for robotic control systems, sensor integration, and real-time communication. C/C++ expertise required." },
  { title: "Computer Vision Engineer", dept: "AI/ML", type: "Full-time", location: "Gurgaon / Remote", desc: "Build AI-powered defect detection systems for industrial NDT applications. Python, PyTorch experience required." },
  { title: "Full Stack Developer", dept: "Platform", type: "Full-time", location: "Gurgaon / Remote", desc: "Build our cloud-based robotic operations platform. React, Node.js, and AWS experience preferred." },
  { title: "Business Development Manager", dept: "Sales", type: "Full-time", location: "Gurgaon + Travel", desc: "Drive growth in oil & gas and power sectors. 3+ years B2B industrial sales experience." },
  { title: "Operations Coordinator", dept: "Operations", type: "Full-time", location: "Gurgaon", desc: "Coordinate robot deployments, site assessments, and client communications." },
];

export default function Page() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", coverNote: "" });

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, position: selectedJob }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed");
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedJob(null);
    setSubmitted(false);
    setError("");
    setForm({ name: "", email: "", phone: "", coverNote: "" });
  };

  const inputStyle = { backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)" };

  return (
    <>
      <PageHero badge="CAREERS" title="Join the Robots Revolution" subtitle="Help us build the machines that make hazardous work safe. We're looking for engineers, developers, and dreamers who want to shape the future of Indian robotics." />

      {/* Culture */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-wide">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center" style={{ fontFamily: "var(--font-display)" }}>Why Robotronix?</h2>
          <p className="text-lg max-w-2xl mx-auto text-center mb-12" style={{ color: "var(--text-secondary)" }}>
            We&apos;re a small team solving massive problems. Every person here directly impacts the safety of industrial workers across India.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {perks.map((p) => (
              <div key={p} className="rounded-xl p-4 text-center text-sm font-medium" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="container-wide">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center" style={{ fontFamily: "var(--font-display)" }}>Open Positions</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {openings.map((job) => (
              <CardTilt key={job.title}>
                <div className="rounded-2xl p-6 lg:p-8 group hover:border-accent/40 transition-all" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold group-hover:text-accent transition-colors" style={{ fontFamily: "var(--font-display)" }}>{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}><Briefcase size={12} />{job.dept}</span>
                        <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}><Clock size={12} />{job.type}</span>
                        <span className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}><MapPin size={12} />{job.location}</span>
                      </div>
                      <p className="text-sm mt-3" style={{ color: "var(--text-secondary)" }}>{job.desc}</p>
                    </div>
                    <button onClick={() => setSelectedJob(job.title)} className="shrink-0 px-4 py-2 rounded-xl text-sm font-medium border border-accent/30 text-accent hover:bg-accent/10 transition-all flex items-center gap-2">
                      Apply <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </CardTilt>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-wide text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>Don&apos;t see your role?</h2>
          <p className="mb-6" style={{ color: "var(--text-secondary)" }}>Send us your resume anyway — we&apos;re always looking for exceptional talent.</p>
          <MagneticButton variant="filled" size="lg" href="/contact">Send Your Resume <ArrowRight size={16} /></MagneticButton>
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}>
          <div className="w-full max-w-lg rounded-2xl p-8 relative" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <button onClick={closeModal} className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"><X size={20} /></button>

            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 size={48} className="mx-auto mb-4 text-accent" />
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>Application Submitted!</h3>
                <p className="mb-6" style={{ color: "var(--text-secondary)" }}>Thanks for applying for <strong>{selectedJob}</strong>. We&apos;ll review your application and get back to you.</p>
                <button onClick={closeModal} className="px-6 py-2 rounded-xl text-sm font-medium bg-accent text-black">Close</button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>Apply for</h3>
                <p className="text-accent font-medium mb-6">{selectedJob}</p>
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Full Name *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors" style={inputStyle} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Email *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors" style={inputStyle} placeholder="you@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Phone</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors" style={inputStyle} placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>Cover Note</label>
                    <textarea rows={3} value={form.coverNote} onChange={(e) => setForm({ ...form, coverNote: e.target.value })} className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors resize-none" style={inputStyle} placeholder="Why are you interested in this role?" />
                  </div>
                  {error && <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">{error}</p>}
                  <button type="submit" disabled={loading} className="w-full py-3 rounded-xl text-sm font-bold bg-accent text-black hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50">
                    <Send size={14} /> {loading ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
