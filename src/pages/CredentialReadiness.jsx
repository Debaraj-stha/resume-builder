import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiAlertTriangle, FiArrowRight, FiCheck, FiCheckCircle, FiFileText, FiGlobe, FiLock, FiShield, FiTarget } from "react-icons/fi";
import { calculateReadiness, credentialOptions, destinations, professions } from "../data/credentialReadiness";
import supabase from "../../supabaseClient";
import DownloadPaywall from "../components/DownloadPaywall";
import "../css/credential-readiness.css";

export default function CredentialReadiness() {
  const [profession, setProfession] = useState("Nurse");
  const [destination, setDestination] = useState("UAE");
  const [experienceYears, setExperienceYears] = useState(2);
  const [credentials, setCredentials] = useState([]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paywallOpen, setPaywallOpen] = useState(false);

  const country = destinations[destination];
  const selectedCount = credentials.length;
  const previewScore = useMemo(() => calculateReadiness({ profession, destination, experienceYears, credentials }).score, [profession, destination, experienceYears, credentials]);

  const toggleCredential = id => setCredentials(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  const generateReport = async () => {
    setLoading(true); setError(""); setReport(null);
    try {
      const { data: { session } = {} } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("Please sign in to generate your free readiness report.");
      const response = await fetch("/api/credential-readiness", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` }, body: JSON.stringify({ profession, destination, experienceYears, credentials }) });
      const data = await response.json();
      if (response.status === 402) { setPaywallOpen(true); return; }
      if (!response.ok) throw new Error(data.error || "The readiness service is temporarily unavailable.");
      setReport(data);
      requestAnimationFrame(() => document.getElementById("readiness-report")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } catch (reason) { setError(reason.message); }
    finally { setLoading(false); }
  };

  return <main className="credential-page">
    <section className="credential-hero">
      <div><span>GLOBAL HEALTHCARE CAREER TOOL</span><h1>Credential & Country Readiness Engine</h1><p>See what is ready, what may be missing and what to verify before applying for an international healthcare role.</p><div className="credential-trust"><span><FiShield/> Evidence-led</span><span><FiGlobe/> 9 destinations</span><span><FiCheckCircle/> One free full report</span></div></div>
      <aside><span>LIVE READINESS PREVIEW</span><strong>{previewScore}</strong><small>/100 based on your current selections</small><i><b style={{ width: `${previewScore}%` }}/></i></aside>
    </section>

    <section className="credential-builder">
      <div className="credential-form">
        <header><span>01</span><div><h2>Build your readiness profile</h2><p>No CV upload required. Select only evidence you currently have.</p></div></header>
        <div className="profile-fields"><label>Healthcare profession<select value={profession} onChange={event => setProfession(event.target.value)}>{professions.map(item => <option key={item}>{item}</option>)}</select></label><label>Destination country<select value={destination} onChange={event => setDestination(event.target.value)}>{Object.keys(destinations).map(item => <option key={item}>{item}</option>)}</select></label><label>Completed experience (years)<input type="number" min="0" max="50" value={experienceYears} onChange={event => setExperienceYears(event.target.value)}/></label></div>
        <div className="country-snapshot"><FiGlobe/><div><span>LIKELY REGULATORY ROUTE</span><strong>{country.regulator}</strong><p>{country.verification}</p></div></div>
        <fieldset><legend>Which documents or milestones do you already have?</legend><div className="credential-checklist">{credentialOptions.map(item => <label key={item.id} className={credentials.includes(item.id) ? "selected" : ""}><input type="checkbox" checked={credentials.includes(item.id)} onChange={() => toggleCredential(item.id)}/><span><FiCheck/><strong>{item.label}</strong>{item.essential ? <small>Core evidence</small> : null}</span></label>)}</div></fieldset>
        <button className="generate-readiness" onClick={generateReport} disabled={loading}><FiTarget/>{loading ? "Preparing secure report..." : "Generate my readiness report"}</button>
        <p className="use-note">{selectedCount} of {credentialOptions.length} readiness items selected. One complete report is free per account.</p>
        {error ? <div className="readiness-error"><FiLock/><div><strong>{error.includes("sign in") ? "Secure sign-in required" : error.includes("used") ? "Free report used" : "Something needs attention"}</strong><p>{error}</p><Link to={error.includes("sign in") ? "/login?redirectTo=%2Fcredential-readiness" : "/pricing"}>{error.includes("sign in") ? "Sign in to continue" : "See premium plans"} <FiArrowRight/></Link></div></div> : null}
      </div>

      <aside className="readiness-guide"><span>WHAT YOU WILL RECEIVE</span><h2>A practical country action plan</h2><div><FiTarget/><p><strong>Readiness score</strong><small>Weighted around essential evidence and experience.</small></p></div><div><FiAlertTriangle/><p><strong>Priority blockers</strong><small>See the missing items most likely to delay your application.</small></p></div><div><FiFileText/><p><strong>Document checklist</strong><small>Prepare evidence before licensing or employer review.</small></p></div><div><FiGlobe/><p><strong>Destination guidance</strong><small>CV format, regulatory route and suggested next steps.</small></p></div><p className="regulator-note"><FiShield/> Requirements change. This tool provides preparation guidance and does not replace an official regulator assessment.</p></aside>
    </section>

    {report ? <section id="readiness-report" className="readiness-report">
      <header><div><span>YOUR READINESS REPORT</span><h2>{profession} → {destination}</h2><p>{report.status}. Prioritise verified evidence before submitting applications.</p></div><div className={`report-score score-${report.score >= 80 ? "high" : report.score >= 55 ? "medium" : "low"}`}><strong>{report.score}</strong><small>/100</small></div></header>
      <ReportDetails report={report}/>
    </section> : null}
    {paywallOpen ? <DownloadPaywall feature="readiness report" title="Unlock unlimited country-readiness reports" message="Your free credential and country-readiness report has been used. Upgrade to compare more destinations and professional pathways." onClose={() => setPaywallOpen(false)} onPaid={() => setPaywallOpen(false)} /> : null}
  </main>;
}

function ReportDetails({ report }) {
  return <div className="report-grid">
    <article className="priority-card"><span>START HERE</span><h3>{report.blockers.length ? "Resolve these core blockers" : "Core evidence looks prepared"}</h3>{report.blockers.length ? <ul>{report.blockers.map(item => <li key={item}><FiAlertTriangle/>{item}</li>)}</ul> : <p><FiCheckCircle/> No essential evidence gaps were selected. Verify validity and destination-specific acceptance.</p>}</article>
    <article><span>REGULATORY ROUTE</span><h3>{report.country.regulator}</h3><p>{report.country.verification}</p><small>Language: {report.country.language}</small></article>
    <article><span>DESTINATION CV</span><h3>{report.country.cv}</h3><p>Show registration status, specialty, recent clinical scope and measurable outcomes without including patient-identifiable information.</p><Link to="/ats-checker">Prepare my healthcare CV <FiArrowRight/></Link></article>
    <article><span>ROLE PRIORITIES</span><h3>Evidence recruiters may look for</h3><ul>{report.priorities.map(item => <li key={item}><FiCheck/>{item}</li>)}</ul></article>
    <article><span>NEXT STEPS</span><h3>Your suggested sequence</h3><ol>{report.country.steps.map(item => <li key={item}>{item}</li>)}</ol></article>
    <article><span>DOCUMENT STATUS</span><h3>{report.completed.length} ready · {report.missing.length} to review</h3><ul>{report.missing.slice(0, 5).map(item => <li key={item.id}><FiAlertTriangle/>{item.label}</li>)}</ul></article>
  </div>;
}
