import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-padding min-h-[70vh] flex items-center" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="container-wide text-center">
        <p className="label-text mb-4">404</p>
        <h1 className="mb-6">Page Not Found</h1>
        <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
          The page you are looking for may have moved, or the inspection route is no longer active.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-7 py-3.5 font-medium text-bg-primary transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
