"use client";

export default function MerciPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f0eb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Georgia', serif",
        padding: "2rem",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "520px",
        }}
      >
        {/* Icône */}
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "#fff",
            border: "1px solid #d9cfc5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 2rem",
            fontSize: "22px",
            color: "#b07d5b",
          }}
        >
          ✓
        </div>

        {/* Titre */}
        <h1
          style={{
            color: "#1a1a1a",
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: "400",
            letterSpacing: "-0.02em",
            marginBottom: "1rem",
            lineHeight: 1.2,
          }}
        >
          Paiement confirmé.
        </h1>

        {/* Sous-titre */}
        <p
          style={{
            color: "#6b6157",
            fontSize: "1rem",
            lineHeight: 1.75,
            marginBottom: "2.5rem",
            fontStyle: "italic",
          }}
        >
          Ton CV est prêt. Il ne reste plus qu'à le télécharger —
          et laisser le recruteur voir ce que tu vaux vraiment.
        </p>

        {/* Bouton */}
        <a
          href="/cv"
          style={{
            display: "inline-block",
            background: "#c4784a",
            color: "#fff",
            padding: "0.85rem 2.2rem",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontFamily: "sans-serif",
            fontWeight: "600",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
          onMouseOver={(e) => (e.target.style.opacity = "0.85")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          Télécharger mon CV →
        </a>

        {/* Footer */}
        <p
          style={{
            marginTop: "3rem",
            color: "#b0a89e",
            fontSize: "0.78rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          monolympe.fr
        </p>
      </div>
    </main>
  );
}
