"use client";
import { useState, useEffect } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --ink: #0f0e0d; --paper: #f5f2ec; --cream: #ede9e0;
    --accent: #c8410a; --accent-light: #f4e8e2;
    --muted: #7a7469; --border: #d4cfc6; --white: #ffffff;
    --dark: #1a1a2e;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: var(--white); color: var(--ink); }
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; padding: 16px 40px; display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
  .nav-logo { font-family: 'Instrument Serif', serif; font-size: 22px; letter-spacing: -0.02em; color: var(--ink); text-decoration: none; }
  .nav-cta { padding: 9px 20px; background: var(--ink); color: var(--paper); border: none; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; }
  .nav-cta:hover { background: #222; }
  .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 100px 40px 60px; background: var(--paper); }
  .hero-inner { max-width: 1000px; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: var(--accent-light); color: var(--accent); font-size: 12px; font-weight: 600; padding: 5px 12px; border-radius: 20px; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 20px; }
  .hero-title { font-family: 'Instrument Serif', serif; font-size: 52px; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 20px; }
  .hero-title span { color: var(--accent); font-style: italic; }
  .hero-sub { font-size: 17px; line-height: 1.6; color: var(--muted); margin-bottom: 32px; max-width: 420px; }
  .hero-cta { display: inline-flex; align-items: center; gap: 8px; padding: 16px 32px; background: var(--ink); color: var(--paper); border: none; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 700; cursor: pointer; text-decoration: none; letter-spacing: -0.01em; transition: transform 0.12s, background 0.15s; }
  .hero-cta:hover { background: #222; transform: translateY(-2px); }
  .hero-cta-sub { font-size: 13px; color: var(--muted); margin-top: 10px; }
  .how { padding: 80px 40px; background: var(--white); }
  .how-inner { max-width: 860px; margin: 0 auto; }
  .section-badge { display: inline-flex; align-items: center; gap: 6px; background: var(--accent-light); color: var(--accent); font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 14px; }
  .section-title { font-family: 'Instrument Serif', serif; font-size: 40px; line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 10px; }
  .section-sub { font-size: 16px; color: var(--muted); margin-bottom: 48px; max-width: 500px; }
  .steps { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 32px; }
  .step { display: flex; flex-direction: column; gap: 14px; }
  .step-num { width: 40px; height: 40px; background: var(--ink); color: var(--paper); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-family: 'Instrument Serif', serif; font-size: 20px; }
  .step-title { font-weight: 700; font-size: 17px; letter-spacing: -0.01em; }
  .step-desc { font-size: 14px; line-height: 1.6; color: var(--muted); }
  .testimonials { padding: 80px 40px; background: var(--paper); }
  .testimonials-inner { max-width: 860px; margin: 0 auto; }
  .testimonials-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-top: 48px; }
  .testimonial-card { background: var(--white); border-radius: 14px; padding: 24px; border: 1px solid var(--border); }
  .testimonial-stars { color: #f59e0b; font-size: 14px; margin-bottom: 12px; letter-spacing: 2px; }
  .testimonial-text { font-size: 14px; line-height: 1.6; color: #3a3733; margin-bottom: 16px; font-style: italic; }
  .testimonial-author { display: flex; align-items: center; gap: 10px; }
  .testimonial-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--dark); display: flex; align-items: center; justify-content: center; color: var(--paper); font-size: 14px; font-weight: 600; flex-shrink: 0; }
  .testimonial-name { font-weight: 600; font-size: 13px; }
  .testimonial-role { font-size: 12px; color: var(--muted); }
  .pricing { padding: 80px 40px; background: var(--white); }
  .pricing-inner { max-width: 500px; margin: 0 auto; text-align: center; }
  .pricing-card { background: var(--dark); border-radius: 20px; padding: 40px; margin-top: 40px; color: var(--paper); }
  .pricing-price { font-family: 'Instrument Serif', serif; font-size: 64px; letter-spacing: -0.03em; line-height: 1; margin: 16px 0 4px; }
  .pricing-period { font-size: 14px; color: #a09890; margin-bottom: 28px; }
  .pricing-features { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; text-align: left; }
  .pricing-feature { display: flex; align-items: center; gap: 10px; font-size: 14px; }
  .pricing-check { color: var(--accent); font-size: 16px; font-weight: 700; }
  .pricing-cta { width: 100%; padding: 16px; background: var(--accent); color: white; border: none; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 700; cursor: pointer; letter-spacing: -0.01em; transition: background 0.15s, transform 0.12s; text-decoration: none; display: block; text-align: center; }
  .pricing-cta:hover { background: #b03508; transform: translateY(-1px); }
  .pricing-secure { font-size: 12px; color: #a09890; margin-top: 14px; }
  .footer { padding: 32px 40px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .footer-logo { font-family: 'Instrument Serif', serif; font-size: 18px; color: var(--ink); }
  .footer-text { font-size: 13px; color: var(--muted); }
  @media (max-width: 768px) {
    .hero-inner { grid-template-columns: 1fr; gap: 40px; }
    .hero-title { font-size: 36px; }
    .steps { grid-template-columns: 1fr; }
    .testimonials-grid { grid-template-columns: 1fr; }
    .nav { padding: 14px 20px; }
    .hero { padding: 80px 20px 40px; }
    .how, .testimonials, .pricing { padding: 60px 20px; }
  }
`;

// Faux avatar SVG en base64
const AVATAR_SVG = `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#2d4a7a"/>
  <circle cx="50" cy="38" r="18" fill="#a8c4e0"/>
  <ellipse cx="50" cy="85" rx="28" ry="20" fill="#a8c4e0"/>
</svg>`)}`;

function CVMockup() {
  return (
    <div style={{width:"100%", borderRadius:10, boxShadow:"0 20px 60px rgba(15,14,13,0.2)", overflow:"hidden", fontFamily:"'DM Sans', sans-serif"}}>
      <div style={{display:"flex"}}>
        {/* Colonne gauche */}
        <div style={{width:"38%", background:"#1a1a2e", padding:"24px 18px", display:"flex", flexDirection:"column", alignItems:"center", gap:"16px"}}>
          {/* Photo */}
          <div style={{width:72, height:72, borderRadius:"50%", background:"#2d4a7a", border:"3px solid #c8410a", overflow:"hidden", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center"}}>
            <svg viewBox="0 0 100 100" width="72" height="72" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" fill="#2d4a7a"/>
              <circle cx="50" cy="38" r="18" fill="#a8c4e0"/>
              <ellipse cx="50" cy="88" rx="32" ry="22" fill="#a8c4e0"/>
            </svg>
          </div>
          {/* Nom */}
          <div style={{textAlign:"center", width:"100%"}}>
            <div style={{fontFamily:"'Instrument Serif', serif", fontSize:"15px", color:"#f5f2ec", lineHeight:1.2}}>Sophie</div>
            <div style={{fontFamily:"'Instrument Serif', serif", fontSize:"15px", fontWeight:700, color:"#f5f2ec", lineHeight:1.2, marginBottom:5}}>MARTIN</div>
            <div style={{fontSize:"8px", color:"#c8410a", textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:600, lineHeight:1.4}}>Alternance Ressources Humaines</div>
          </div>
          {/* Contact */}
          <div style={{width:"100%"}}>
            <div style={{fontSize:"8px", fontWeight:700, textTransform:"uppercase", color:"#c8410a", marginBottom:6, paddingBottom:4, borderBottom:"1px solid rgba(200,65,10,0.3)"}}>Contact</div>
            <div style={{fontSize:"9px", color:"#d4cfc6", marginBottom:3}}>✉ sophie.martin@gmail.com</div>
            <div style={{fontSize:"9px", color:"#d4cfc6", marginBottom:3}}>📞 06 12 34 56 78</div>
            <div style={{fontSize:"9px", color:"#d4cfc6"}}>📍 Lyon, 69000</div>
          </div>
          {/* Formation */}
          <div style={{width:"100%"}}>
            <div style={{fontSize:"8px", fontWeight:700, textTransform:"uppercase", color:"#c8410a", marginBottom:6, paddingBottom:4, borderBottom:"1px solid rgba(200,65,10,0.3)"}}>Formation</div>
            <div style={{fontSize:"9px", color:"#d4cfc6", marginBottom:4, lineHeight:1.5}}>BTS Gestion PME<br/><span style={{opacity:0.7}}>Lycée Saint-Exupéry, Lyon · 2022-2023</span></div>
            <div style={{fontSize:"9px", color:"#d4cfc6", lineHeight:1.5}}>Bac Pro Gestion Admin.<br/><span style={{opacity:0.7}}>Lycée Lumière, Lyon · 2020-2022</span></div>
          </div>
          {/* Compétences */}
          <div style={{width:"100%"}}>
            <div style={{fontSize:"8px", fontWeight:700, textTransform:"uppercase", color:"#c8410a", marginBottom:6, paddingBottom:4, borderBottom:"1px solid rgba(200,65,10,0.3)"}}>Compétences</div>
            {["Pack Office (Excel, Word)", "Gestion administrative", "Relation client", "Organisation & rigueur", "Travail en équipe"].map(s => (
              <div key={s} style={{fontSize:"9px", color:"#d4cfc6", marginBottom:3, display:"flex", alignItems:"center", gap:4}}>
                <span style={{width:3, height:3, borderRadius:"50%", background:"#c8410a", display:"inline-block", flexShrink:0}}></span>
                {s}
              </div>
            ))}
          </div>
        </div>
        {/* Colonne droite */}
        <div style={{flex:1, background:"white", padding:"22px 18px", display:"flex", flexDirection:"column", gap:"13px"}}>
          {/* Profil */}
          <div>
            <div style={{fontSize:"8px", fontWeight:700, textTransform:"uppercase", color:"#c8410a", marginBottom:5, paddingBottom:3, borderBottom:"1px solid #f4e8e2"}}>Profil</div>
            <div style={{fontSize:"9px", lineHeight:1.65, color:"#3a3733"}}>Étudiante en BTS Gestion PME, je recherche une alternance en RH pour développer mes compétences en gestion du personnel et administration. Mon sens de l'organisation et mon aisance relationnelle me permettent de m'adapter rapidement.</div>
          </div>
          {/* Expériences */}
          <div>
            <div style={{fontSize:"8px", fontWeight:700, textTransform:"uppercase", color:"#c8410a", marginBottom:6, paddingBottom:3, borderBottom:"1px solid #f4e8e2"}}>Expériences</div>
            <div style={{marginBottom:9}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
                <span style={{fontWeight:600, fontSize:"9px", color:"#0f0e0d"}}>Assistante Administrative</span>
                <span style={{fontSize:"8px", color:"#7a7469"}}>Sept. 2022 – Juin 2023</span>
              </div>
              <div style={{fontSize:"8px", color:"#c8410a", marginBottom:3, fontWeight:500}}>Cabinet Dubois & Associés · Lyon</div>
              <div style={{fontSize:"8px", color:"#4a4643", marginBottom:1}}>• Gestion des dossiers clients et archivage</div>
              <div style={{fontSize:"8px", color:"#4a4643", marginBottom:1}}>• Accueil physique et standard téléphonique</div>
              <div style={{fontSize:"8px", color:"#4a4643"}}>• Rédaction de courriers et suivi des contrats</div>
            </div>
            <div style={{marginBottom:9}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
                <span style={{fontWeight:600, fontSize:"9px", color:"#0f0e0d"}}>Vendeuse — Stage</span>
                <span style={{fontSize:"8px", color:"#7a7469"}}>Avr. – Juin 2022</span>
              </div>
              <div style={{fontSize:"8px", color:"#c8410a", marginBottom:3, fontWeight:500}}>Fnac · Centre Commercial La Part-Dieu</div>
              <div style={{fontSize:"8px", color:"#4a4643", marginBottom:1}}>• Conseil et vente auprès de la clientèle</div>
              <div style={{fontSize:"8px", color:"#4a4643"}}>• Gestion des stocks et mise en rayon</div>
            </div>
            <div>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
                <span style={{fontWeight:600, fontSize:"9px", color:"#0f0e0d"}}>Hôtesse d'accueil — Stage</span>
                <span style={{fontSize:"8px", color:"#7a7469"}}>Juin 2021</span>
              </div>
              <div style={{fontSize:"8px", color:"#c8410a", marginBottom:3, fontWeight:500}}>Mairie de Lyon · 3ème arrondissement</div>
              <div style={{fontSize:"8px", color:"#4a4643", marginBottom:1}}>• Orientation et renseignement du public</div>
              <div style={{fontSize:"8px", color:"#4a4643"}}>• Gestion du courrier entrant et sortant</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{css}</style>

      <nav className="nav" style={{boxShadow: scrolled ? "0 2px 20px rgba(15,14,13,0.08)" : "none"}}>
        <a href="/" className="nav-logo">MonOlympe</a>
        <a href="/cv" className="nav-cta">Créer mon CV →</a>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-badge">✦ Propulsé par l'IA</div>
            <h1 className="hero-title">
              Ton CV pro en <span>2 minutes</span>, grâce à l'IA
            </h1>
            <p className="hero-sub">
              Remplis tes infos, l'IA rédige et optimise ton CV pour les recruteurs français. Sans compte, sans prise de tête.
            </p>
            <a href="/cv" className="hero-cta">✦ Créer mon CV maintenant</a>
            <p className="hero-cta-sub">Gratuit pour générer · 4,99 € pour exporter en PDF</p>
          </div>
          <div>
            <img src="/images/cv-demo.png" style={{width:"100%", borderRadius:"10px", boxShadow:"0 20px 60px rgba(15,14,13,0.2)"}} />
          </div>
        </div>
      </section>

      <section className="how">
        <div className="how-inner">
          <div className="section-badge">⚡ Simple et rapide</div>
          <h2 className="section-title">3 étapes, 2 minutes</h2>
          <p className="section-sub">Pas besoin d'être expert en rédaction. Tu donnes les infos, on fait le reste.</p>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <div className="step-title">Tu remplis tes infos</div>
              <div className="step-desc">Expériences, formation, compétences — quelques mots-clés suffisent, pas besoin de tout rédiger.</div>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <div className="step-title">L'IA optimise ton CV</div>
              <div className="step-desc">Notre IA transforme tes infos en un texte professionnel, percutant et optimisé pour les recruteurs français.</div>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <div className="step-title">Tu exportes en PDF</div>
              <div className="step-desc">Un clic pour télécharger ton CV en PDF haute qualité, prêt à envoyer à tes recruteurs.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="testimonials-inner">
          <div className="section-badge">💬 Ils nous font confiance</div>
          <h2 className="section-title">Ce qu'ils en disent</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"J'avais galéré des heures sur mon CV. Avec MonOlympe j'ai eu quelque chose de pro en 5 minutes. Mon patron m'a dit que c'était le meilleur CV qu'il avait reçu."</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">L</div>
                <div>
                  <div className="testimonial-name">Lucas, 20 ans</div>
                  <div className="testimonial-role">Alternant BTS Commerce · Décroché en 2 semaines</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"Je savais pas comment valoriser mes expériences. L'IA a mis les bons mots sur ce que je faisais vraiment. J'ai eu 3 entretiens la semaine suivante."</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" style={{background:"#2d1b4e"}}>M</div>
                <div>
                  <div className="testimonial-name">Manon, 22 ans</div>
                  <div className="testimonial-role">Alternante RH · Lyon</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"4,99€ pour un CV qui m'a permis de décrocher mon alternance à 1200€/mois... Le meilleur investissement de ma vie lol."</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" style={{background:"#1a2e1a"}}>T</div>
                <div>
                  <div className="testimonial-name">Thomas, 19 ans</div>
                  <div className="testimonial-role">Alternant Informatique · Paris</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing">
        <div className="pricing-inner">
          <div className="section-badge">💸 Simple et transparent</div>
          <h2 className="section-title">Un seul tarif, sans surprise</h2>
          <div className="pricing-card">
            <div style={{fontSize:13, color:"#a09890", textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:600}}>Export PDF</div>
            <div className="pricing-price">4,99 €</div>
            <div className="pricing-period">Paiement unique · Pas d'abonnement</div>
            <div className="pricing-features">
              {[
                "Génération IA illimitée et gratuite",
                "CV optimisé ATS pour les recruteurs",
                "Template professionnel 2 colonnes",
                "Choix de couleurs personnalisées",
                "Photo de profil optionnelle",
                "Export PDF haute qualité",
              ].map(f => (
                <div key={f} className="pricing-feature">
                  <span className="pricing-check">✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <a href="/cv" className="pricing-cta">✦ Créer mon CV maintenant</a>
            <p className="pricing-secure">🔒 Paiement sécurisé via Stripe · Remboursé si insatisfait</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span className="footer-logo">MonOlympe</span>
        <span className="footer-text">© 2025 MonOlympe · Fait avec ❤️ en France</span>
      </footer>
    </>
  );
}

