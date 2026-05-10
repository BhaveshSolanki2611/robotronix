"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { Menu, X, ChevronDown, Bot, Mountain, FlaskConical, Scan, Zap, Droplets, Building2, Shield, Wrench, Gauge } from "lucide-react";
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
  const navRef = useRef<HTMLElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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
            <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:border-accent transition-colors">
              <span className="text-accent font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>RST</span>
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:block" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              ROBOTRONIX
            </span>
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
                Solutions <ChevronDown size={14} className={`transition-transform ${activeMega === "solutions" ? "rotate-180" : ""}`} />
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

            <Link href="/platform" className="text-sm font-medium text-text-secondary hover:text-accent transition-colors">
              Platform
            </Link>
            <Link href="/patents" className="text-sm font-medium text-text-secondary hover:text-accent transition-colors">
              Patents
            </Link>
            <Link href="/about" className="text-sm font-medium text-text-secondary hover:text-accent transition-colors">
              About
            </Link>
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
            onClick={() => setIsMobileOpen(!isMobileOpen)}
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
          className="fixed inset-0 z-[999] bg-bg-primary/98 backdrop-blur-xl flex flex-col justify-center px-8"
          style={{ paddingTop: "80px" }}
        >
          <div className="space-y-6">
            {[
              { label: "Solutions", href: "/solutions/confined-spaces" },
              { label: "Industries", href: "/industries/oil-gas" },
              { label: "Platform", href: "/platform" },
              { label: "Patents", href: "/patents" },
              { label: "About", href: "/about" },
              { label: "Careers", href: "/careers" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mobile-link block text-4xl font-bold text-text-primary hover:text-accent transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
                onClick={() => setIsMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-12 flex gap-4">
            <MagneticButton variant="filled" size="lg" href="/demo">
              Get Demo →
            </MagneticButton>
          </div>
        </div>
      )}
    </>
  );
}
