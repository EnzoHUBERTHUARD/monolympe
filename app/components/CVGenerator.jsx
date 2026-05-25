"use client";
import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --ink: #0f0e0d; --paper: #f5f2ec; --cream: #ede9e0;
    --accent: #c8410a; --accent-light: #f4e8e2;
    --muted: #7a7469; --border: #d4cfc6; --white: #ffffff;
    --shadow-lg: 0 12px 48px rgba(15,14,13,0.16);
  }
  body { font-family: 'DM Sans', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }
  .app-shell { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }
  .left-panel { background: var(--white); border-right: 1px solid var(--border); display: flex; flex-direction: column; overflow-y: auto; }
  .brand-bar { padding: 20px 28px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
  .brand-logo { width: 32px; height: 32px; background: var(--ink); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--paper); font-family: 'Instrument Serif', serif; font-size: 18px; }
  .brand-name { font-family: 'Instrument Serif', serif; font-size: 20px; letter-spacing: -0.02em; }
  .brand-badge { margin-left: auto; background: var(--accent-light); color: var(--accent); font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 20px; text-transform: uppercase; }
  .form-body { padding: 28px; flex: 1; display: flex; flex-direction: column; }
  .section-title { font-family: 'Instrument Serif', serif; font-size: 22px; letter-spacing: -0.02em; margin-bottom: 4px; }
  .section-sub { color: var(--muted); font-size: 13px; margin-bottom: 20px; }
  .form-group { margin-bottom: 16px; }
  label { display: block; font-size: 12px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 5px; }
  input, textarea { width: 100%; padding: 10px 13px; border: 1.5px solid var(--border); border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 14px; background: var(--paper); color: var(--ink); outline: none; resize: none; }
  input:focus, textarea:focus { border-color: var(--accent); background: var(--white); }
  textarea { min-height: 80px; line-height: 1.5; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .divider { height: 1px; background: var(--border); margin: 24px 0; }
  .btn-generate { width: 100%; padding: 14px; background: var(--ink); color: var(--paper); border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 4px; }
  .btn-generate:hover { background: #222; }
  .btn-generate:disabled { opacity: 0.5; cursor: not-allowed; }
  .spinner { width: 16px; height: 16px; border: 2px solid rgba(245,242,236,0.3); border-top-color: var(--paper); border-radius: 50%; animation: spin 0.7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .right-panel { background: var(--cream); display: flex; flex-direction: column; position: sticky; top: 0; height: 100vh; overflow: hidden; }
  .preview-header { padding: 16px 24px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; background: var(--white); }
  .preview-title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); }
  .btn-export { padding: 9px 18px; background: var(--accent); color: white; border: none; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; }
  .btn-export:hover { background: #b03508; }
  .btn-export:disabled { opacity: 0.4; cursor: not-allowed; }
  .preview-scroll { flex: 1; overflow-y: auto; padding: 28px 24px; display: flex; justify-content: center; }
  .cv-doc { width: 100%; max-width: 600px; background: var(--white); border-radius: 4px; box-shadow: var(--shadow-lg); overflow: hidden; }
  .cv-header { background: var(--ink); color: var(--paper); padding: 36px 40px 28px; }
  .cv-name { font-family: 'Instrument Serif', serif; font-size: 34px; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 4px; }
  .cv-title-text { font-size: 14px; color: #a09890; margin-bottom: 18px; }
  .cv-contacts { display: flex; flex-wrap: wrap; gap: 14px; font-size: 12px; color: #c8c0b8; }
  .cv-body { padding: 32px 40px; display: flex; flex-direction: column; gap: 24px; }
  .cv-section-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--accent); margin-bottom: 12px; padding-bottom: 6px; border-bottom: 1px solid var(--accent-light); }
  .cv-summary { font-size: 13.5px; line-height: 1.65; color: #3a3733; }
  .cv-exp-item { margin-bottom: 16px; }
  .cv-exp-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
  .cv-job-title { font-weight: 600; font-size: 14px; }
  .cv-job-date { font-size: 11px; color: var(--muted); font-family: 'DM Mono', monospace; }
  .cv-company { font-size: 12px; color: var(--muted); margin-bottom: 6px; }
  .cv-exp-desc { font-size: 12.5px; line-height: 1.6; color: #4a4643; }
  .cv-skills-grid { display: flex; flex-wrap: wrap; gap: 7px; }
  .cv-skill-tag { background: var(--cream); border: 1px solid var(--border); padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 500; }
  .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; color: var(--muted); gap: 12px; padding: 40px; }
  .empty-icon { font-size: 48px; opacity: 0.3; }
  .empty-text { font-family: 'Instrument Serif', serif; font-size: 22px; color: var(--ink); opacity: 0.35; }
  .empty-sub { font-size: 13px; max-width: 220px; line-height: 1.5; opacity: 0.6; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(15,14,13,0.65); display: flex; align-items: center; justify-content: center; z-index: 100; backdrop-filter: blur(4px); }
  .modal { background: var(--white); border-radius: 16px; padding: 36px; max-width: 400px; width: 90%; box-shadow: var(--shadow-lg); }
  .modal-icon { font-size: 32px; margin-bottom: 16px; }
  .modal-title { font-family: 'Instrument Serif', serif; font-size: 26px; letter-spacing: -0.02em; margin-bottom: 6px; }
  .modal-sub { color: var(--muted); font-size: 14px; line-height: 1.5; margin-bottom: 24px; }
  .modal-price { background: var(--cream); border: 1px solid var(--border); border-radius: 10px; padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .price-label { font-size: 13px; color: var(--muted); }
  .price-amount { font-family: 'Instrument Serif', serif; font-size: 28px; }
  .modal-features { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
  .modal-feature { font-size: 13px; display: flex; align-items: center; gap: 8px; }
  .check { color: var(--accent); font-weight: 700; }
  .btn-pay { width: 100%; padding: 15px; background: var(--accent); color: white; border: none; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; margin-bottom: 10px; }
  .btn-pay:hover { background: #b03508; }
  .btn-cancel { width: 100%; padding: 12px; background: transparent; color: var(--muted); border: none; font-family: 'DM Sans', sans-serif; font-size: 14px; cursor: pointer; }
  .modal-secure { text-align: center; font-size: 11px; color: var(--muted); margin-top: 8px; }
  .success-banner { background: #e8f5e9; border: 1px solid #a5d6a7; border-radius: 8px; padding: 12px 16px; font-size: 13px; color: #2e7d32; font-weight: 500; display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
  .generating-overlay { position: absolute; inset: 0; background: rgba(245,242,236,0.85); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; z-index: 10; }
  .gen-spinner { width: 40px; height: 40px; border: 3px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite; }
  .gen-text { font-family: 'Instrument Serif', serif; font-size: 18px; }
  .gen-sub { font-size: 13px; color: var(--muted); }
`;export default function CVGenerator() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", title: "",
    email: "", phone: "", location: "",
    exp1Title: "", exp1Company: "", exp1Dates: "", exp1Desc: "",
    exp2Title: "", exp2Company: "", exp2Dates: "", exp2Desc: "",
    education: "", skills: "", targetJob: "",
  });

  const [cvData, setCvData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  async function handleGenerate() {
    if (!form.firstName || !form.lastName || !form.title || !form.skills) {
      setError("Remplis au moins : prénom, nom, poste visé et compétences.");
      return;
    }
    setError("");
    setIsGenerating(true);
    const prompt = `Tu es un expert RH français. Génère un CV professionnel optimisé ATS.
Données: Nom: ${form.firstName} ${form.lastName}, Poste: ${form.title}, Email: ${form.email}, Tél: ${form.phone}, Ville: ${form.location}
Exp 1: ${form.exp1Title} chez ${form.exp1Company} (${form.exp1Dates}) — ${form.exp1Desc}
Exp 2: ${form.exp2Title ? `${form.exp2Title} chez ${form.exp2Company} (${form.exp2Dates}) — ${form.exp2Desc}` : "aucune"}
Formation: ${form.education}, Compétences: ${form.skills}, Poste cible: ${form.targetJob || form.title}
Réponds UNIQUEMENT en JSON valide sans backticks:
{"summary":"accroche 2-3 phrases avec mots-clés ATS","experiences":[{"title":"","company":"","dates":"","description":"bullet points séparés par \\n• "}],"skills":["skill1","skill2"],"education":"formation formatée"}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
  "Content-Type": "application/json",
  "x-api-key": process.env.NEXT_PUBLIC_ANTHROPIC_KEY,
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-direct-browser-access": "true",
},
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "";
      const clean = text.replace(/```json|```/g, "").trim();
      setCvData(JSON.parse(clean));
    } catch (e) {
      setError("Erreur lors de la génération. Réessaie.");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleExportClick() {
    if (!cvData) return;
    if (isPaid) { doExport(); return; }
    setShowModal(true);
  }

  function handlePay() {
    window.location.href = "https://buy.stripe.com/test_eVq5kD4zCamicKlduJ77O00";
  }

  function doExport() {
    const win = window.open("", "_blank");
    win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>CV – ${form.firstName} ${form.lastName}</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=DM+Sans:wght@400;600&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'DM Sans', sans-serif; }
      .cv { max-width: 700px; margin: 0 auto; }
      .cv-header { background: #0f0e0d !important; color: #f5f2ec !important; padding: 40px 48px 32px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .cv-name { font-family: 'Instrument Serif', serif; font-size: 38px; margin-bottom: 4px; }
      .cv-title { font-size: 14px; color: #a09890; margin-bottom: 16px; }
      .cv-contacts { display: flex; flex-wrap: wrap; gap: 14px; font-size: 12px; color: #c8c0b8; }
      .cv-body { padding: 36px 48px; }
      .cv-section { margin-bottom: 28px; }
      .cv-section-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #c8410a; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 1px solid #f4e8e2; }
      .cv-text { font-size: 13.5px; line-height: 1.65; color: #3a3733; }
      .exp-item { margin-bottom: 16px; }
      .exp-header { display: flex; justify-content: space-between; }
      .job-title { font-weight: 600; font-size: 14px; }
      .job-date { font-size: 11px; color: #7a7469; }
      .company { font-size: 12px; color: #7a7469; margin-bottom: 4px; }
      .exp-desc { font-size: 12.5px; line-height: 1.6; white-space: pre-line; }
      .skills-wrap { display: flex; flex-wrap: wrap; gap: 7px; }
      .skill-tag { background: #ede9e0; border: 1px solid #d4cfc6; padding: 4px 10px; border-radius: 20px; font-size: 12px; }
    </style></head><body>
    <div class="cv">
      <div class="cv-header">
        <div class="cv-name">${form.firstName} ${form.lastName}</div>
        <div class="cv-title">${form.title}</div>
        <div class="cv-contacts">
          ${form.email ? `<span>${form.email}</span>` : ""}
          ${form.phone ? `<span>${form.phone}</span>` : ""}
          ${form.location ? `<span>${form.location}</span>` : ""}
        </div>
      </div>
      <div class="cv-body">
        ${cvData?.summary ? `<div class="cv-section"><div class="cv-section-label">Profil</div><div class="cv-text">${cvData.summary}</div></div>` : ""}
        ${cvData?.experiences?.length ? `<div class="cv-section"><div class="cv-section-label">Expériences</div>${cvData.experiences.map(e => `<div class="exp-item"><div class="exp-header"><span class="job-title">${e.title}</span><span class="job-date">${e.dates}</span></div><div class="company">${e.company}</div><div class="exp-desc">• ${e.description}</div></div>`).join("")}</div>` : ""}
        ${cvData?.education ? `<div class="cv-section"><div class="cv-section-label">Formation</div><div class="cv-text">${cvData.education}</div></div>` : ""}
        ${cvData?.skills?.length ? `<div class="cv-section"><div class="cv-section-label">Compétences</div><div class="skills-wrap">${cvData.skills.map(s => `<span class="skill-tag">${s}</span>`).join("")}</div></div>` : ""}
      </div>
    </div>
    <script>window.onload=()=>{window.print();}<\/script>
    </body></html>`);
    win.document.close();
  }

  const hasData = !!cvData;
  return (
    <>
      <style>{css}</style>
      <div className="app-shell">
        <div className="left-panel">
          <div className="brand-bar">
            <div className="brand-logo">M</div>
            <span className="brand-name">MonOlympe</span>
            <span className="brand-badge">IA</span>
          </div>
          <div className="form-body">
            <div className="section-title">Crée ton CV pro</div>
            <div className="section-sub">Remplis tes infos · L'IA optimise le texte</div>

            {error && <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:"10px 14px",fontSize:13,color:"#dc2626",marginBottom:16}}>⚠️ {error}</div>}
            {isPaid && <div className="success-banner">✅ PDF exporté ! Vérifie l'onglet d'impression.</div>}

            <div className="form-row">
              <div className="form-group"><label>Prénom *</label><input placeholder="Marie" value={form.firstName} onChange={set("firstName")} /></div>
              <div className="form-group"><label>Nom *</label><input placeholder="Dupont" value={form.lastName} onChange={set("lastName")} /></div>
            </div>
            <div className="form-group"><label>Poste visé *</label><input placeholder="Développeur Full-Stack" value={form.title} onChange={set("title")} /></div>
            <div className="form-row">
              <div className="form-group"><label>Email</label><input type="email" placeholder="marie@email.com" value={form.email} onChange={set("email")} /></div>
              <div className="form-group"><label>Téléphone</label><input placeholder="06 00 00 00 00" value={form.phone} onChange={set("phone")} /></div>
            </div>
            <div className="form-group"><label>Ville</label><input placeholder="Paris, France" value={form.location} onChange={set("location")} /></div>

            <div className="divider" />
            <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:"var(--muted)",marginBottom:12}}>Expérience 1</div>
            <div className="form-row">
              <div className="form-group"><label>Poste</label><input placeholder="Dev Frontend" value={form.exp1Title} onChange={set("exp1Title")} /></div>
              <div className="form-group"><label>Entreprise</label><input placeholder="StartupXYZ" value={form.exp1Company} onChange={set("exp1Company")} /></div>
            </div>
            <div className="form-group"><label>Période</label><input placeholder="Janv. 2022 – Aujourd'hui" value={form.exp1Dates} onChange={set("exp1Dates")} /></div>
            <div className="form-group"><label>Description</label><textarea placeholder="React, APIs REST, +40% perf..." value={form.exp1Desc} onChange={set("exp1Desc")} /></div>

            <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:"var(--muted)",margin:"12px 0 12px"}}>Expérience 2 (optionnel)</div>
            <div className="form-row">
              <div className="form-group"><label>Poste</label><input placeholder="Stage Dev Web" value={form.exp2Title} onChange={set("exp2Title")} /></div>
              <div className="form-group"><label>Entreprise</label><input placeholder="AgenceABC" value={form.exp2Company} onChange={set("exp2Company")} /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Période</label><input placeholder="Été 2021" value={form.exp2Dates} onChange={set("exp2Dates")} /></div>
              <div className="form-group"><label>Description</label><input placeholder="WordPress, PHP..." value={form.exp2Desc} onChange={set("exp2Desc")} /></div>
            </div>

            <div className="divider" />
            <div className="form-group"><label>Formation</label><input placeholder="Licence Info, Univ. Paris — 2021" value={form.education} onChange={set("education")} /></div>
            <div className="form-group"><label>Compétences * (séparées par virgule)</label><input placeholder="React, Node.js, SQL, Figma" value={form.skills} onChange={set("skills")} /></div>
            <div className="form-group"><label>Poste cible ATS</label><input placeholder="Alternance Dev React Paris" value={form.targetJob} onChange={set("targetJob")} /></div>

            <button className="btn-generate" onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? <><div className="spinner" /> Génération en cours...</> : "✦ Générer mon CV avec l'IA"}
            </button>
          </div>
        </div>

        <div className="right-panel">
          <div className="preview-header">
            <span className="preview-title">Aperçu CV</span>
            <button className="btn-export" onClick={handleExportClick} disabled={!hasData || isExporting}>
              {isExporting ? "Traitement..." : "↓ Exporter PDF — 4,99 €"}
            </button>
          </div>
          <div className="preview-scroll">
            {!hasData && !isGenerating ? (
              <div className="empty-state">
                <div className="empty-icon">📄</div>
                <div className="empty-text">Ton CV apparaîtra ici</div>
                <div className="empty-sub">Remplis le formulaire et clique sur "Générer"</div>
              </div>
            ) : (
              <div style={{position:"relative",width:"100%",maxWidth:600}}>
                {isGenerating && (
                  <div className="generating-overlay">
                    <div className="gen-spinner" />
                    <div className="gen-text">L'IA rédige ton CV…</div>
                    <div className="gen-sub">Optimisation ATS en cours</div>
                  </div>
                )}
                {hasData && (
                  <div className="cv-doc">
                    <div className="cv-header">
                      <div className="cv-name">{form.firstName} {form.lastName}</div>
                      <div className="cv-title-text">{form.title}</div>
                      <div className="cv-contacts">
                        {form.email && <span>✉ {form.email}</span>}
                        {form.phone && <span>✆ {form.phone}</span>}
                        {form.location && <span>◎ {form.location}</span>}
                      </div>
                    </div>
                    <div className="cv-body">
                      {cvData.summary && <div><div className="cv-section-label">Profil</div><div className="cv-summary">{cvData.summary}</div></div>}
                      {cvData.experiences?.length > 0 && (
                        <div>
                          <div className="cv-section-label">Expériences</div>
                          {cvData.experiences.map((exp, i) => (
                            <div key={i} className="cv-exp-item">
                              <div className="cv-exp-header"><span className="cv-job-title">{exp.title}</span><span className="cv-job-date">{exp.dates}</span></div>
                              <div className="cv-company">{exp.company}</div>
                              <div className="cv-exp-desc">• {exp.description}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      {cvData.education && <div><div className="cv-section-label">Formation</div><div className="cv-summary">{cvData.education}</div></div>}
                      {cvData.skills?.length > 0 && (
                        <div>
                          <div className="cv-section-label">Compétences</div>
                          <div className="cv-skills-grid">{cvData.skills.map((s, i) => <span key={i} className="cv-skill-tag">{s}</span>)}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">📥</div>
            <div className="modal-title">Télécharge ton CV</div>
            <div className="modal-sub">Un paiement unique pour exporter ton CV en PDF haute qualité.</div>
            <div className="modal-price">
              <div><div className="price-label">Export PDF</div><div style={{fontSize:11,color:"var(--muted)"}}>Accès permanent</div></div>
              <div className="price-amount">4,99 €</div>
            </div>
            <div className="modal-features">
              <div className="modal-feature"><span className="check">✓</span> CV optimisé ATS par l'IA</div>
              <div className="modal-feature"><span className="check">✓</span> Template professionnel</div>
              <div className="modal-feature"><span className="check">✓</span> PDF haute qualité imprimable</div>
              <div className="modal-feature"><span className="check">✓</span> Modifications illimitées</div>
            </div>
            <button className="btn-pay" onClick={handlePay}>💳 Payer 4,99 € et télécharger</button>
            <button className="btn-cancel" onClick={() => setShowModal(false)}>Annuler</button>
            <div className="modal-secure">🔒 Paiement sécurisé via Stripe · Remboursé si insatisfait</div>
          </div>
        </div>
      )}
    </>
  );
}