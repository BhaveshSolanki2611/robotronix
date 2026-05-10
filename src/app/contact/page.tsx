"use client";

import { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import MagneticButton from "@/components/ui/MagneticButton";
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2 } from "lucide-react";

export default function Page() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "", service: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed");
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputStyle = {
    backgroundColor: "var(--bg-card)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
    fontFamily: "var(--font-body)",
  };

  return (
    <>
      <PageHero badge="CONTACT" title="Let's Deploy Together" subtitle="Tell us about your challenge. We'll bring the robot. Our team typically responds within 24 hours." />

      <section className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="rounded-2xl p-12 text-center" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <CheckCircle2 size={48} className="mx-auto mb-4 text-accent" />
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>Message Sent!</h3>
                  <p style={{ color: "var(--text-secondary)" }}>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Full Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors" style={inputStyle} placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Email *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors" style={inputStyle} placeholder="you@company.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Company</label>
                      <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors" style={inputStyle} placeholder="Company name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors" style={inputStyle} placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Service Interest</label>
                    <select name="service" value={formData.service} onChange={handleChange} className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors" style={inputStyle}>
                      <option value="">Select a service</option>
                      <option value="confined">Confined Space Inspection</option>
                      <option value="height">Height & Aerial Inspection</option>
                      <option value="hazmat">Chemical / Hazmat Inspection</option>
                      <option value="ndt">NDT Inspection Services</option>
                      <option value="payg">Pay-As-You-Go Platform</option>
                      <option value="other">Other / General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Message *</label>
                    <textarea name="message" required rows={5} value={formData.message} onChange={handleChange} className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors resize-none" style={inputStyle} placeholder="Tell us about your challenge..." />
                  </div>
                  {error && <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">{error}</p>}
                  <MagneticButton variant="filled" size="lg" disabled={loading}><Send size={16} /> {loading ? "Sending..." : "Send Message"}</MagneticButton>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              {[
                { icon: MapPin, title: "Office", lines: ["Robotronix and Scalability Technology Pvt. Ltd.", "Gurgaon, Haryana 122011", "India"], link: { text: "Get Directions →", href: "https://www.bing.com/maps?where=Gurgaon%2C%20Haryana%20122011%2C%20IN" } },
                { icon: Mail, title: "Email", lines: ["info@robotronix.in", "careers@robotronix.in"] },
                { icon: Phone, title: "Phone", lines: ["+91 XXXXX XXXXX"] },
                { icon: Clock, title: "Working Hours", lines: ["Monday – Friday: 9:00 AM – 6:00 PM IST", "Saturday: 10:00 AM – 2:00 PM IST"] },
              ].map((info) => (
                <div key={info.title} className="rounded-2xl p-6" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0"><info.icon size={18} className="text-accent" /></div>
                    <div>
                      <h3 className="font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>{info.title}</h3>
                      {info.lines.map((l, i) => (<p key={i} className="text-sm" style={{ color: "var(--text-secondary)" }}>{l}</p>))}
                      {info.link && <a href={info.link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-accent mt-2 inline-block">{info.link.text}</a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
