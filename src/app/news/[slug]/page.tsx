import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowLeft, ArrowRight } from "lucide-react";

const articles: Record<string, { title: string; category: string; date: string; content: string[] }> = {
  "third-patent": {
    title: "Robotronix Secures Third Patent for Hazardous Environment Robotics",
    category: "PRESS RELEASE", date: "March 2024",
    content: [
      "Robotronix and Scalability Technology (P) LTD has been granted its third patent by the Indian Patent Office, covering an innovative multi-sensor robotic system designed for chemically hazardous environments.",
      "The patented system features a modular sensor array that enables real-time environmental monitoring, gas detection, and ultrasonic thickness measurement — all integrated into a single chemical-resistant robotic platform.",
      "\"This patent represents a significant milestone in our journey to make hazardous industrial inspection safe and efficient,\" said the company's founding team. \"With three granted patents, Robotronix has established itself as a genuine IP leader in the Indian robotics space.\"",
      "The technology has already been deployed in petrochemical facilities across India, demonstrating its effectiveness in environments where traditional inspection methods pose unacceptable risks to human safety.",
      "Robotronix now holds three granted patents covering confined space navigation, height-adaptive inspection platforms, and hazardous environment sensor arrays. Additional patent applications are currently pending.",
    ],
  },
  "refinery-case-study": {
    title: "How We Reduced Inspection Time by 80% at a Major Refinery",
    category: "CASE STUDY", date: "January 2024",
    content: [
      "In January 2024, Robotronix deployed confined space inspection robots at one of India's largest oil refineries, achieving an 80% reduction in inspection time compared to traditional methods.",
      "The project involved inspecting 12 large crude oil storage tanks that would normally require 15 days of manual inspection with confined space entry. Our robots completed the same scope in just 3 days.",
      "The robots were equipped with ultrasonic thickness gauges and HD cameras, enabling comprehensive assessment of tank floors, walls, and structural elements without human entry.",
      "Real-time video streaming allowed client engineers to observe the inspection from a safe control room, asking for additional coverage of areas of concern during the inspection.",
      "The deployment resulted in zero safety incidents, 100% coverage of all tank surfaces, and digital inspection reports delivered within 24 hours of completion. Three critical corrosion areas were identified that might have been missed by traditional spot-check methods.",
    ],
  },
  "future-of-ndt": {
    title: "The Future of NDT: Why Robotic Inspection is the Next Frontier",
    category: "TECHNOLOGY", date: "November 2023",
    content: [
      "Non-Destructive Testing (NDT) is undergoing a fundamental transformation. The convergence of robotics, artificial intelligence, and advanced sensors is creating inspection capabilities that were impossible just five years ago.",
      "Traditional NDT relies heavily on human inspectors working in challenging conditions — confined spaces, heights, and hazardous environments. The physical demands, safety risks, and data quality limitations of manual inspection are driving the industry toward robotic solutions.",
      "Robotic NDT platforms offer several key advantages: consistent data quality regardless of inspector fatigue, access to locations too dangerous for humans, higher inspection speeds, and digital data that can be analyzed by AI algorithms.",
      "At Robotronix, we're pioneering the integration of multiple NDT methods into single robotic platforms. Our robots can perform ultrasonic thickness measurement, magnetic particle inspection, and visual testing in a single deployment.",
      "The future of NDT is autonomous, data-driven, and safe. As AI capabilities improve, robotic inspection systems will not only collect data but interpret it in real-time, providing actionable insights during the inspection itself.",
    ],
  },
  "payg-launch": {
    title: "Robotronix Launches Pay-As-You-Go Robotics Model",
    category: "ANNOUNCEMENT", date: "September 2023",
    content: [
      "Robotronix has officially launched its Pay-As-You-Go robotics deployment model, making cutting-edge robotic inspection accessible to organizations without capital expenditure.",
      "The new model allows clients to deploy Robotronix robots on a per-mission or per-day basis, with full technical support, insurance, and digital reporting included in the price.",
      "\"Innovation shouldn't be locked behind CAPEX,\" said the Robotronix team. \"Our Pay-As-You-Go model democratizes access to world-class robotic inspection technology.\"",
      "The model has already been adopted by clients in the oil & gas, power, and infrastructure sectors. Early feedback indicates significant cost savings compared to both traditional inspection methods and robot ownership models.",
      "With this launch, Robotronix becomes one of the first Indian robotics companies to offer fully managed robotic inspection as a service, further differentiating itself in the market.",
    ],
  },
  "power-sector-expansion": {
    title: "Robotronix Expands Operations to Power Sector",
    category: "PRESS RELEASE", date: "June 2023",
    content: [
      "Robotronix has announced the expansion of its operations to the power generation sector, partnering with major utilities to bring robotic inspection to thermal power plants across India.",
      "The expansion focuses on boiler tube inspection, chimney assessment, and cooling tower monitoring — areas where traditional inspection requires costly shutdowns and hazardous conditions.",
      "Initial deployments at 500MW thermal power plants have demonstrated the ability to complete boiler inspections in 48-hour outage windows, compared to the typical 7-day shutdown required for manual inspection.",
      "The power sector represents a significant growth opportunity for Robotronix, with hundreds of thermal power plants across India requiring regular inspection of critical assets.",
    ],
  },
  "second-patent": {
    title: "Second Patent Granted: Height-Adaptive Inspection Platform",
    category: "PRESS RELEASE", date: "January 2023",
    content: [
      "Robotronix has received its second patent grant from the Indian Patent Office for its Height-Adaptive Robotic Inspection Platform.",
      "The patented platform enables non-destructive testing at extreme heights without scaffolding or rope access, using a combination of magnetic adhesion and vacuum-based climbing systems.",
      "This technology is particularly relevant for bridge inspection, chimney assessment, wind turbine monitoring, and building facade inspection.",
      "With two patents now granted, Robotronix has reinforced its intellectual property position in the Indian industrial robotics market.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export default async function NewsArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    notFound();
  }

  return (
    <>
      <PageHero badge={article.category} title={article.title} subtitle={article.date} />

      <section className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="container-wide max-w-3xl">
          <div className="space-y-6">
            {article.content.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>{p}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mt-12 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
            <MagneticButton variant="ghost" href="/news"><ArrowLeft size={16} /> All News</MagneticButton>
            <MagneticButton variant="filled" href="/contact">Contact Us <ArrowRight size={16} /></MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
