"use client";
import { useState, useRef } from "react";

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
  .section-sub { color: var(--muted); font-size: 13px; margin-bottom: 16px; }
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
  .palette-swatch { width: 28px; height: 28px; border-radius: 6px; cursor: pointer; position: relative; transition: transform 0.1s; }
  .palette-swatch:hover { transform: scale(1.15); }
  .bg-swatch { width: 28px; height: 28px; border-radius: 6px; cursor: pointer; transition: transform 0.1s; border: 1.5px solid var(--border); }
  .bg-swatch:hover { transform: scale(1.15); }
  .photo-upload { width: 100%; padding: 12px; border: 2px dashed var(--border); border-radius: 10px; background: var(--paper); cursor: pointer; text-align: center; font-size: 13px; color: var(--muted); transition: border-color 0.15s; display: flex; align-items: center; justify-content: center; gap: 8px; }
  .photo-upload:hover { border-color: var(--accent); color: var(--accent); }
`;

const PALETTES = {
  "Classique": [
    { name: "Nuit", bg: "#1a1a2e", accent: "#c8410a" },
    { name: "Marine", bg: "#1b2a4a", accent: "#4a9eff" },
    { name: "Ardoise", bg: "#2a2a2a", accent: "#aaaaaa" },
    { name: "Bordeaux", bg: "#2e1a1a", accent: "#c84a4a" },
    { name: "Forêt", bg: "#1a2e1a", accent: "#4caf50" },
  ],
  "Moderne": [
    { name: "Violet", bg: "#2d1b4e", accent: "#b39ddb" },
    { name: "Terracotta", bg: "#2e1f1a", accent: "#e64a19" },
    { name: "Pétrole", bg: "#1a2e2e", accent: "#4dd0e1" },
    { name: "Olive", bg: "#2a2e1a", accent: "#aed581" },
    { name: "Prune", bg: "#2e1a2e", accent: "#f48fb1" },
  ],
  "Pastel": [
    { name: "Rose", bg: "#3d2a2e", accent: "#f48fb1" },
    { name: "Ciel", bg: "#1a2a3d", accent: "#81d4fa" },
    { name: "Sauge", bg: "#1f2e25", accent: "#a5d6a7" },
    { name: "Pêche", bg: "#3d2e1a", accent: "#ffcc80" },
    { name: "Lavande", bg: "#2a1a3d", accent: "#ce93d8" },
  ],
};

const BG_OPTIONS = [
  { name: "Blanc", color: "#ffffff" },
  { name: "Crème", color: "#faf8f4" },
  { name: "Ivoire", color: "#f5f0e8" },
  { name: "Gris perle", color: "#f5f5f5" },
  { name: "Bleu glacé", color: "#f0f4f8" },
  { name: "Rose poudré", color: "#fdf4f4" },
];

export default function CVGenerator() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", title: "",
    email: "", phone: "", location: "",
    exp1Title: "", exp1Company: "", exp1Dates: "", exp1Desc: "",
    exp2Title: "", exp2Company: "", exp2Dates: "", exp2Desc: "",
    exp3Title: "", exp3Company: "", exp3Dates: "", exp3Desc: "",
    education: "", education2: "", education3: "",
    skills: "", targetJob: "",
  });

  const [cvData, setCvData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState("");
  const [palette, setPalette] = useState({ name: "Nuit", bg: "#1a1a2e", accent: "#c8410a" });
  const [bgColor, setBgColor] = useState("#ffffff");
  const [photo, setPhoto] = useState(null);
  const photoRef = useRef(null);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  }

  async function handleGenerate() {
    if (!form.firstName || !form.lastName || !form.title || !form.skills) {
      setError("Remplis au moins : prénom, nom, poste visé et compétences.");
      return;
    }
    setError("");
    setIsGenerating(true);
    const prompt = `Tu es un expert RH français. Génère un CV professionnel optimisé ATS pour le marché français.
Données: Nom: ${form.firstName} ${form.lastName}, Poste: ${form.title}, Email: ${form.email}, Tél: ${form.phone}, Ville: ${form.location}
Exp 1: ${form.exp1Title} chez ${form.exp1Company} (${form.exp1Dates}) — ${form.exp1Desc}
Exp 2: ${form.exp2Title ? `${form.exp2Title} chez ${form.exp2Company} (${form.exp2Dates}) — ${form.exp2Desc}` : "aucune"}
Exp 3: ${form.exp3Title ? `${form.exp3Title} chez ${form.exp3Company} (${form.exp3Dates}) — ${form.exp3Desc}` : "aucune"}
Formation: ${form.education}${form.education2 ? `, ${form.education2}` : ""}${form.education3 ? `, ${form.education3}` : ""}
Compétences: ${form.skills}, Poste cible: ${form.targetJob || form.title}

