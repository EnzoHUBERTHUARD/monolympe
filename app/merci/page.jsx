"use client";

export default function MerciPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Georgia', serif",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          border: "1px solid rgba(212, 175, 55, 0.15)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          border: "1px solid rgba(212, 175, 55, 0.1)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          textAlign: "center",
          maxWidth: "560px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "rgba(212, 175, 55, 0.1)",
            border: "1px solid rgba(212, 175, 55, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 2rem",
            fontSize: "28px",
            color: "#d4af37",
          }}
        >
          ✓
        </div>

        <h1
          style={{
            color: "#f5f0e8",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: "400",
            letterSpacing: "-0.02em",
            marginBottom: "1rem",
            lineHeight: 1.15,
          }}
        >
          Paiement confirmé.
        </h1>

        <p
          style={{
            color: "rgba(245, 240, 232, 0.55)",
            fontSize: "1.05rem",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
          }}
        >
          Ton CV est prêt. Il ne reste plus qu'à le télécharger —
          et laisser le recruteur voir ce que tu vaux vraiment.
        </p>

        <a
          href="/cv"
          style={{
            display: "inline-block",
            background: "#d4af37",
            color: "#0a0a0a",
            padding: "0.85rem 2.2rem",
            borderRadius: "4px",
            textDecoration: "none",
            fontFamily: "'Georgia', serif",
            fontSize: "0.95rem",
            fontWeight: "700",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            transition: "opacity 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.opacity = "0.85")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          Télécharger mon CV →
        </a>

        <p
          style={{
            marginTop: "3rem",
            color: "rgba(245, 240, 232, 0.25)",
            fontSize: "0.8rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          monolympe.fr
        </p>
      </div>
    </main>
  );
}
