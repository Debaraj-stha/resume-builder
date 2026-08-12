import { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiAlertCircle, FiArrowRight, FiCheckCircle, FiFileText, FiInfo, FiSearch, FiUploadCloud, FiZap } from "react-icons/fi";
import { countryGuidance, healthcareRoles } from "../data/healthcareContent";
import { scoreHealthcareCV } from "../utils/atsScoring";
import { readCVFile } from "../utils/cvFileReader";
import "../css/healthcare-tools.css";
import "../css/ats-report.css";

const scoreLabels = { atsReadability: "ATS readability", jobMatch: "JD match", clinicalRelevance: "Clinical relevance", credentialMatch: "Licence match", achievementStrength: "Achievement strength", profileCompleteness: "Completeness" };
const emptyArray = (value) => Array.isArray(value) ? value.filter(Boolean) : [];
const normaliseDraft = (draft) => ({
  personalDetails: { name: draft.personalDetails?.name || "", email: draft.personalDetails?.email || "", phone: draft.personalDetails?.phone || "", profession: draft.personalDetails?.profession || draft.detectedRole || "Healthcare Professional", address: draft.personalDetails?.address || "", profile: [], urls: emptyArray(draft.personalDetails?.urls).length ? draft.personalDetails.urls : [{ value: "" }] },
  summary: draft.summary || "", educations: emptyArray(draft.educations), experiences: emptyArray(draft.experiences), skills: emptyArray(draft.skills), certificates: emptyArray(draft.certificates), trainings: emptyArray(draft.trainings), languages: emptyArray(draft.languages), achievements: emptyArray(draft.achievements),
});

