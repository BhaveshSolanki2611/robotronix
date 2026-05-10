import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

const caseStudyData: Record<string, { title: string; category: string; date: string; client: string; challenge: string; solution: string; results: string[]; impact: string }> = {
  "refinery-tank-inspection": {
    title: "80% Faster Tank Inspection at Major Indian Refinery",
    category: "Oil & Gas", date: "January 2024", client: "Major Indian Oil Refinery",
    challenge: "The client needed to inspect 12 large crude oil storage tanks during a tight 5-day maintenance window. Traditional inspection would require full tank drainage, confined space entry permits, and a team of 8 inspectors working around the clock — at significant safety risk and cost.",
    solution: "Robotronix deployed two confined space inspection robots equipped with ultrasonic thickness gauges and HD cameras. The robots navigated tank floors and walls autonomously, collecting comprehensive data without human entry. Real-time video streaming allowed engineers to monitor from a safe control room.",
    results: ["80% reduction in inspection time (15 days → 3 days)", "Zero safety incidents during entire operation", "100% tank floor and wall coverage achieved", "12 tanks inspected in 3 days with 2 robots", "Digital reports delivered within 24 hours of inspection", "3 critical corrosion areas identified early"],
    impact: "The client saved an estimated ₹1.5 Crore in reduced downtime and inspection costs while achieving better data quality than traditional methods. The early detection of corrosion prevented a potential environmental incident.",
  },
  "power-plant-boiler": {
    title: "Zero-Downtime Boiler Inspection for 500MW Power Plant",
    category: "Power", date: "October 2023", client: "500MW Thermal Power Plant",
    challenge: "Annual boiler tube inspection required a minimum 7-day shutdown, costing the plant ₹3 Crore per day in lost generation. The internal environment — extreme heat residue, confined spaces, and height — made human inspection slow and hazardous.",
    solution: "Our height-adapted robot with NDT sensors was deployed during a planned 48-hour outage. The robot climbed boiler walls, inspected tube surfaces with ultrasonic sensors, and captured high-resolution imagery of all critical areas.",
    results: ["Inspection completed in 48-hour window", "3 critical weld defects found early", "₹2 Crore saved in avoided unplanned outage", "95% less scaffolding required", "Complete digital inspection record"],
    impact: "The power plant adopted Robotronix for all future boiler inspections, reducing their annual maintenance shutdown from 7 days to 2 days.",
  },
  "chemical-reactor-assessment": {
    title: "Safe Reactor Vessel Assessment in HAZMAT Conditions",
    category: "Petrochemical", date: "July 2023", client: "Leading Petrochemical Manufacturer",
    challenge: "The client's reactor vessel required internal corrosion mapping, but the vessel contained residual chemical contamination that made human entry impossible without extensive degassing and safety protocols — a process that would take 4 days alone.",
    solution: "Robotronix deployed a chemical-resistant robot with ultrasonic thickness gauging capability. The robot entered the vessel through a standard manway, navigated the interior, and generated a complete corrosion map without requiring full degassing.",
    results: ["Zero human entry required", "Full 360° corrosion map generated", "Regulatory compliance achieved", "4-day degassing process eliminated", "Vessel returned to service 5 days early"],
    impact: "The client integrated robotic inspection into their standard maintenance protocol, eliminating the need for human confined space entry in reactor vessels.",
  },
  "bridge-structural-inspection": {
    title: "Highway Bridge Underside Inspection Without Lane Closure",
    category: "Infrastructure", date: "March 2023", client: "National Highway Authority",
    challenge: "A critical 4-lane highway bridge required structural inspection of its underside, including piers, bearings, and deck. Traditional inspection would require lane closures for snooper trucks, causing significant traffic disruption on a busy national highway.",
    solution: "Our climbing robots inspected the bridge underside, piers, and bearing areas without any lane closure. High-resolution cameras and crack detection sensors provided comprehensive structural assessment data.",
    results: ["Zero traffic disruption", "Full structural report in 24 hours", "Government compliance requirements met", "All 4 piers and deck inspected in one day", "Crack mapping with millimeter precision"],
    impact: "The highway authority approved Robotronix for bridge inspection on 15 additional bridges in their network, avoiding an estimated ₹50 Lakh in traffic management costs per bridge.",
  },
};

export function generateStaticParams() {
  return Object.keys(caseStudyData).map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = caseStudyData[slug];

  if (!data) {
    notFound();
  }

  return (
    <>
      <PageHero badge={data.category} title={data.title} subtitle={`${data.client} — ${data.date}`} />

      <section className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="container-wide max-w-4xl">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>The Challenge</h2>
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>{data.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>Our Solution</h2>
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>{data.solution}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>Results</h2>
              <div className="space-y-3">
                {data.results.map((r) => (
                  <div key={r} className="flex items-start gap-3 rounded-xl p-4" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
                    <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-8" style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>Impact</h2>
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>{data.impact}</p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <MagneticButton variant="ghost" href="/case-studies"><ArrowLeft size={16} /> All Case Studies</MagneticButton>
              <MagneticButton variant="filled" href="/contact">Start Your Project <ArrowRight size={16} /></MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
