"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="section-padding min-h-[70vh] flex items-center" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="container-wide text-center">
        <p className="label-text mb-4">Something went wrong</p>
        <h1 className="mb-6">Unable to Load This Page</h1>
        <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
          Please retry the request. If the issue continues, contact the Robotronix team.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-7 py-3.5 font-medium text-bg-primary transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
        >
          Try Again
        </button>
      </div>
    </section>
  );
}