export default function ATSChecker() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [role, setRole] = useState(Object.keys(healthcareRoles)[0]);
  const [country, setCountry] = useState("UAE");
  const [cvText, setCvText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [stage, setStage] = useState("upload");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const authority = countryGuidance[country]?.authorities?.[0] || "";
  const report = useMemo(() => scoreHealthcareCV({ cvText, jobDescription, roleConfig: healthcareRoles[role], licenceAuthority: authority }), [cvText, jobDescription, role, authority]);

  const chooseFile = async (file) => {
    if (!file) return;
    setError(""); setStage("reading"); setResult(null); setConfirmed(false);
    try { const text = await readCVFile(file); setCvText(text); setFileName(file.name); setStage("ready"); }
    catch (problem) { setError(problem.message); setStage("upload"); }
  };

  const improveCV = async () => {
    setError(""); setStage("improving");
    try {
      const response = await fetch("/api/improve-cv", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ cvText, jobDescription, targetCountry: country }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not improve this CV.");
      setResult(data); setStage("review");
    } catch (problem) { setError(problem.message); setStage("ready"); }
  };

  const updateSummary = (value) => setResult((current) => ({ ...current, improved: { ...current.improved, summary: value } }));
  const updateBullet = (experienceIndex, bulletIndex, value) => setResult((current) => { const improved = structuredClone(current.improved); improved.experiences[experienceIndex].achievements[bulletIndex].value = value; return { ...current, improved }; });
  const buildInTemplate = () => { sessionStorage.setItem("resuai_improved_cv", JSON.stringify(normaliseDraft(result.improved))); sessionStorage.setItem("resuai_ai_completed", "true"); navigate("/templates"); };

  return <main className="tool-page ats-ai-page">
    <section className="tool-hero"><span>AI HEALTHCARE CV OPTIMISER</span><h1>Upload your CV. Let AI build the improved version.</h1><p>No long form to complete. We read your existing PDF or DOCX, preserve your verified facts and create an editable, ATS-friendly healthcare CV.</p></section>

    <section className="ai-import-workflow">
      <div className="workflow-steps"><span className={stage !== "upload" ? "done" : "active"}><b>1</b> Upload CV</span><i/><span className={["improving","review"].includes(stage) ? "done" : stage === "ready" ? "active" : ""}><b>2</b> AI improves</span><i/><span className={stage === "review" ? "active" : ""}><b>3</b> Verify & build</span></div>
      {!result ? <div className="ai-import-grid">
        <article className={`cv-dropzone ${fileName ? "has-file" : ""}`} onClick={() => fileRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); chooseFile(event.dataTransfer.files[0]); }}>
          <input ref={fileRef} type="file" hidden accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" onChange={(event) => chooseFile(event.target.files[0])}/>
          {fileName ? <><FiFileText/><strong>{fileName}</strong><p>{cvText.split(/\s+/).length} words extracted successfully</p><button type="button">Choose another CV</button></> : <><FiUploadCloud/><strong>Drop your existing CV here</strong><p>PDF, DOCX or TXT · Maximum 8 MB · Files are read for this improvement request</p><button type="button">Choose CV</button></>}
        </article>
        <div className="ai-import-options">
          <label>Target country<select value={country} onChange={(event) => setCountry(event.target.value)}>{Object.keys(countryGuidance).map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Target healthcare role<select value={role} onChange={(event) => setRole(event.target.value)}>{Object.keys(healthcareRoles).map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Target job description <small>Optional but recommended</small><textarea value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} placeholder="Paste the vacancy so AI can align relevant, verified keywords..."/></label>
          <button className="generate-improved-cv" type="button" disabled={!cvText || stage === "reading" || stage === "improving"} onClick={improveCV}><FiZap/>{stage === "reading" ? "Reading your CV..." : stage === "improving" ? "Building improved CV..." : "Generate my improved CV"}</button>
          <p className="privacy-inline"><FiInfo/>Do not upload patient records, passport numbers or other sensitive identifiers.</p>
        </div>
      </div> : <section className="ai-cv-review">
        <header><div><span>AI IMPROVED DRAFT</span><h2>{result.improved.targetHeadline || result.improved.detectedRole || "Healthcare CV"}</h2><p>Generated with {result.provider}. Review the editable content before choosing a template.</p></div><strong>{report.score}/100 original ATS score</strong></header>
        <div className="review-columns"><div className="improved-content"><label>Professional summary<textarea value={result.improved.summary || ""} onChange={(event) => updateSummary(event.target.value)}/></label>{emptyArray(result.improved.experiences).map((experience, experienceIndex) => <article key={`${experience.company_name}-${experienceIndex}`}><h3>{experience.position}</h3><p>{experience.company_name} · {experience.start_date}–{experience.end_date}</p>{emptyArray(experience.achievements).map((bullet, bulletIndex) => <textarea aria-label={`Experience bullet ${bulletIndex + 1}`} key={bulletIndex} value={bullet.value || ""} onChange={(event) => updateBullet(experienceIndex, bulletIndex, event.target.value)}/>)}</article>)}</div>
        <aside><h3>What AI improved</h3><ul>{emptyArray(result.improved.improvements).map((item) => <li key={item}><FiCheckCircle/>{item}</li>)}</ul><h3>Information still needed</h3><ul>{emptyArray(result.improved.missingInformation).map((item) => <li key={item}><FiAlertCircle/>{item}</li>)}</ul><label className="verification-confirm"><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)}/><span>I have checked the names, dates, qualifications, licences and clinical claims.</span></label><button type="button" disabled={!confirmed} onClick={buildInTemplate}>Choose template & build CV <FiArrowRight/></button><button className="start-over" type="button" onClick={() => { setResult(null); setStage("ready"); setConfirmed(false); }}>Start again</button></aside></div>
      </section>}
      {error ? <p className="ai-import-error"><FiAlertCircle/>{error}</p> : null}
    </section>

    {cvText && !result ? <section className="ats-grid compact-report"><article className="ats-report"><div className={`ats-score ${report.score >= 70 ? "good" : ""}`}><strong>{report.score}</strong><span>/100<br/>current CV</span></div><div className="score-breakdown">{Object.entries(report.scores).map(([key, value]) => <div key={key}><span>{scoreLabels[key]}</span><strong>{value === null ? "Add JD" : `${value}%`}</strong><i><b style={{ width: `${value || 0}%` }}/></i></div>)}</div><h2><FiSearch/> Current CV findings</h2><div className="check-results">{report.checks.slice(0, 4).map((check) => <details key={check.id}><summary>{check.points === check.max ? <FiCheckCircle/> : <FiAlertCircle/>}<span><strong>{check.label}</strong><small>{check.points}/{check.max} points</small></span></summary><div><p><b>Recommended:</b> {check.correction}</p></div></details>)}</div></article></section> : null}
    <p className="disclaimer">AI improves presentation, not facts. It must never be used to claim unverified clinical competence, registration or achievements.</p>
  </main>;
}
