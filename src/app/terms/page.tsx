import PageHero from "@/components/ui/PageHero";

export default function Page() {
  return (
    <>
      <PageHero title="Terms of Use" subtitle="Last updated: January 2024" />
      <section className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="container-wide max-w-3xl space-y-8">
          {[
            { title: "Acceptance of Terms", content: "By accessing and using the Robotronix website, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website." },
            { title: "Use of Website", content: "This website is provided for informational purposes about Robotronix and Scalability Technology (P) LTD's products and services. You may not use this website for any unlawful purpose or in violation of any applicable laws." },
            { title: "Intellectual Property", content: "All content on this website, including text, images, logos, and designs, is the property of Robotronix and is protected by intellectual property laws. Our patent-granted technologies are protected under Indian patent law." },
            { title: "Service Descriptions", content: "While we strive to provide accurate descriptions of our robotic inspection services, actual service delivery may vary based on site-specific conditions, safety requirements, and other factors discussed during the assessment phase." },
            { title: "Limitation of Liability", content: "Robotronix shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of this website or reliance on any information provided herein." },
            { title: "Third-Party Links", content: "Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or availability of such external sites." },
            { title: "Modifications", content: "We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting on this page." },
            { title: "Governing Law", content: "These terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Gurgaon, Haryana." },
            { title: "Contact", content: "For questions regarding these Terms of Use, contact us at info@robotronix.in or write to: Robotronix and Scalability Technology Pvt. Ltd., Gurgaon, Haryana 122011, India." },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>{section.title}</h2>
              <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
