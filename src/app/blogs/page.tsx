import { Target, ChevronDown } from "lucide-react";

export const metadata = {
  title: "About Us | RAST",
  description: "Learn more about RAST's history, vision, mission, and how we are building the future of industrial inspections and robotics.",
};

const Blog = () => {
  const whatWeDoItems = [
    "Robotic inspection systems for confined and hazardous environments",
    "AI-assisted non-destructive testing (NDT) solutions",
    "Remote visual inspection (RVI) technologies",
    "Digital twin generation and infrastructure intelligence platforms",
    "Industrial IoT and real-time monitoring systems",
    "Predictive maintenance and asset health analytics",
    "Robotics for energy, petrochemical, refinery, and power sectors",
    "Intelligent automation for large-scale industrial operations"
  ];

  const rndItems = [
    "Climbing and traversing robotic systems",
    "Pipe and tube inspection robotics",
    "AI-based defect recognition and analytics",
    "Digital twins for industrial assets",
    "Remote sensing and intelligent mapping",
    "Autonomous navigation concepts for industrial environments",
    "Advanced NDT integration with robotics",
    "Inspection data visualization and enterprise reporting systems",
    "Hazardous-area compatible robotic solutions",
    "Scalable inspection technologies for energy infrastructure"
  ];

  const expertiseItems = [
    "Robotics and automation",
    "Industrial inspection and NDT",
    "Oil & gas operations",
    "Power generation and utilities",
    "Enterprise consulting and international business",
    "AI and software systems",
    "Mechatronics and embedded engineering",
    "Industrial digital transformation"
  ];

  const team = [
    { name: "Pallavi Wadhwa", role: "Founder and CEO", image: "/photos/Pallavi Wadhwa.jpeg" },
    { name: "Rahul Agnihotri", role: "Founder and CTO", image: "/photos/Rahul Agnihotri.png" },
    { name: "Bhavesh Solanki", role: "Tech Lead Full Stack Engineer", image: "/photos/Bhavesh Solanki .jpeg" },
    { name: "Nitin", role: "AI Expert", image: "/photos/Nitin.jpeg" },
    { name: "Arjit", role: "3D Modelling, Animations and Digital Twins", image: "/photos/Arjit.jpeg" },
    { name: "Pavan Vijay", role: "Mechatronics and Robotics Engineer", image: "/photos/Pavan Vijay.jpeg" },
    { name: "Tanishkha", role: "Mechatronics and Robotics Engineer", image: "/photos/Tanishkha.jpeg" },
  ];

  const whyRastItems = [
    "Seven years of focused industrial robotics R&D",
    "Strong domain understanding of energy and industrial sectors",
    "Practical engineering-driven innovation",
    "Deep integration of AI, robotics, and inspection technologies",
    "Scalable solutions designed for real industrial deployment",
    "Vision aligned with the future of autonomous industrial operations"
  ];

  // Shuffled duplicates for marquee lines
  const row1 = [...team, ...team];
  const row2 = [
    team[2], team[3], team[4], team[5], team[6], team[0], team[1],
    team[2], team[3], team[4], team[5], team[6], team[0], team[1]
  ];
  const row3 = [
    team[4], team[5], team[6], team[0], team[1], team[2], team[3],
    team[4], team[5], team[6], team[0], team[1], team[2], team[3]
  ];

  const renderCard = (member: typeof team[0], idx: string) => (
    <div 
      key={idx}
      className="glass-strong w-56 shrink-0 rounded-2xl p-4 border border-border/30 hover:border-accent/40 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,212,255,0.25)] transition-all duration-300 group flex flex-col justify-between bg-[#0B1220] select-none"
    >
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-bg-card border border-border/20">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover filter brightness-[0.9] group-hover:brightness-[1] transition-all duration-500 ease-in-out"
        />
      </div>
      
      {/* Divider line and name/role below image */}
      <div className="mt-4 pt-3 border-t border-border/20 text-center">
        <h4 className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors leading-tight truncate">
          {member.name}
        </h4>
        <p className="text-[10px] text-text-muted mt-1 leading-tight font-medium line-clamp-1">
          {member.role}
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-bg-primary min-h-screen text-text-primary">

      {/* Banner Section with Natural Aspect Ratio (No Cropping) */}
      <div className="relative w-full overflow-hidden border-b border-border/20 bg-bg-primary pt-20">
        <div className="relative z-0 w-full h-auto">
          <img
            src="/Aboutus.jpeg"
            alt="About Us Banner"
            className="w-full h-auto block filter brightness-[0.8]"
          />
          {/* Subtle gradient overlay to merge into primary background */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/40 pointer-events-none" /> */}
        </div>
      </div>

      {/* Main Content Section */}
      <section className="py-16 md:py-24">
        <div className="container-wide max-w-4xl mx-auto px-6">

          {/* Introduction and Founding details */}
          <div className="space-y-6 md:space-y-8">
            <p className="text-lg md:text-xl font-medium text-text-primary leading-relaxed border-l-4 border-accent pl-5 py-1">
              At RAST, we are building the future of intelligent industrial inspection, robotics, and digital infrastructure intelligence for the world’s most critical assets.
            </p>

            <p className="text-base md:text-lg text-text-secondary leading-relaxed">
              Founded in 2018 by <strong className="text-text-primary">Pallavi Wadhwa</strong> and <strong className="text-text-primary">Rahul Agnihotri</strong>, RAST was created with a vision to transform how heavy industries inspect, maintain, and optimize complex infrastructure across energy, oil & gas, petrochemicals, power generation, manufacturing, renewables, and defense sectors.
            </p>

            <p className="text-base md:text-lg text-text-secondary leading-relaxed">
              Over the last seven years, RAST has invested deeply in research, engineering, and field innovation to develop next-generation robotic inspection platforms, AI-enabled analytics, remote visual inspection systems, digital twin technologies, and intelligent automation solutions designed for harsh and high-risk industrial environments.
            </p>

            <p className="text-base md:text-lg text-text-secondary leading-relaxed">
              Inspired by the global shift toward AI-powered industrial intelligence led by companies such as Gecko Robotics, RAST is building an Indian-origin deep-tech platform focused on solving real-world industrial challenges through the convergence of robotics, artificial intelligence, industrial data, and scalable engineering execution.
            </p>
          </div>

          {/* Our Mission Highlight Box */}
          <div className="glass-strong rounded-2xl p-8 md:p-10 my-16 border border-accent/20 relative overflow-hidden group">
            <div className="absolute -right-24 -bottom-24 w-48 h-48 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

            <h3 className="text-2xl font-bold text-accent mb-5 flex items-center gap-3" style={{ fontFamily: "var(--font-display)" }}>
              <Target className="text-accent animate-pulse-glow" size={24} />
              Our Mission
            </h3>

            <p className="text-lg text-text-primary font-semibold leading-relaxed mb-4">
              To redefine industrial reliability and operational safety through intelligent robotics, predictive inspection technologies, and AI-driven infrastructure intelligence.
            </p>

            <p className="text-base text-text-secondary leading-relaxed">
              We believe the future of industrial operations will be autonomous, data-driven, predictive, and continuously connected. RAST is committed to enabling that transformation by creating solutions that reduce downtime, improve asset integrity, enhance workforce safety, and unlock actionable insights from critical infrastructure.
            </p>
          </div>

          {/* What We Do Grid */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-text-primary mb-3 border-l-4 border-accent pl-5 py-0.5" style={{ fontFamily: "var(--font-display)" }}>
              What We Do
            </h3>
            <p className="text-base text-text-secondary mb-8 pl-5">
              RAST develops advanced robotic and intelligent inspection solutions for complex industrial assets, including:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-5">
              {whatWeDoItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-bg-card/30 hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
                  </div>
                  <span className="text-sm font-semibold text-text-secondary group-hover:text-text-primary transition-colors leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-6 pt-6 border-t border-border/20">
              "Our technologies are designed to operate where traditional inspection methods become expensive, unsafe, time-consuming, or operationally limiting."
            </p>
          </div>

          {/* Seven Years of Deep R&D and Industrial Innovation Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 items-start">

            {/* Left Column: R&D Text details */}
            <div className="lg:col-span-7">
              <h3 className="text-3xl font-bold text-text-primary mb-3 border-l-4 border-accent pl-5 py-0.5" style={{ fontFamily: "var(--font-display)" }}>
                Seven Years of Deep R&D and Industrial Innovation
              </h3>

              <div className="pl-5 space-y-6">
                <p className="text-base text-text-secondary leading-relaxed">
                  Since 2018, RAST has continuously focused on applied industrial research and engineering-led innovation.
                </p>

                <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                  Our R&D efforts span across:
                </p>

                <div className="space-y-3">
                  {rndItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-bg-card/30 hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
                      </div>
                      <span className="text-sm font-semibold text-text-secondary group-hover:text-text-primary transition-colors leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-base text-text-secondary leading-relaxed mt-6 pt-6 border-t border-border/20">
                  RAST’s engineering philosophy combines field practicality with advanced technology development — ensuring our systems are not just innovative, but deployable, scalable, and industrially reliable.
                </p>
              </div>
            </div>

            {/* Right Column: R&D Video Showcase (Right Padded) */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:pl-6 pr-4 lg:pr-8 mt-30">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
                R&D Field Demonstration
              </h4>

              <div className="glass-strong rounded-2xl p-3 border border-border/40 hover:border-accent/40 transition-all duration-300 group/video shadow-2xl relative overflow-hidden">
                <div className="absolute -inset-10 bg-accent/5 rounded-full blur-3xl pointer-events-none opacity-0 group-hover/video:opacity-100 transition-opacity duration-500" />

                <div className="relative rounded-xl overflow-hidden bg-bg-card border border-border/30 shadow-inner">
                  <video
                    src="/video/Seven.mp4"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </div>
                <div className="mt-3 px-1">
                  <span className="text-[10px] font-mono text-accent">VIDEO DEMO</span>
                  <h5 className="text-xs font-bold text-text-primary mt-0.5 leading-tight">
                    RAST Advanced Locomotion & Inspection Systems
                  </h5>
                </div>
              </div>
            </div>

          </div>

          {/* Industry Expertise Section */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-text-primary mb-3 border-l-4 border-accent pl-5 py-0.5" style={{ fontFamily: "var(--font-display)" }}>
              Industry Expertise
            </h3>

            <div className="pl-5 space-y-6">
              <p className="text-base text-text-secondary leading-relaxed">
                The RAST leadership and engineering teams bring together decades of combined experience across:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {expertiseItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-bg-card/30 hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
                    </div>
                    <span className="text-sm font-semibold text-text-secondary group-hover:text-text-primary transition-colors leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-base text-text-secondary leading-relaxed mt-6 pt-6 border-t border-border/20">
                Our team has worked alongside global industrial operators and Fortune 500 companies, understanding first-hand the operational challenges faced by critical infrastructure industries.
              </p>
            </div>
          </div>

          {/* Our Team Section with 1 Auto-scrolling Marquees */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-text-primary mb-3 border-l-4 border-accent pl-5 py-0.5" style={{ fontFamily: "var(--font-display)" }}>
              Leadership & Engineering Minds
            </h3>
            
            <p className="text-base text-text-secondary mb-8 pl-5">
              Meet the experts building the future of industrial inspections and robotics at RAST.
            </p>

            {/* Container for the 1 marquees with smooth gradient fades at left & right borders */}
            <div className="relative w-full space-y-6 py-6 overflow-hidden pl-5">
              
              {/* Fade overlays */}
              <div className="absolute top-0 bottom-0 left-5 w-16 md:w-32 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />

              {/* Row 1: Right to Left (animate-marquee) */}
              <div className="relative w-full overflow-hidden flex py-1">
                <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused] pr-6">
                  {row1.map((member, idx) => renderCard(member, `r1-${idx}`))}
                </div>
              </div>

            </div>
          </div>

          {/* Why RAST Section */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-text-primary mb-3 border-l-4 border-accent pl-5 py-0.5" style={{ fontFamily: "var(--font-display)" }}>
              Why RAST
            </h3>
            
            <div className="pl-5 space-y-6">
              <p className="text-base text-text-secondary leading-relaxed">
                RAST stands at the intersection of industrial robotics, AI, and infrastructure intelligence.
              </p>
              
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                What differentiates us:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whyRastItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-bg-card/30 hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
                    </div>
                    <span className="text-sm font-semibold text-text-secondary group-hover:text-text-primary transition-colors leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-2xl border-l-4 border-accent bg-bg-card/40 border border-border/40">
                <p className="text-base text-text-primary font-medium italic leading-relaxed text-center md:text-left">
                  "We are not simply building robots. We are building intelligent systems that help industries see deeper, act faster, operate safer, and make smarter infrastructure decisions."
                </p>
              </div>

              {/* RAST Systems in Action: last.mp4 Video Showcase */}
              <div className="mt-12 flex flex-col gap-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-glow" />
                  RAST Systems in Action
                </h4>
                
                <div className="glass-strong rounded-2xl p-3 border border-border/40 hover:border-accent/40 transition-all duration-300 shadow-2xl relative overflow-hidden max-w-3xl group/video">
                  <div className="absolute -inset-10 bg-accent/5 rounded-full blur-3xl pointer-events-none opacity-0 group-hover/video:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative rounded-xl overflow-hidden bg-bg-card border border-border/30 shadow-inner">
                    <video 
                      src="/video/last.mp4" 
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-auto object-cover rounded-xl"
                    />
                  </div>
                  <div className="mt-3 px-1">
                    <span className="text-[10px] font-mono text-accent">FIELD OPERATIONS</span>
                    <h5 className="text-xs font-bold text-text-primary mt-0.5 leading-tight">
                      RAST Intelligent Robotics Deployments
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Blog;