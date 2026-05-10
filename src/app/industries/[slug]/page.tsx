import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import MagneticButton from "@/components/ui/MagneticButton";
import CardTilt from "@/components/ui/CardTilt";
import { ArrowRight, Bot, Mountain, FlaskConical, Scan } from "lucide-react";

const industryData: Record<string, { title: string; subtitle: string; challenge: string; solutions: { title: string; desc: string; icon: typeof Bot }[]; applications: string[] }> = {
  "oil-gas": {
    title: "Oil & Gas",
    subtitle: "Robotic inspection for upstream, midstream, and downstream oil & gas operations — pipelines, tanks, rigs, and refineries.",
    challenge: "The oil and gas industry operates in some of the most hazardous environments on earth. Confined spaces, explosive atmospheres, extreme temperatures, and remote locations make human inspection dangerous and expensive. Our robots deliver comprehensive inspection data without putting workers at risk.",
    solutions: [
      { title: "Pipeline Inspection", desc: "Internal and external pipeline inspection using crawling robots with NDT sensors.", icon: Bot },
      { title: "Tank Inspection", desc: "Storage tank floor and shell inspection without full drainage or confined entry.", icon: Scan },
      { title: "Rig Safety Monitoring", desc: "Continuous monitoring of offshore and onshore rig structural integrity.", icon: Mountain },
      { title: "Refinery Assessment", desc: "Distillation columns, heat exchangers, and reactor vessel inspection.", icon: FlaskConical },
    ],
    applications: ["Crude Oil Tanks", "LNG Terminals", "Offshore Platforms", "Gas Pipelines", "Refineries", "Drilling Rigs", "FPSO Vessels", "Compressor Stations"],
  },
  "power": {
    title: "Power Plants",
    subtitle: "Keeping the lights on with robotic boiler, turbine, and chimney inspection — minimizing downtime and maximizing safety.",
    challenge: "Power plants require regular inspection of boilers, turbines, chimneys, and cooling systems. Traditional inspection methods require costly shutdowns and hazardous confined space entry. Our robots inspect critical assets during planned outages, reducing downtime significantly.",
    solutions: [
      { title: "Boiler Tube Inspection", desc: "Internal boiler tube inspection for erosion, corrosion, and weld integrity.", icon: Scan },
      { title: "Chimney & Stack Assessment", desc: "Internal chimney inspection without scaffolding or rope access.", icon: Mountain },
      { title: "Turbine Inspection", desc: "Visual and NDT inspection of turbine blades and housings.", icon: Bot },
      { title: "Cooling Tower Monitoring", desc: "Structural assessment of cooling tower fills and supports.", icon: FlaskConical },
    ],
    applications: ["Coal Power Plants", "Gas Turbines", "Nuclear Plants", "Solar Farms", "Wind Farms", "Hydro Plants", "Biomass Facilities", "Substations"],
  },
  "petrochemical": {
    title: "Petrochemical",
    subtitle: "Robotic inspection for petrochemical plants — reactors, distillation columns, and storage facilities in hazardous environments.",
    challenge: "Petrochemical facilities process volatile, toxic, and corrosive materials under extreme conditions. Inspection of reactors, columns, and vessels requires specialized equipment and extensive safety protocols. Our chemical-resistant robots operate safely in these harsh environments.",
    solutions: [
      { title: "Reactor Vessel Inspection", desc: "Internal inspection of reactors without full shutdown and degassing.", icon: FlaskConical },
      { title: "Column Assessment", desc: "Distillation and fractionation column tray and packing inspection.", icon: Scan },
      { title: "Leak Detection", desc: "Real-time gas and liquid leak detection in piping networks.", icon: Bot },
      { title: "Corrosion Mapping", desc: "Full-surface corrosion mapping using ultrasonic thickness gauging.", icon: Mountain },
    ],
    applications: ["Ethylene Plants", "Polymer Facilities", "Fertilizer Plants", "Methanol Production", "Styrene Plants", "Ammonia Plants", "Storage Terminals", "Loading Facilities"],
  },
  "infrastructure": {
    title: "Infrastructure",
    subtitle: "Bridges, tunnels, dams, and critical infrastructure assessed with robotic precision — no scaffolding required.",
    challenge: "India's infrastructure requires continuous monitoring and maintenance. Bridges, tunnels, dams, and public buildings must be inspected regularly for structural integrity. Traditional methods are expensive, disruptive, and often incomplete. Our robots provide comprehensive, non-invasive assessment.",
    solutions: [
      { title: "Bridge Inspection", desc: "Underside, pier, and cable inspection of bridges without lane closures.", icon: Mountain },
      { title: "Tunnel Assessment", desc: "Full tunnel lining inspection for cracks, water ingress, and structural issues.", icon: Bot },
      { title: "Dam Monitoring", desc: "Upstream face and gallery inspection for seepage and structural integrity.", icon: Scan },
      { title: "Building Assessment", desc: "Facade, structural member, and foundation inspection of buildings.", icon: FlaskConical },
    ],
    applications: ["Highway Bridges", "Railway Tunnels", "Metro Systems", "Dams & Reservoirs", "Port Facilities", "Airport Runways", "Heritage Structures", "High-Rise Buildings"],
  },
  "defence": {
    title: "Defence",
    subtitle: "Military-grade robotic inspection for naval vessels, armored vehicles, and ordnance facilities — mission-critical reliability.",
    challenge: "Defence assets require the highest standards of inspection and maintenance. Naval vessels, military aircraft, armored vehicles, and ammunition facilities demand precise, reliable inspection without compromising operational security. Our robots meet military-grade requirements for reliability and security.",
    solutions: [
      { title: "Naval Vessel Inspection", desc: "Hull, tank, and ballast inspection for naval ships and submarines.", icon: Bot },
      { title: "Armored Vehicle Assessment", desc: "Structural integrity inspection of armored hulls and turrets.", icon: Mountain },
      { title: "Ordnance Facility Monitoring", desc: "Safe inspection of ammunition storage and handling facilities.", icon: FlaskConical },
      { title: "Aircraft Structure Inspection", desc: "Fuselage, wing, and landing gear inspection using NDT robotics.", icon: Scan },
    ],
    applications: ["Naval Ships", "Submarines", "Military Aircraft", "Armored Vehicles", "Ordnance Depots", "Defence Installations", "Shipyards", "Military Bases"],
  },
  "manufacturing": {
    title: "Manufacturing",
    subtitle: "Quality inspection, equipment monitoring, and preventive maintenance for manufacturing excellence.",
    challenge: "Modern manufacturing demands continuous quality control and equipment reliability. Downtime costs millions, and missed defects can lead to product recalls and safety incidents. Our robots provide continuous, automated inspection of production equipment and manufactured products.",
    solutions: [
      { title: "Equipment Inspection", desc: "Regular inspection of furnaces, vessels, and processing equipment.", icon: Bot },
      { title: "Quality Control", desc: "Automated visual and dimensional inspection of manufactured products.", icon: Scan },
      { title: "Weld Inspection", desc: "Automated weld quality assessment using ultrasonic and visual methods.", icon: Mountain },
      { title: "Predictive Maintenance", desc: "Sensor-based monitoring for early detection of equipment failures.", icon: FlaskConical },
    ],
    applications: ["Steel Mills", "Cement Plants", "Automotive Plants", "Electronics Manufacturing", "Aerospace Manufacturing", "Food Processing", "Glass Manufacturing", "Paper Mills"],
  },
};

export function generateStaticParams() {
  return Object.keys(industryData).map((slug) => ({ slug }));
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = industryData[slug];

  if (!data) {
    notFound();
  }

  return (
    <>
      <PageHero badge="INDUSTRY" title={data.title} subtitle={data.subtitle} />

      <section className="section-padding" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-wide">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>The Challenge</h2>
          <p className="text-lg max-w-3xl mb-12 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{data.challenge}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.solutions.map((s) => (
              <CardTilt key={s.title}>
                <div className="rounded-2xl p-6 h-full" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4"><s.icon size={22} className="text-accent" /></div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
                </div>
              </CardTilt>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="container-wide">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8" style={{ fontFamily: "var(--font-display)" }}>Applications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.applications.map((app) => (
              <div key={app} className="rounded-xl p-4 text-center text-sm font-medium" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>{app}</div>
            ))}
          </div>
          <div className="mt-12 text-center"><MagneticButton variant="filled" size="lg" href="/contact">Get Industry Solution <ArrowRight size={16} /></MagneticButton></div>
        </div>
      </section>
    </>
  );
}
