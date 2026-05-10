"use client";

import { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import MagneticButton from "@/components/ui/MagneticButton";
import { CheckCircle2, Play, Calendar, Clock, MapPin, Send } from "lucide-react";

const demoTypes = [
  { id: "live", title: "Live On-Site Demo", desc: "We bring a robot to your facility for a hands-on demonstration.", icon: MapPin },
  { id: "virtual", title: "Virtual Demo", desc: "30-minute video call with live robot footage and Q&A.", icon: Play },
  { id: "assessment", title: "Free Site Assessment", desc: "Our team evaluates your site and recommends the optimal solution.", icon: Calendar },
];

export default function Page() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDemo, setSelectedDemo] = useState<string>("virtual");
  const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "", date: "", notes: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, demoType: selectedDemo }),
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputStyle = {
    backgroundColor: "var(--bg-card)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
  };

  return (
    <>
      <PageHero badge="SCHEDULE A DEMO" title="See Robotronix in Action" subtitle="Experience our patent-granted robots firsthand. Choose your preferred demo format and we'll set everything up." />

      <section className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="container-wide">
          {submitted ? (
            <div className="max-w-2xl mx-auto rounded-2xl p-12 text-center" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
              <CheckCircle2 size={56} className="mx-auto mb-6 text-accent" />
              <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>Demo Requested!</h2>
              <p className="text-lg mb-6" style={{ color: "var(--text-secondary)" }}>Thank you for your interest. Our team will confirm your demo within 24 hours.</p>
              <MagneticButton variant="ghost" href="/">Back to Home</MagneticButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Demo type selection */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>Choose Demo Type</h2>
                <div className="space-y-4">
                  {demoTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedDemo(type.id)}
                      className="w-full text-left rounded-2xl p-5 transition-all duration-300"
                      style={{
                        backgroundColor: selectedDemo === type.id ? "rgba(0,212,255,0.08)" : "var(--bg-card)",
                        border: `1px solid ${selectedDemo === type.id ? "var(--accent-primary)" : "var(--border)"}`,
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                          <type.icon size={18} className="text-accent" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm" style={{ fontFamily: "var(--font-display)" }}>{type.title}</h3>
                          <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>{type.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <h3 className="font-bold mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                    <Clock size={16} className="text-accent" /> What to Expect
                  </h3>
                  <ul className="space-y-2">
                    {["Live robot operation footage", "Technical Q&A with our engineering team", "Custom solution recommendations", "Pricing and timeline discussion"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                        <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>Your Details</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Full Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors" style={inputStyle} placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Email *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors" style={inputStyle} placeholder="you@company.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Company *</label>
                      <input type="text" name="company" required value={formData.company} onChange={handleChange} className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors" style={inputStyle} placeholder="Company name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors" style={inputStyle} placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Preferred Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors" style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Notes / Questions</label>
                    <textarea name="notes" rows={4} value={formData.notes} onChange={handleChange} className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors resize-none" style={inputStyle} placeholder="Tell us about your inspection challenge..." />
                  </div>
                  {error && <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">{error}</p>}
                  <MagneticButton variant="filled" size="lg" disabled={loading}><Send size={16} /> {loading ? "Scheduling..." : "Schedule Demo"}</MagneticButton>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
