"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#030712", color: "#f0f4ff", padding: "2rem" }}>
          <div style={{ maxWidth: "40rem", textAlign: "center" }}>
            <p style={{ color: "#8a9bc5", textTransform: "uppercase", letterSpacing: "0.15em" }}>Application Error</p>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1, margin: "1rem 0" }}>Robotronix could not load.</h1>
            <p style={{ color: "#8a9bc5", marginBottom: "2rem" }}>Please retry the request.</p>
            <button onClick={reset} style={{ border: "1px solid #00d4ff", borderRadius: "999px", background: "#00d4ff", color: "#030712", padding: "0.875rem 1.5rem", fontWeight: 700 }}>
              Try Again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