RÈGLES IMPORTANTES:
- Le profil doit être personnel, naturel et humain. Max 2-3 phrases à la première personne.
- Max 3 bullet points COURTS par expérience
- Max 8 compétences
- Ton authentique qui correspond à la personnalité du candidat

Réponds UNIQUEMENT en JSON valide sans backticks:
{"summary":"profil personnel et humain en 2-3 phrases","experiences":[{"title":"","company":"","dates":"","description":"point1 • point2 • point3"}],"skills":["skill1","skill2"],"education":"formation principale"}`;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
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
    window.location.href = "https://buy.stripe.com/00w3cv1gog1j0ca7Q37Zu01";
  }

  function doExport() {
    const win = window.open("", "_blank");
    win.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>CV – ${form.firstName} ${form.lastName}</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=DM+Sans:wght@400;600&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'DM Sans', sans-serif; }
      .cv { display: flex; min-height: 100vh; }
      .cv-left { width: 35%; background: ${palette.bg}; color: #f5f2ec; padding: 32px 24px; display: flex; flex-direction: column; gap: 24px; -webkit-print-color-adjust: exact; print-color-adjust: exact; align-items: center; }
      .cv-right { flex: 1; background: ${bgColor}; padding: 32px 28px; display: flex; flex-direction: column; gap: 20px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .cv-photo { width: 90px; height: 90px; border-radius: 50%; object-fit: cover; border: 3px solid ${palette.accent}; margin-bottom: 8px; }
      .cv-name-block { text-align: center; width: 100%; }
      .cv-firstname { font-family: 'Instrument Serif', serif; font-size: 20px; line-height: 1.2; text-align: center; }
      .cv-lastname { font-family: 'Instrument Serif', serif; font-size: 20px; font-weight: 700; line-height: 1.2; margin-bottom: 6px; text-align: center; }
      .cv-jobtitle { font-size: 10px; color: ${palette.accent}; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; text-align: center; }
      .section-label-left { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: ${palette.accent}; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,0.15); width: 100%; }
      .section-label-right { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: ${palette.accent}; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 1px solid #e8e0d4; }
      .contact-item { font-size: 12px; margin-bottom: 6px; color: #d4cfc6; }
      .edu-item { font-size: 12px; color: #d4cfc6; margin-bottom: 8px; line-height: 1.5; }
      .skill-item { font-size: 12px; color: #d4cfc6; margin-bottom: 5px; display: flex; align-items: center; gap: 6px; }
      .skill-dot { width: 4px; height: 4px; border-radius: 50%; background: ${palette.accent}; flex-shrink: 0; display: inline-block; }
      .section-left { width: 100%; }
      .summary { font-size: 13px; line-height: 1.7; color: #3a3733; }
      .exp-item { margin-bottom: 16px; }
      .exp-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
      .exp-title { font-weight: 600; font-size: 13px; color: #0f0e0d; }
      .exp-date { font-size: 11px; color: #7a7469; }
      .exp-company { font-size: 11px; color: ${palette.accent}; margin-bottom: 6px; font-weight: 500; }
      .exp-point { font-size: 12px; line-height: 1.6; color: #4a4643; margin-bottom: 3px; }
    </style></head><body>
    <div class="cv">
      <div class="cv-left">
        ${photo ? `<img src="${photo}" class="cv-photo" />` : ""}
        <div class="cv-name-block">
          <div class="cv-firstname">${form.firstName}</div>
          <div class="cv-lastname">${form.lastName}</div>
          <div class="cv-jobtitle">${form.title}</div>
        </div>
        <div class="section-left">
          <div class="section-label-left">Contact</div>
          ${form.phone ? `<div class="contact-item">📞 ${form.phone}</div>` : ""}
          ${form.email ? `<div class="contact-item">✉ ${form.email}</div>` : ""}
          ${form.location ? `<div class="contact-item">📍 ${form.location}</div>` : ""}
        </div>
        ${(form.education || form.education2 || form.education3) ? `
        <div class="section-left">
          <div class="section-label-left">Formation</div>
          ${form.education ? `<div class="edu-item">${form.education}</div>` : ""}
          ${form.education2 ? `<div class="edu-item">${form.education2}</div>` : ""}
          ${form.education3 ? `<div class="edu-item">${form.education3}</div>` : ""}
        </div>` : ""}
        ${cvData?.skills?.length ? `
        <div class="section-left">
          <div class="section-label-left">Compétences</div>
          ${cvData.skills.map(s => `<div class="skill-item"><span class="skill-dot"></span>${s}</div>`).join("")}
        </div>` : ""}
      </div>
      <div class="cv-right">
        ${cvData?.summary ? `
        <div>
          <div class="section-label-right">Profil</div>
          <div class="summary">${cvData.summary}</div>
        </div>` : ""}
        ${cvData?.experiences?.length ? `
        <div>
          <div class="section-label-right">Expériences</div>
          ${cvData.experiences.map(e => `
            <div class="exp-item">
              <div class="exp-header"><span class="exp-title">${e.title}</span><span class="exp-date">${e.dates}</span></div>
              <div class="exp-company">${e.company}</div>
              ${e.description.split('•').filter(Boolean).map(p => `<div class="exp-point">• ${p.trim()}</div>`).join("")}
            </div>`).join("")}
        </div>` : ""}
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

            {/* SÉLECTEUR DE COULEURS */}
            <div style={{marginBottom: 20, background: "var(--paper)", borderRadius: 10, padding: "14px"}}>
              <div style={{fontSize: 12, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12}}>Personnalise ton CV</div>
              <div style={{marginBottom: 12}}>
                <div style={{fontSize: 11, color: "var(--muted)", marginBottom: 8}}>Couleur principale</div>
                {Object.entries(PALETTES).map(([cat, pals]) => (
                  <div key={cat} style={{marginBottom: 8}}>
                    <div style={{fontSize: 10, color: "var(--muted)", marginBottom: 5, opacity: 0.7}}>{cat}</div>
                    <div style={{display: "flex", gap: 7, flexWrap: "wrap"}}>
                      {pals.map((p) => (
                        <div key={p.name} onClick={() => setPalette(p)} title={p.name} className="palette-swatch"
                          style={{ background: p.bg, outline: palette.name === p.name ? `3px solid ${p.accent}` : "3px solid transparent", outlineOffset: "2px" }}>
                          <div style={{position: "absolute", bottom: 3, right: 3, width: 7, height: 7, borderRadius: "50%", background: p.accent}} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{marginBottom: 12}}>
                <div style={{fontSize: 11, color: "var(--muted)", marginBottom: 8}}>Fond du CV</div>
                <div style={{display: "flex", gap: 7, flexWrap: "wrap"}}>
                  {BG_OPTIONS.map((bg) => (
                    <div key={bg.name} onClick={() => setBgColor(bg.color)} title={bg.name} className="bg-swatch"
                      style={{ background: bg.color, outline: bgColor === bg.color ? `3px solid ${palette.accent}` : "3px solid transparent", outlineOffset: "2px" }} />
                  ))}
                </div>
              </div>

              {/* PHOTO */}
              <div>
                <div style={{fontSize: 11, color: "var(--muted)", marginBottom: 8}}>Photo de profil (optionnel)</div>
                {photo ? (
                  <div style={{display: "flex", alignItems: "center", gap: 12}}>
                    <img src={photo} style={{width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: `2px solid ${palette.accent}`}} />
                    <button onClick={() => setPhoto(null)} style={{fontSize: 12, color: "var(--muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline"}}>
                      Supprimer
                    </button>
                  </div>
                ) : (
                  <div className="photo-upload" onClick={() => photoRef.current.click()}>
                    📷 Ajouter une photo
                    <input ref={photoRef} type="file" accept="image/*" style={{display: "none"}} onChange={handlePhotoChange} />
                  </div>
                )}
              </div>
            </div>

            {error && <div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:"10px 14px",fontSize:13,color:"#dc2626",marginBottom:16}}>⚠️ {error}</div>}
            {isPaid && <div className="success-banner">✅ PDF exporté ! Vérifie l'onglet d'impression.</div>}

            <div className="form-row">
              <div className="form-group"><label>Prénom *</label><input placeholder="Marie" value={form.firstName} onChange={set("firstName")} /></div>
              <div className="form-group"><label>Nom *</label><input placeholder="Dupont" value={form.lastName} onChange={set("lastName")} /></div>
            </div>
            <div className="form-group"><label>Poste visé *</label><input placeholder="Vendeur, Comptable, Assistant RH..." value={form.title} onChange={set("title")} /></div>
            <div className="form-row">
              <div className="form-group"><label>Email</label><input type="email" placeholder="marie@email.com" value={form.email} onChange={set("email")} /></div>
              <div className="form-group"><label>Téléphone</label><input placeholder="06 00 00 00 00" value={form.phone} onChange={set("phone")} /></div>
            </div>
            <div className="form-group"><label>Ville</label><input placeholder="Paris, France" value={form.location} onChange={set("location")} /></div>

            <div className="divider" />
            <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:"var(--muted)",marginBottom:12}}>Expérience 1</div>
            <div className="form-row">
              <div className="form-group"><label>Poste</label><input placeholder="Vendeur en magasin" value={form.exp1Title} onChange={set("exp1Title")} /></div>
              <div className="form-group"><label>Entreprise</label><input placeholder="StartupXYZ" value={form.exp1Company} onChange={set("exp1Company")} /></div>
            </div>
            <div className="form-group"><label>Période</label><input placeholder="Janv. 2022 – Aujourd'hui" value={form.exp1Dates} onChange={set("exp1Dates")} /></div>
            <div className="form-group"><label>Description (quelques mots-clés suffisent)</label><textarea placeholder="Accueil clients, gestion caisse, mise en rayon..." value={form.exp1Desc} onChange={set("exp1Desc")} /></div>

            <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:"var(--muted)",margin:"12px 0 12px"}}>Expérience 2 (optionnel)</div>
            <div className="form-row">
              <div className="form-group"><label>Poste</label><input placeholder="Stage Commerce" value={form.exp2Title} onChange={set("exp2Title")} /></div>
              <div className="form-group"><label>Entreprise</label><input placeholder="Entreprise ABC" value={form.exp2Company} onChange={set("exp2Company")} /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Période</label><input placeholder="Janv. 2021 – Juin 2021" value={form.exp2Dates} onChange={set("exp2Dates")} /></div>
              <div className="form-group"><label>Description</label><input placeholder="Gestion stocks, relation client..." value={form.exp2Desc} onChange={set("exp2Desc")} /></div>
            </div>

            <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:"var(--muted)",margin:"12px 0 12px"}}>Expérience 3 (optionnel)</div>
            <div className="form-row">
              <div className="form-group"><label>Poste</label><input placeholder="Stage Administratif" value={form.exp3Title} onChange={set("exp3Title")} /></div>
              <div className="form-group"><label>Entreprise</label><input placeholder="EntrepriseXYZ" value={form.exp3Company} onChange={set("exp3Company")} /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Période</label><input placeholder="Janv. 2020 – Juin 2020" value={form.exp3Dates} onChange={set("exp3Dates")} /></div>
              <div className="form-group"><label>Description</label><input placeholder="Excel, communication..." value={form.exp3Desc} onChange={set("exp3Desc")} /></div>
            </div>

            <div className="divider" />
            <div className="form-group"><label>Formation</label><input placeholder="Licence Info, Univ. Paris — 2021" value={form.education} onChange={set("education")} /></div>
            <div className="form-group"><label>Formation 2 (optionnel)</label><input placeholder="BTS Commerce — 2019" value={form.education2} onChange={set("education2")} /></div>
            <div className="form-group"><label>Formation 3 (optionnel)</label><input placeholder="Baccalauréat — 2017" value={form.education3} onChange={set("education3")} /></div>
            <div className="form-group"><label>Tes compétences</label><input placeholder="Excel, Word, PowerPoint, permis B..." value={form.skills} onChange={set("skills")} /></div>
            <div className="form-group"><label>Poste que tu recherches</label><input placeholder="Alternance Commerce Paris" value={form.targetJob} onChange={set("targetJob")} /></div>

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
              <div style={{position:"relative", width:"100%", maxWidth:600}}>
                {isGenerating && (
                  <div className="generating-overlay">
                    <div className="gen-spinner" />
                    <div className="gen-text">L'IA rédige ton CV…</div>
                    <div className="gen-sub">Optimisation ATS en cours</div>
                  </div>
                )}
                {hasData && (
                  <div style={{display:"flex", minHeight:"600px", boxShadow:"var(--shadow-lg)", borderRadius:"4px", overflow:"hidden"}}>
                    <div style={{width:"35%", background:palette.bg, color:"#f5f2ec", padding:"28px 20px", display:"flex", flexDirection:"column", alignItems:"center", gap:"18px"}}>
                      {photo && (
                        <img src={photo} style={{width:80, height:80, borderRadius:"50%", objectFit:"cover", border:`3px solid ${palette.accent}`, flexShrink:0}} />
                      )}
                      <div style={{width:"100%"}}>
                        <div style={{fontFamily:"'Instrument Serif', serif", fontSize:"18px", lineHeight:"1.2", textAlign:"center"}}>{form.firstName}</div>
                        <div style={{fontFamily:"'Instrument Serif', serif", fontSize:"18px", fontWeight:"700", lineHeight:"1.2", marginBottom:"6px", textAlign:"center"}}>{form.lastName}</div>
                        <div style={{fontSize:"9px", color:palette.accent, textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:"600", lineHeight:"1.4", textAlign:"center"}}>{form.title}</div>
                      </div>
                      <div style={{width:"100%"}}>
                        <div style={{fontSize:"9px", fontWeight:"700", textTransform:"uppercase", letterSpacing:"0.1em", color:palette.accent, marginBottom:"8px", paddingBottom:"5px", borderBottom:`1px solid ${palette.accent}44`}}>Contact</div>
                        {form.phone && <div style={{fontSize:"11px", marginBottom:"5px", color:"#d4cfc6"}}>📞 {form.phone}</div>}
                        {form.email && <div style={{fontSize:"11px", marginBottom:"5px", color:"#d4cfc6", wordBreak:"break-all"}}>✉ {form.email}</div>}
                        {form.location && <div style={{fontSize:"11px", color:"#d4cfc6"}}>📍 {form.location}</div>}
                      </div>
                      {(form.education || form.education2 || form.education3) && (
                        <div style={{width:"100%"}}>
                          <div style={{fontSize:"9px", fontWeight:"700", textTransform:"uppercase", letterSpacing:"0.1em", color:palette.accent, marginBottom:"8px", paddingBottom:"5px", borderBottom:`1px solid ${palette.accent}44`}}>Formation</div>
                          {form.education && <div style={{fontSize:"11px", color:"#d4cfc6", marginBottom:"6px", lineHeight:"1.5"}}>{form.education}</div>}
                          {form.education2 && <div style={{fontSize:"11px", color:"#d4cfc6", marginBottom:"6px", lineHeight:"1.5"}}>{form.education2}</div>}
                          {form.education3 && <div style={{fontSize:"11px", color:"#d4cfc6", lineHeight:"1.5"}}>{form.education3}</div>}
                        </div>
                      )}
                      {cvData.skills?.length > 0 && (
                        <div style={{width:"100%"}}>
                          <div style={{fontSize:"9px", fontWeight:"700", textTransform:"uppercase", letterSpacing:"0.1em", color:palette.accent, marginBottom:"8px", paddingBottom:"5px", borderBottom:`1px solid ${palette.accent}44`}}>Compétences</div>
                          {cvData.skills.map((s, i) => (
                            <div key={i} style={{fontSize:"11px", color:"#d4cfc6", marginBottom:"4px", display:"flex", alignItems:"center", gap:"5px"}}>
                              <span style={{width:"3px", height:"3px", borderRadius:"50%", background:palette.accent, flexShrink:0, display:"inline-block"}}></span>
                              {s}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div style={{flex:1, background:bgColor, padding:"32px 24px", display:"flex", flexDirection:"column", gap:"18px"}}>
                      {cvData.summary && (
                        <div>
                          <div style={{fontSize:"9px", fontWeight:"700", textTransform:"uppercase", letterSpacing:"0.1em", color:palette.accent, marginBottom:"8px", paddingBottom:"5px", borderBottom:`1px solid ${palette.accent}33`}}>Profil</div>
                          <div style={{fontSize:"12px", lineHeight:"1.7", color:"#3a3733"}}>{cvData.summary}</div>
                        </div>
                      )}
                      {cvData.experiences?.length > 0 && (
                        <div>
                          <div style={{fontSize:"9px", fontWeight:"700", textTransform:"uppercase", letterSpacing:"0.1em", color:palette.accent, marginBottom:"10px", paddingBottom:"5px", borderBottom:`1px solid ${palette.accent}33`}}>Expériences</div>
                          {cvData.experiences.map((exp, i) => (
                            <div key={i} style={{marginBottom:"14px"}}>
                              <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"2px"}}>
                                <span style={{fontWeight:"600", fontSize:"12px", color:"#0f0e0d"}}>{exp.title}</span>
                                <span style={{fontSize:"10px", color:"#7a7469", whiteSpace:"nowrap", marginLeft:"8px"}}>{exp.dates}</span>
                              </div>
                              <div style={{fontSize:"10px", color:palette.accent, marginBottom:"5px", fontWeight:"500"}}>{exp.company}</div>
                              <div style={{fontSize:"11px", lineHeight:"1.6", color:"#4a4643"}}>
                                {exp.description.split('•').filter(Boolean).map((point, j) => (
                                  <div key={j} style={{marginBottom:"2px"}}>• {point.trim()}</div>
                                ))}
                              </div>
                            </div>
                          ))}
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
              <div className="modal-feature"><span className="check">✓</span> Template professionnel 2 colonnes</div>
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

