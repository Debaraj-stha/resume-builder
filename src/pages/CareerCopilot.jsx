import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheckCircle, FiFileText, FiSearch, FiTarget, FiZap, FiAlertTriangle, FiCopy, FiLock } from "react-icons/fi";
import { readCVFile } from "../utils/cvFileReader";
import supabase from "../../supabaseClient";
import DownloadPaywall from "../components/DownloadPaywall";
import "../css/career-copilot.css";

const tools = [
  { id: "match", icon: <FiTarget/>, title: "AI Job Match", text: "See exactly how your CV compares with a vacancy." },
  { id: "optimize", icon: <FiZap/>, title: "Optimize My CV", text: "Find weak wording and improve it without inventing facts." },
  { id: "cover", icon: <FiFileText/>, title: "AI Cover Letter", text: "Create a job-specific healthcare cover letter." },
];

const list = (value) => Array.isArray(value) ? value.filter(Boolean) : [];

export default function CareerCopilot() {
  const [tool, setTool] = useState("match");
  const [cvText, setCvText] = useState(() => sessionStorage.getItem("resuai_cv_text") || "");
  const [fileName, setFileName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [role, setRole] = useState("Healthcare Professional");
  const [country, setCountry] = useState("UAE");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [style, setStyle] = useState("Professional");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paywallOpen, setPaywallOpen] = useState(false);

  const cvReady = cvText.trim().length >= 120;
  const score = useMemo(() => Number(result?.overallScore || 0), [result]);
  const runReason = loading ? "Your request is being analysed." : !cvReady ? "Upload a readable PDF or Word CV first." : tool !== "optimize" && jobDescription.trim().length < 80 ? "Paste at least 80 characters from the target job description." : "";

  const uploadCV = async (file) => {
    if (!file) return;
    setError("");
    try {
      const text = await readCVFile(file);
      setCvText(text);
      setFileName(file.name);
      sessionStorage.setItem("resuai_cv_text", text);
    } catch (e) { setError(e.message); }
  };

  const run = async () => {
    setError(""); setLoading(true); setResult(null);
    try {
      const { data: { session } = {} } = await supabase.auth.getSession();
      if (!session?.access_token) {
        setError("Your session has expired. Please sign in again to use Career Copilot.");
        return;
      }
      const endpoint = tool === "match" ? "/api/job-match" : tool === "optimize" ? "/api/optimize-cv" : "/api/cover-letter-ai";
      const body = tool === "match" ? { cvText, jobDescription, targetRole: role, targetCountry: country } : tool === "optimize" ? { cvText, targetRole: role, targetCountry: country } : { cvText, jobDescription, companyName: company, jobTitle, targetRole: role, targetCountry: country, style };
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` }, body: JSON.stringify(body) });
      const data = await response.json();
      if (response.status === 402) { setPaywallOpen(true); return; }
      if (!response.ok) throw new Error(data.error || "The AI service is temporarily unavailable.");
      setResult(data);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const copyLetter = async () => {
    const text = [result?.subject && `Subject: ${result.subject}`, result?.opening, result?.body, result?.closing].filter(Boolean).join("\n\n");
    await navigator.clipboard.writeText(text);
  };

  return <main className="copilot-page">
    <section className="copilot-hero"><div><span>RESUAI CAREER COPILOT</span><h1>Your healthcare job search, powered by AI.</h1><p>Match vacancies, strengthen your CV and create targeted cover letters—all grounded in what you have actually done.</p></div><div className="copilot-badge"><FiCheckCircle/><strong>Fact-first AI</strong><small>No invented credentials or achievements.</small></div></section>
    <section className="copilot-shell">
      <nav className="copilot-tabs">{tools.map(({ id, icon, title, text }) => <button key={id} className={tool === id ? "active" : ""} onClick={() => { setTool(id); setResult(null); setError(""); }}>{icon}<span><strong>{title}</strong><small>{text}</small></span></button>)}</nav>
      <div className="copilot-grid">
        <aside className="copilot-input">
          <div className="panel-title"><span>01</span><div><strong>Your evidence</strong><small>Start with your existing CV</small></div></div>
          <label className="cv-upload"><input type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={e => uploadCV(e.target.files[0])}/><FiFileText/><strong>{fileName || (cvReady ? "CV loaded from this session" : "Upload PDF or Word CV")}</strong><small>{cvReady ? `${cvText.trim().split(/\s+/).length} words ready` : "Your facts stay the source of truth"}</small></label>
          <label>Target role<select value={role} onChange={e => setRole(e.target.value)}><option>Healthcare Professional</option><option>Nurse</option><option>Doctor</option><option>Pharmacist</option><option>Pharmacy Technician</option><option>Physiotherapist</option><option>Medical Laboratory Professional</option><option>Radiographer</option></select></label>
          <label>Target country<select value={country} onChange={e => setCountry(e.target.value)}><option>UAE</option><option>Saudi Arabia</option><option>Qatar</option><option>Oman</option><option>Bahrain</option><option>Kuwait</option><option>India</option><option>Global</option></select></label>
          {tool !== "optimize" && <label>Job description<textarea value={jobDescription} onChange={e => setJobDescription(e.target.value)} placeholder="Paste the vacancy here..."/></label>}
          {tool === "cover" && <><label>Company name<input value={company} onChange={e => setCompany(e.target.value)} placeholder="Hospital or employer"/></label><label>Job title<input value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="e.g. Staff Nurse"/></label><label>Style<select value={style} onChange={e => setStyle(e.target.value)}><option>Professional</option><option>Concise</option><option>Executive</option></select></label></>}
          <button className="copilot-run" disabled={Boolean(runReason)} title={runReason || "Run Career Copilot"} onClick={run}><FiZap/>{loading ? "AI is analysing..." : !cvReady ? "Upload CV to continue" : tool !== "optimize" && jobDescription.trim().length < 80 ? "Add job description to continue" : tool === "match" ? "Check job match" : tool === "optimize" ? "Find CV improvements" : "Generate cover letter"}</button>
          {runReason && !loading ? <p className="control-reason"><FiAlertTriangle/>{runReason}</p> : null}
          {error && <div className="copilot-auth-message"><FiLock/><div><strong>{error.includes("sign in") || error.includes("session") ? "Secure sign-in required" : error.includes("Upgrade") ? "Free result used" : "Something needs attention"}</strong><p>{error}</p>{(error.includes("sign in") || error.includes("session")) ? <Link to={`/login?redirectTo=${encodeURIComponent("/career-copilot")}`}>Sign in securely <FiArrowRight/></Link> : error.includes("Upgrade") ? <Link to="/pricing">See Pro plans <FiArrowRight/></Link> : null}</div></div>}
        </aside>
        <section className="copilot-result">
          {!result ? <div className="empty-copilot"><div><FiSearch/><h2>{tool === "match" ? "Know your chances before you apply" : tool === "optimize" ? "See the problems before changing your CV" : "Turn your CV into a targeted application"}</h2><p>{tool === "match" ? "Upload your CV and paste a vacancy to reveal match strength, missing keywords and ATS risks." : tool === "optimize" ? "We will flag generic language, weak bullets, redundancy and ATS issues before suggesting grounded improvements." : "Generate a personalized letter using your CV and the exact vacancy—without making up experience."}</p><div className="copilot-trust"><FiCheckCircle/> Your CV facts are sent securely for analysis only.</div></div></div> : tool === "match" ? <MatchResult result={result} score={score}/> : tool === "optimize" ? <OptimizeResult result={result}/> : <CoverResult result={result} copyLetter={copyLetter}/>} 
        </section>
      </div>
    </section>
    <p className="copilot-disclaimer">AI suggestions are career-writing assistance, not licensing or employment guarantees. Always verify facts before applying.</p>
    {paywallOpen ? <DownloadPaywall feature="AI result" title="Continue with unlimited Career Copilot" message="Your free result for this Career Copilot tool has been used. Upgrade to keep matching jobs, optimizing CVs and creating tailored cover letters." onClose={() => setPaywallOpen(false)} onPaid={() => setPaywallOpen(false)} /> : null}
  </main>;
}

function MatchResult({ result, score }) { return <div className="result-content"><header className="result-header"><div><span>AI JOB MATCH</span><h2>{score}% match</h2><p>Evidence-based comparison of your CV and this vacancy.</p></div><div className={`match-score score-${score >= 80 ? "high" : score >= 60 ? "mid" : "low"}`}><strong>{score}</strong><small>/100</small></div></header><div className="match-breakdown">{Object.entries(result.breakdown || {}).map(([key, value]) => <div key={key}><span>{key.replace(/([A-Z])/g, " $1")}</span><strong>{value}%</strong><i><b style={{width:`${value}%`}}/></i></div>)}</div><ResultList title="Why you're a good match" icon={<FiCheckCircle/>} items={result.goodMatchReasons}/><ResultList title="Missing keywords" icon={<FiAlertTriangle/>} items={result.missingKeywords}/><ResultList title="Potential gaps & ATS risks" icon={<FiAlertTriangle/>} items={[...list(result.potentialGaps), ...list(result.atsRisks)]}/><ResultList title="Recommended improvements" icon={<FiZap/>} items={result.recommendedImprovements}/><Link className="result-cta" to="/ats-checker">Tailor My CV For This Job <FiArrowRight/></Link></div> }
function OptimizeResult({ result }) { return <div className="result-content"><header className="result-header"><div><span>AI CV OPTIMIZER</span><h2>Here is what to fix first</h2><p>{result.summary}</p></div></header><div className="problem-list">{list(result.problems).map((item, index) => <article key={index}><div><b>{item.severity || "Review"}</b><h3>{item.original || "CV content"}</h3><p>{item.why}</p></div><div><strong>Suggestion</strong><p>{item.suggestion}</p></div></article>)}</div><h3>Priority actions</h3><ul className="plain-list">{list(result.priorityActions).map(x => <li key={x}>{x}</li>)}</ul></div> }
function CoverResult({ result, copyLetter }) { return <div className="result-content cover-result"><header className="result-header"><div><span>AI COVER LETTER</span><h2>{result.subject || "Your personalized cover letter"}</h2><p>Grounded in your CV and the vacancy you supplied.</p></div><button onClick={copyLetter}><FiCopy/> Copy to clipboard</button></header><article><p>{result.opening}</p><p>{result.body}</p><p>{result.closing}</p></article><small>Review names, job title and facts before sending.</small></div> }
function ResultList({ title, icon, items }) { const values = list(items); if (!values.length) return null; return <section className="result-list"><h3>{icon}{title}</h3><ul>{values.map((x, i) => <li key={`${x}-${i}`}>{x}</li>)}</ul></section> }
