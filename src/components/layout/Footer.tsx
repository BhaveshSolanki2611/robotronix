"use client";

import { useState } from "react";
import Link from "next/link";
import { Link2, ExternalLink, Share2, Globe, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

const footerLinks = {
  solutions: [
    { label: "Confined Spaces", href: "/solutions/confined-spaces" },
    { label: "Height Inspection", href: "/solutions/height-inspection" },
    { label: "Hazmat Environments", href: "/solutions/hazmat" },
    { label: "NDT Inspection", href: "/solutions/ndt-inspection" },
    { label: "Heat Exchanger", href: "/solutions/heat-exchanger" },
  ],
  industries: [
    { label: "Oil & Gas", href: "/industries/oil-gas" },
    { label: "Power Plants", href: "/industries/power" },
    { label: "Petrochemical", href: "/industries/petrochemical" },
    { label: "Wind Energy", href: "/industries/infrastructure" },
    { label: "Defence", href: "/industries/defence" },
    { label: "Hydroelectric", href: "/industries/manufacturing" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Research & development", href: "/patents" },
    // { label: "Careers", href: "/careers" },
    { label: "News & Press", href: "/news" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Contact", href: "/contact" },
  ],
};

const socials = [
  { icon: Link2, href: "#", label: "LinkedIn" },
  { icon: ExternalLink, href: "#", label: "Twitter" },
  { icon: Share2, href: "#", label: "Instagram" },
  { icon: Globe, href: "#", label: "Website" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subLoading, setSubLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubLoading(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribed(true);
    } catch { /* silent */ } finally {
      setSubLoading(false);
    }
  };

  return (
    <footer className="relative bg-bg-secondary border-t border-border">
      {/* Animated gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div
          className="h-full w-full"
          style={{
            background: "linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-primary))",
            backgroundSize: "200% 100%",
            animation: "gradient-shift 4s ease infinite",
          }}
        />
      </div>

      <div className="container-wide py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="/" className="inline-flex items-center gap-3 group">
              <img src="/logo.png" alt="RAST" className=" h-[52px] flex items-center justify-center text-[#101a18] bg-white rounded-[6px] p-[2px] drop-shadow-[0_0_12px_rgba(34,211,238,0.45)]"  />
            </a>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed">
              Made in India for the World. Patent-granted robotics for hazardous environments.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-bg-card border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-all text-text-muted"
                  data-cursor-text={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              {subscribed ? (
                <div className="flex items-center gap-2 text-sm text-accent"><CheckCircle2 size={14} /> Subscribed!</div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Get updates" required className="flex-1 rounded-lg px-3 py-2 text-xs outline-none bg-bg-card border border-border text-text-primary placeholder:text-text-muted focus:border-accent transition-colors" suppressHydrationWarning />
                  <button type="submit" disabled={subLoading} className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center hover:bg-accent/20 transition-colors text-accent shrink-0" suppressHydrationWarning>
                    <Send size={12} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary mb-5" style={{ fontFamily: "var(--font-display)" }}>
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary mb-5" style={{ fontFamily: "var(--font-display)" }}>
              Industries
            </h4>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-text-primary mb-5" style={{ fontFamily: "var(--font-display)" }}>
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} Robotronix and Scalability Technology Pvt. Ltd.</p>

          <div className="flex items-center gap-2">
            <MapPin size={12} />
            <a
              href="https://www.bing.com/maps?where=Gurgaon%2C%20Haryana%20122011%2C%20IN"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Gurgaon, Haryana 122011, India
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={12} />
            
            <a 
              href="mailto:contact-us@rast.in"
              className="hover:text-accent transition-colors"
              >contact-us@rast.in
            </a>
            
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
