import { useDeferredValue, useMemo, useState } from "react";
import { FiArrowRight, FiCheck, FiSearch, FiShield, FiTarget, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { healthcareTracks, professionalTemplates } from "../static-data/professional-templates";
import "../css/template-gallery.css";

const atsTone = { Excellent: "ats-excellent", Strong: "ats-strong" };

function ResumePreview({ template }) {
  const { sample } = template;
  return <div className="cv-sheet" style={{ "--cv-accent": template.accent }} aria-label={`Full ${template.name} CV preview`}>
    <header><h3>{sample.name}</h3><p>{sample.title}</p><small>email@example.com · +00 000 000 0000 · City, Country</small></header>
    <section><h4>Professional profile</h4><p>Compassionate healthcare professional delivering safe, evidence-based care through clear communication and multidisciplinary collaboration.</p></section>
    <section><h4>Registration & credentials</h4><p>{sample.credentials}</p></section>
    <section><h4>Core clinical skills</h4><p>{sample.skills}</p></section>
    <section><h4>Clinical experience</h4><strong>{sample.role}</strong><small>Regional Healthcare Centre · 2022–Present</small><ul><li>Delivered person-centred care in line with clinical protocols.</li><li>Maintained accurate records and supported safe handovers.</li></ul></section>
    <section><h4>Education & training</h4><strong>Healthcare Qualification</strong><small>Accredited University · 2021</small></section>
  </div>;
}

function TemplateCard({ template }) {
  const destination = `/build-resume/${template.layoutType}/${template.layoutId}`;
  return <article className="pro-template-card">
    <div className="template-visual">
      {template.featured ? <span className="recommended-badge">Most popular</span> : null}
      <ResumePreview template={template} />
      <Link className="template-overlay" to={destination}>Use this template <FiArrowRight /></Link>
    </div>
    <div className="template-details">
      <div className="template-title-row"><div><span className="career-label">{healthcareTracks.find(item => item.id === template.track)?.label}</span><h2>{template.name}</h2></div><span className={`ats-badge ${atsTone[template.ats]}`}><FiShield /> ATS {template.ats}</span></div>
      <p>{template.description}</p>
      <div className="template-meta"><span>{template.format}</span><span>{template.level}</span></div>
      <div className="role-tags">{template.roles.map(role => <span key={role}>{role}</span>)}</div>
      <ul className="template-strengths">{template.strengths.map(item => <li key={item}><FiCheck /> {item}</li>)}</ul>
      <Link className="use-template-button" to={destination}>Build my healthcare CV <FiArrowRight /></Link>
    </div>
  </article>;
}

export default function Templates() {
  const [track, setTrack] = useState("all");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const templates = useMemo(() => professionalTemplates.filter(template => {
    const matchesTrack = track === "all" || template.track === track;
    const searchable = `${template.name} ${template.roles.join(" ")} ${template.description}`.toLowerCase();
    return matchesTrack && (!deferredQuery || searchable.includes(deferredQuery));
  }), [track, deferredQuery]);

  return <main className="template-page">
    <section className="template-hero">
      <div><span className="template-eyebrow">HEALTHCARE CV TEMPLATES</span><h1>Present your clinical experience with clarity and confidence.</h1><p>Choose from ATS-friendly CV structures created exclusively for healthcare professionals—from newly qualified clinicians to experienced specialists and healthcare leaders.</p></div>
      <div className="ats-standard"><FiShield /><div><strong>Healthcare ATS Standard</strong><span>Clear credentials · familiar clinical sections · parsing-safe typography</span></div></div>
    </section>
    <section className="template-controls" aria-label="Healthcare template filters">
      <div className="career-tabs" role="group" aria-label="Filter by healthcare profession">{healthcareTracks.map(item => <button type="button" className={track === item.id ? "active" : ""} key={item.id} onClick={() => setTrack(item.id)}>{item.label}</button>)}</div>
      <label className="template-search"><FiSearch /><span className="sr-only">Search by healthcare role</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search nurse, doctor, pharmacist…" /></label>
    </section>
    <section className="template-results">
      <div className="result-heading"><div><span>{templates.length} HEALTHCARE OPTIONS</span><h2>{track === "all" ? "Healthcare CV templates" : `${healthcareTracks.find(item => item.id === track)?.label} templates`}</h2></div><p>Every preview shows the complete CV structure you will receive.</p></div>
      <div className="professional-template-grid">{templates.map(template => <TemplateCard template={template} key={template.id} />)}</div>
      {templates.length === 0 ? <div className="empty-templates"><h2>No exact healthcare role found</h2><p>Try a broader term or view the complete healthcare collection.</p><button type="button" onClick={() => { setTrack("all"); setQuery(""); }}>View all healthcare templates</button></div> : null}
    </section>
    <section className="career-value-grid">
      <article><FiShield /><h3>ATS-safe by design</h3><p>Standard headings, readable hierarchy and clean text order help healthcare recruitment systems parse your CV.</p></article>
      <article><FiUsers /><h3>Made for clinical roles</h3><p>Licences, credentials, clinical competencies, placements and patient-care experience appear where recruiters expect them.</p></article>
      <article><FiTarget /><h3>Global application ready</h3><p>Adapt your chosen template for hospitals, clinics and healthcare employers across international markets.</p></article>
    </section>
  </main>;
}
