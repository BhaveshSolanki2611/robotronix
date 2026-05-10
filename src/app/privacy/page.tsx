import PageHero from "@/components/ui/PageHero";

export default function Page() {
  return (
    <>
      <PageHero title="Privacy Policy" subtitle="Last updated: January 2024" />
      <section className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
        <div className="container-wide max-w-3xl space-y-8">
          {[
            { title: "Information We Collect", content: "We collect information you provide directly, such as your name, email address, company name, and phone number when you fill out our contact form or request a demo. We may also collect usage data through cookies and analytics tools." },
            { title: "How We Use Your Information", content: "Your information is used to respond to your inquiries, provide our robotic inspection services, send relevant communications, and improve our website and services. We do not sell your personal data to third parties." },
            { title: "Data Security", content: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. All data transmissions are encrypted using SSL/TLS protocols." },
            { title: "Cookies", content: "Our website uses essential cookies for functionality and analytics cookies to understand how visitors interact with our site. You can manage cookie preferences through your browser settings." },
            { title: "Third-Party Services", content: "We may use third-party services such as analytics platforms and email service providers. These services have their own privacy policies governing the use of your information." },
            { title: "Your Rights", content: "You have the right to access, correct, or delete your personal data. You may also object to or restrict certain processing activities. To exercise these rights, please contact us at info@robotronix.in." },
            { title: "Changes to This Policy", content: "We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date." },
            { title: "Contact", content: "For any privacy-related questions or concerns, please contact us at info@robotronix.in or write to us at: Robotronix and Scalability Technology Pvt. Ltd., Gurgaon, Haryana 122011, India." },
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
