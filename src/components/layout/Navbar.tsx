"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { Menu, X, ChevronDown, ChevronLeft, ChevronRight, Bot, Mountain, FlaskConical, Scan, Zap, Droplets, Building2, Shield, Wrench, Gauge, Info, ScrollText, Mail, Send, CheckCircle2 } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const solutions = [
  { title: "Confined Space Inspection", desc: "Tanks, tunnels, sewers, ducts", href: "/solutions/confined-spaces", icon: Bot },
  { title: "Height & Aerial Inspection", desc: "Bridges, chimneys, wind turbines", href: "/solutions/height-inspection", icon: Mountain },
  { title: "Chemical & Toxic Environments", desc: "Refineries, chemical plants", href: "/solutions/hazmat", icon: FlaskConical },
  { title: "NDT Inspection Services", desc: "Ultrasonic, magnetic, visual", href: "/solutions/ndt-inspection", icon: Scan },
  { title: "Heat Exchanger Analysis", desc: "Tube sheet 3D modeling & analytics", href: "/solutions/heat-exchanger", icon: Gauge },
];

const industries = [
  { title: "Oil & Gas", href: "/industries/oil-gas", icon: Droplets },
  { title: "Power Plants", href: "/industries/power", icon: Zap },
  { title: "Petrochemical", href: "/industries/petrochemical", icon: FlaskConical },
  { title: "Infrastructure", href: "/industries/infrastructure", icon: Building2 },
  { title: "Defence", href: "/industries/defence", icon: Shield },
  { title: "Manufacturing", href: "/industries/manufacturing", icon: Wrench },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");
  const [currentMenu, setCurrentMenu] = useState<"main" | "products" | "industries" | "about">("main");
  const navRef = useRef<HTMLElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterLoading(true);
    setNewsletterError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to subscribe.");
      }

      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    } catch (error) {
      setNewsletterError(error instanceof Error ? error.message : "Unable to subscribe.");
    } finally {
      setNewsletterLoading(false);
    }
  };

  const closeMobileMenu = () => {
    setCurrentMenu("main");
    setIsMobileOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen && mobileMenuRef.current) {
      const links = mobileMenuRef.current.querySelectorAll(".mobile-link");
      gsap.fromTo(links, { x: -40, opacity: 0 }, {
        x: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: "power3.out"
      });
    }
  }, [isMobileOpen]);

  const handleMegaEnter = (menu: string) => {
    setActiveMega(menu);
    if (megaRef.current) {
      gsap.fromTo(megaRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  };

  const handleMegaLeave = () => {
    setActiveMega(null);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-500"
        style={{
          backgroundColor: isScrolled ? "rgba(3, 7, 18, 0.85)" : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          borderBottom: isScrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <div className="container-wide flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group glitch" data-cursor-text="HOME">
            <Image src="/logo.png" alt="RAST" width={160} height={52} className="h-[52px] w-auto flex items-center justify-center text-[#101a18] bg-white rounded-[6px] p-[2px] drop-shadow-[0_0_12px_rgba(34,211,238,0.45)]" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <div
              className="relative"
              onMouseEnter={() => handleMegaEnter("solutions")}
              onMouseLeave={handleMegaLeave}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-accent transition-colors"
                style={{ fontFamily: 'var(--font-body)' }} suppressHydrationWarning>
                Products <ChevronDown size={14} className={`transition-transform ${activeMega === "solutions" ? "rotate-180" : ""}`} />
              </button>

              {activeMega === "solutions" && (
                <div ref={megaRef} className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px]">
                  <div className="glass-strong rounded-2xl p-6 grid grid-cols-2 gap-4">
                    {solutions.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-accent/5 transition-colors group/item"
                        data-cursor-text="VIEW"
                      >
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover/item:bg-accent/20 transition-colors">
                          <item.icon size={18} className="text-accent" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-text-primary">{item.title}</div>
                          <div className="text-xs text-text-muted mt-0.5">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => handleMegaEnter("industries")}
              onMouseLeave={handleMegaLeave}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-accent transition-colors"
                style={{ fontFamily: 'var(--font-body)' }} suppressHydrationWarning>
                Industries <ChevronDown size={14} className={`transition-transform ${activeMega === "industries" ? "rotate-180" : ""}`} />
              </button>

              {activeMega === "industries" && (
                <div ref={megaRef} className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[480px]">
                  <div className="glass-strong rounded-2xl p-6 grid grid-cols-3 gap-3">
                    {industries.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-accent/5 transition-colors text-center"
                        data-cursor-text="VIEW"
                      >
                        <item.icon size={20} className="text-accent" />
                        <span className="text-xs font-medium text-text-secondary">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/blogs" className="text-sm font-medium text-text-secondary hover:text-accent transition-colors">
              About Us
            </Link>
            <div
              className="relative"
              onMouseEnter={() => handleMegaEnter("about")}
              onMouseLeave={handleMegaLeave}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-accent transition-colors"
                style={{ fontFamily: 'var(--font-body)' }} suppressHydrationWarning>
                Blogs <ChevronDown size={14} className={`transition-transform ${activeMega === "about" ? "rotate-180" : ""}`} />
              </button>

              {activeMega === "about" && (
                <div ref={megaRef} className="absolute top-full right-0 pt-4 w-[220px]">
                  <div className="glass-strong rounded-2xl p-4 flex flex-col gap-1">
                    <Link
                      href="/about"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/5 transition-colors group/item"
                      data-cursor-text="VIEW"
                    >
                      <Info size={18} className="text-accent" />
                      <span className="text-sm font-medium text-text-secondary group-hover/item:text-text-primary transition-colors">Blogs</span>
                    </Link>
                    <Link
                      href="/patents"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/5 transition-colors group/item"
                      data-cursor-text="VIEW"
                    >
                      <ScrollText size={18} className="text-accent" />
                      <span className="text-sm font-medium text-text-secondary group-hover/item:text-text-primary transition-colors">Research & development</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <MagneticButton variant="ghost" size="sm" href="/contact">
              Contact Us
            </MagneticButton>
            <MagneticButton variant="filled" size="sm" href="/demo">
              Get Demo →
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-text-primary p-2"
            onClick={() => (isMobileOpen ? closeMobileMenu() : setIsMobileOpen(true))}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      {isMobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-[999] bg-bg-primary/98 backdrop-blur-xl flex flex-col"
          style={{ paddingTop: "90px" }}
        >
          {/* Menu wrapper and panel transitions */}
          <div className="relative flex-1 overflow-hidden w-full">
            
            {/* MAIN PANEL */}
            <div
              className={`absolute inset-0 transition-all duration-300 ease-in-out flex flex-col justify-between overflow-y-auto px-6 pb-24 ${
                currentMenu === "main"
                  ? "translate-x-0 opacity-100 pointer-events-auto"
                  : "-translate-x-full opacity-0 pointer-events-none"
              }`}
            >
              <div className="space-y-4">
                {/* Products Trigger */}
                <button
                  onClick={() => setCurrentMenu("products")}
                  className="mobile-link w-full flex items-center justify-between text-3xl font-bold text-text-primary hover:text-accent transition-colors text-left py-2.5 border-b border-border/20"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span>Products</span>
                  <ChevronRight size={24} className="text-accent" />
                </button>

                {/* Industries Trigger */}
                <button
                  onClick={() => setCurrentMenu("industries")}
                  className="mobile-link w-full flex items-center justify-between text-3xl font-bold text-text-primary hover:text-accent transition-colors text-left py-2.5 border-b border-border/20"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span>Industries</span>
                  <ChevronRight size={24} className="text-accent" />
                </button>

                {/* Platform Link */}
                {/* <Link
                  href="/platform"
                  className="mobile-link block text-3xl font-bold text-text-primary hover:text-accent transition-colors py-2.5 border-b border-border/20"
                  style={{ fontFamily: "var(--font-display)" }}
                  onClick={closeMobileMenu}
                >
                  Platform
                </Link> */}

                {/* About Us Link */}
                <Link
                  href="/blogs"
                  className="mobile-link block text-3xl font-bold text-text-primary hover:text-accent transition-colors py-2.5 border-b border-border/20"
                  style={{ fontFamily: "var(--font-display)" }}
                  onClick={closeMobileMenu}
                >
                  About Us
                </Link>

                {/* Blogs Trigger */}
                <button
                  onClick={() => setCurrentMenu("about")}
                  className="mobile-link w-full flex items-center justify-between text-3xl font-bold text-text-primary hover:text-accent transition-colors text-left py-2.5 border-b border-border/20"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span>Blogs</span>
                  <ChevronRight size={24} className="text-accent" />
                </button>

                {/* Contact Link */}
                <Link
                  href="/contact"
                  className="mobile-link block text-3xl font-bold text-text-primary hover:text-accent transition-colors py-2.5"
                  style={{ fontFamily: "var(--font-display)" }}
                  onClick={() => setIsMobileOpen(false)}
                >
                  Contact
                </Link>
              </div>

              {/* Bottom Actions inside Main Panel */}
              <div className="mt-8 space-y-6">
                
                {/* Newsletter Subscription */}
                <div className="border-t border-border/20 pt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-2">
                    <Mail size={14} className="text-accent" />
                    Subscribe to newsletter
                  </h4>
                  {newsletterSubscribed ? (
                    <div className="flex items-center gap-2 text-sm text-accent py-2 bg-accent/5 px-4 rounded-xl border border-accent/20 animate-fade-in">
                      <CheckCircle2 size={16} />
                      <span>Thank you! You have subscribed.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                      <input
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Enter email address"
                        required
                        className="flex-1 rounded-xl px-4 py-3 text-sm outline-none bg-bg-card border border-border text-text-primary placeholder:text-text-muted focus:border-accent transition-colors"
                        suppressHydrationWarning
                      />
                      <button
                        type="submit"
                        disabled={newsletterLoading}
                        className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center hover:bg-accent/20 active:bg-accent/30 transition-colors text-accent shrink-0"
                        suppressHydrationWarning
                      >
                        <Send size={16} />
                      </button>
                    </form>
                  )}
                  {newsletterError && <p className="mt-2 text-xs text-red-400">{newsletterError}</p>}
                </div>

                <div className="flex flex-col gap-3">
                  <MagneticButton variant="filled" size="lg" href="/demo">
                    Get Demo →
                  </MagneticButton>
                </div>
                <div className="text-center text-xs text-text-muted">
                  RAST © {new Date().getFullYear()} • Robotic Systems & Technologies
                </div>
              </div>
            </div>

            {/* PRODUCTS SUBMENU PANEL */}
            <div
              className={`absolute inset-0 transition-all duration-300 ease-in-out flex flex-col overflow-y-auto px-6 pb-24 ${
                currentMenu === "products"
                  ? "translate-x-0 opacity-100 pointer-events-auto"
                  : "translate-x-full opacity-0 pointer-events-none"
              }`}
            >
              <button
                onClick={() => setCurrentMenu("main")}
                className="flex items-center gap-2 text-text-secondary hover:text-accent text-sm font-medium mb-6 uppercase tracking-wider text-left w-fit transition-colors"
              >
                <ChevronLeft size={16} /> Back to Menu
              </button>

              <h3 className="text-2xl font-bold text-text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Our Solutions
              </h3>

              <div className="space-y-3">
                {solutions.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-start gap-4 p-4 rounded-xl border border-border/30 bg-bg-card/30 hover:bg-accent/5 active:bg-accent/10 transition-all group"
                    onClick={closeMobileMenu}
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <item.icon size={20} className="text-accent" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                        {item.title}
                      </div>
                      <div className="text-xs text-text-muted mt-1 leading-relaxed">
                        {item.desc}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* INDUSTRIES SUBMENU PANEL */}
            <div
              className={`absolute inset-0 transition-all duration-300 ease-in-out flex flex-col overflow-y-auto px-6 pb-24 ${
                currentMenu === "industries"
                  ? "translate-x-0 opacity-100 pointer-events-auto"
                  : "translate-x-full opacity-0 pointer-events-none"
              }`}
            >
              <button
                onClick={() => setCurrentMenu("main")}
                className="flex items-center gap-2 text-text-secondary hover:text-accent text-sm font-medium mb-6 uppercase tracking-wider text-left w-fit transition-colors"
              >
                <ChevronLeft size={16} /> Back to Menu
              </button>

              <h3 className="text-2xl font-bold text-text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Industries We Serve
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {industries.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl border border-border/30 bg-bg-card/30 hover:bg-accent/5 active:bg-accent/10 transition-all text-center group"
                    onClick={closeMobileMenu}
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <item.icon size={22} className="text-accent" />
                    </div>
                    <span className="text-xs font-semibold text-text-secondary group-hover:text-text-primary transition-colors leading-tight">
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* ABOUT SUBMENU PANEL */}
            <div
              className={`absolute inset-0 transition-all duration-300 ease-in-out flex flex-col overflow-y-auto px-6 pb-24 ${
                currentMenu === "about"
                  ? "translate-x-0 opacity-100 pointer-events-auto"
                  : "translate-x-full opacity-0 pointer-events-none"
              }`}
            >
              <button
                onClick={() => setCurrentMenu("main")}
                className="flex items-center gap-2 text-text-secondary hover:text-accent text-sm font-medium mb-6 uppercase tracking-wider text-left w-fit transition-colors"
              >
                <ChevronLeft size={16} /> Back to Menu
              </button>

              <h3 className="text-2xl font-bold text-text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Company Info
              </h3>

              <div className="space-y-3">
                <Link
                  href="/about"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-bg-card/30 hover:bg-accent/5 active:bg-accent/10 transition-all group"
                  onClick={closeMobileMenu}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Info size={20} className="text-accent" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors block">
                      Blogs
                    </span>
                    <span className="text-xs text-text-muted mt-0.5 block">
                      Who we are and our mission
                    </span>
                  </div>
                </Link>

                <Link
                  href="/patents"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-bg-card/30 hover:bg-accent/5 active:bg-accent/10 transition-all group"
                  onClick={closeMobileMenu}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <ScrollText size={20} className="text-accent" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors block">
                      Research & development
                    </span>
                    <span className="text-xs text-text-muted mt-0.5 block">
                      Our proprietary engineering and technology
                    </span>
                  </div>
                </Link>

                {/* <Link
                  href="/careers"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-bg-card/30 hover:bg-accent/5 active:bg-accent/10 transition-all group"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Briefcase size={20} className="text-accent" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors block">
                      Careers
                    </span>
                    <span className="text-xs text-text-muted mt-0.5 block">
                      Join our team and build the future of robotics
                    </span>
                  </div>
                </Link> */}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
