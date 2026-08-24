import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiAlertCircle, FiArrowRight, FiCheckCircle, FiEdit3, FiFileText, FiInfo, FiMessageCircle, FiSearch, FiThumbsUp, FiUploadCloud, FiUser, FiZap } from "react-icons/fi";
import { countryGuidance, healthcareRoles } from "../data/healthcareContent";
import { compareAtsScores, cvDraftToScoringText, scoreHealthcareCV } from "../utils/atsScoring";
import { readCVFile } from "../utils/cvFileReader";
import "../css/healthcare-tools.css";
import "../css/ats-report.css";
import "../css/download-experience.css";

const scoreLabels = { atsReadability: "ATS readability", jobMatch: "JD match", clinicalRelevance: "Clinical relevance", credentialMatch: "Licence match", achievementStrength: "Achievement strength", profileCompleteness: "Completeness" };
const emptyArray = (value) => Array.isArray(value) ? value.filter(Boolean) : [];
const normaliseDraft = (draft) => ({
  personalDetails: { name: draft.personalDetails?.name || "", email: draft.personalDetails?.email || "", phone: draft.personalDetails?.phone || "", profession: draft.personalDetails?.profession || draft.detectedRole || "Healthcare Professional", address: draft.personalDetails?.address || "", profile: [], urls: emptyArray(draft.personalDetails?.urls).length ? draft.personalDetails.urls : [{ value: "" }] },
  summary: draft.summary || "", educations: emptyArray(draft.educations), experiences: emptyArray(draft.experiences), skills: emptyArray(draft.skills), certificates: emptyArray(draft.certificates), trainings: emptyArray(draft.trainings), languages: emptyArray(draft.languages), achievements: emptyArray(draft.achievements), additionalSections: emptyArray(draft.additionalSections),
});
const scoreDraft = ({ draft, jobDescription, role, authority }) => scoreHealthcareCV({ cvText: cvDraftToScoringText(draft), jobDescription, roleConfig: healthcareRoles[role], licenceAuthority: authority });
const refinementMessage = (current, revised) => `${revised.checks.filter((check) => check.points < check.max).map((check) => `${check.label}: ${check.correction}`).join("\n")}\nThe source CV scored ${current.score}; preserve all supported source evidence and do not weaken its ATS performance.`;

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
  const [decisions, setDecisions] = useState({});
  const [coachTopic, setCoachTopic] = useState("welcome");
  const authority = countryGuidance[country]?.authorities?.[0] || "";
  const report = useMemo(() => scoreHealthcareCV({ cvText, jobDescription, roleConfig: healthcareRoles[role], licenceAuthority: authority }), [cvText, jobDescription, role, authority]);
  const improvedReport = useMemo(() => result?.improved ? scoreHealthcareCV({ cvText: cvDraftToScoringText(result.improved), jobDescription, roleConfig: healthcareRoles[role], licenceAuthority: authority }) : null, [result, jobDescription, role, authority]);
  const measuredImprovedScore = result?.evaluatedScore ?? improvedReport?.score ?? report.score;
  const potentialScore = Math.max(report.score, measuredImprovedScore);
  const scoreComparison = compareAtsScores(report.score, potentialScore);

  const chooseFile = async (file) => {
    if (!file) return;
    setError(""); setStage("reading"); setResult(null); setConfirmed(false); setDecisions({}); setCoachTopic("welcome"); sessionStorage.removeItem("resuai_improved_cv"); sessionStorage.removeItem("resuai_ai_completed");
    try { const text = await readCVFile(file); setCvText(text); setFileName(file.name); setStage("ready"); }
    catch (problem) { setError(problem.message); setStage("upload"); }
  };

  const improveCV = async () => {
    setError(""); setStage("improving");
    try {
      const requestImprovement = async (refinementFeedback = "") => {
        const response = await fetch("/api/improve-cv", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ cvText, jobDescription, targetCountry: country, refinementFeedback }) });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not improve this CV.");
        return data;
      };
      let data = await requestImprovement();
      let revised = scoreDraft({ draft: data.improved, jobDescription, role, authority });
      if (revised.score < report.score) {
        try {
          const refined = await requestImprovement(refinementMessage(report, revised));
          const refinedScore = scoreDraft({ draft: refined.improved, jobDescription, role, authority });
          if (refinedScore.score >= revised.score) { data = { ...refined, refinementApplied: true }; revised = refinedScore; }
        } catch {
          data = { ...data, refinementUnavailable: true };
        }
      }
      setResult({ ...data, evaluatedScore: revised.score }); setStage("review");
    } catch (problem) { setError(problem.message); setStage("ready"); }
  };

  const updateSummary = (value) => setResult((current) => ({ ...current, improved: { ...current.improved, summary: value } }));
  const updateBullet = (experienceIndex, bulletIndex, value) => setResult((current) => { const improved = structuredClone(current.improved); improved.experiences[experienceIndex].achievements[bulletIndex].value = value; return { ...current, improved }; });
  const reviewItems = 1 + emptyArray(result?.improved?.experiences).length;
  const reviewedItems = Object.keys(decisions).length;
  const markDecision = (key, decision) => setDecisions((current) => ({ ...current, [key]: decision }));
  const buildInTemplate = () => { sessionStorage.setItem("resuai_improved_cv", JSON.stringify(normaliseDraft(result.improved))); sessionStorage.setItem("resuai_ai_completed", "true"); navigate("/templates"); };

  return <main className="tool-page ats-ai-page">
    <section className="tool-hero"><span>YOUR GUIDED AI CV CONSULTANT</span><h1>Improve your healthcare CV with guidance at every step.</h1><p>Upload your CV and your AI coach will explain what needs attention, suggest evidence-based improvements and walk you section by section to a verified final draft.</p></section>

    <section className="ai-import-workflow">
      <div className="workflow-steps"><span className={stage !== "upload" ? "done" : "active"}><b>1</b> Share your CV</span><i/><span className={["improving","review"].includes(stage) ? "done" : stage === "ready" ? "active" : ""}><b>2</b> Understand gaps</span><i/><span className={stage === "review" ? "active" : ""}><b>3</b> Review with coach</span></div>
      {!result ? <div className="ai-import-grid">
        <article className={`cv-dropzone ${fileName ? "has-file" : ""}`} onClick={() => fileRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); chooseFile(event.dataTransfer.files[0]); }}>
          <input ref={fileRef} type="file" hidden accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(event) => chooseFile(event.target.files[0])}/>
          {fileName ? <><FiFileText/><strong>{fileName}</strong><p>{cvText.split(/\s+/).length} words extracted successfully</p><button type="button">Choose another CV</button></> : <><FiUploadCloud/><strong>Drop your existing CV here</strong><p>PDF or DOCX · Maximum 8 MB · No manual data-entry form</p><button type="button">Choose PDF or Word CV</button></>}
        </article>
        <div className="ai-import-options"><div className="coach-welcome"><span><FiUser/></span><div><strong>Hi, I’m your ResuAI CV Coach.</strong><p>{fileName ? `I’ve read ${fileName}. Tell me the role and country below, and I’ll explain exactly what I would improve.` : "Start by sharing your current CV. I’ll guide you through the improvements instead of leaving you with a score alone."}</p></div></div>
          <label>Target country<select value={country} onChange={(event) => setCountry(event.target.value)}>{Object.keys(countryGuidance).map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Target healthcare role<select value={role} onChange={(event) => setRole(event.target.value)}>{Object.keys(healthcareRoles).map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Target job description <small>Optional but recommended</small><textarea value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} placeholder="Paste the vacancy so AI can align relevant, verified keywords..."/></label>
          <button className="generate-improved-cv" type="button" disabled={!cvText || stage === "reading" || stage === "improving"} title={!cvText ? "Upload a readable PDF or Word CV first." : stage === "reading" ? "Your CV is still being read." : "Start guided review"} onClick={improveCV}><FiZap/>{stage === "reading" ? "I’m reading your CV..." : stage === "improving" ? "I’m preparing your guided review..." : !cvText ? "Upload CV to unlock guided review" : "Start my guided CV review"}</button>
          {!cvText ? <p className="control-reason"><FiFileText/>Upload a readable PDF or Word CV to enable the guided review.</p> : null}
          <p className="privacy-inline"><FiInfo/>Do not upload patient records, passport numbers or other sensitive identifiers.</p>
        </div>
      </div> : <section className="ai-cv-review">
        <header><div><span>AI IMPROVEMENT PLAN</span><h2>{result.improved.targetHeadline || result.improved.detectedRole || "Healthcare CV"}</h2><p>Generated with {result.provider}{result.refinementApplied ? " · ATS refinement pass applied" : ""}. Review every suggestion before applying it.</p></div><div className={`score-celebration ${scoreComparison.direction}`}><small>{scoreComparison.direction === "improved" ? "Measured ATS improvement" : "ATS baseline protected"}</small><strong>{report.score} → {potentialScore}</strong><span>{scoreComparison.delta > 0 ? "+" : ""}{scoreComparison.delta} points</span></div></header>
        {result.fallbackUsed ? <p className="score-refinement-note"><FiInfo/>The AI provider is busy, so ResuAI used its source-preserving parser. Your uploaded information remains available and you can continue; verify the organised draft before download.</p> : null}
        {result.refinementUnavailable ? <p className="score-refinement-note"><FiInfo/>Your first AI-enhanced draft is ready. The optional extra optimisation pass was unavailable, so your original score baseline remains protected.</p> : null}
        {measuredImprovedScore < report.score ? <p className="score-regression-note"><FiAlertCircle/>Your original {report.score}-point baseline is protected. The AI could not verify enough information to claim a higher score yet. Use the checklist below to add missing, truthful evidence.</p> : null}
        <div className="guided-progress"><div><span>GUIDED REVIEW PROGRESS</span><strong>{reviewedItems} of {reviewItems} sections reviewed</strong></div><i><b style={{ width: `${Math.round((reviewedItems / reviewItems) * 100)}%` }}/></i></div>
        <AICoach coach={result.improved.coach} topic={coachTopic} setTopic={setCoachTopic} missing={result.improved.missingInformation} score={report.score} potentialScore={potentialScore}/>
        <div className="review-columns"><div className="improved-content"><ReviewCard title="Professional summary" reason={result.improved.coach?.summaryReason} decision={decisions.summary} onDecision={(value) => markDecision("summary", value)}><textarea aria-label="Professional summary" value={result.improved.summary || ""} onChange={(event) => updateSummary(event.target.value)}/></ReviewCard>{emptyArray(result.improved.experiences).map((experience, experienceIndex) => <ReviewCard key={`${experience.company_name}-${experienceIndex}`} title={experience.position || `Experience ${experienceIndex + 1}`} subtitle={`${experience.company_name || "Employer"} · ${experience.start_date || ""}–${experience.end_date || ""}`} reason={result.improved.coach?.experienceReason} decision={decisions[`experience-${experienceIndex}`]} onDecision={(value) => markDecision(`experience-${experienceIndex}`, value)}>{emptyArray(experience.achievements).map((bullet, bulletIndex) => <textarea aria-label={`Experience bullet ${bulletIndex + 1}`} key={bulletIndex} value={bullet.value || ""} onChange={(event) => updateBullet(experienceIndex, bulletIndex, event.target.value)}/>)}</ReviewCard>)}</div>
        <aside><h3>Your coach’s checklist</h3><ul>{emptyArray(result.improved.improvements).map((item) => <li key={item}><FiCheckCircle/>{item}</li>)}</ul><h3>Please clarify or verify</h3><ul>{emptyArray(result.improved.missingInformation).map((item) => <li key={item}><FiAlertCircle/>{item}</li>)}</ul><label className="verification-confirm"><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)}/><span>I have checked the names, dates, qualifications, licences and clinical claims.</span></label><button type="button" disabled={!confirmed || reviewedItems < reviewItems} onClick={buildInTemplate}>Choose template & build CV <FiArrowRight/></button>{reviewedItems < reviewItems ? <small className="review-reminder">Review each section above before continuing.</small> : null}<button className="start-over" type="button" onClick={() => { setResult(null); setStage("ready"); setConfirmed(false); setDecisions({}); }}>Start again</button></aside></div>
      </section>}
      {error ? <p className="ai-import-error"><FiAlertCircle/>{error}</p> : null}
    </section>

    {cvText && !result ? <section className="ats-grid compact-report"><article className="ats-report"><div className={`ats-score ${report.score >= 70 ? "good" : ""}`}><strong>{report.score}</strong><span>/100<br/>current CV</span></div><div className="score-breakdown">{Object.entries(report.scores).map(([key, value]) => <div key={key}><span>{scoreLabels[key]}</span><strong>{value === null ? "Add JD" : `${value}%`}</strong><i><b style={{ width: `${value || 0}%` }}/></i></div>)}</div><h2><FiSearch/> Current CV findings</h2><div className="check-results">{report.checks.slice(0, 4).map((check) => <details key={check.id}><summary>{check.points === check.max ? <FiCheckCircle/> : <FiAlertCircle/>}<span><strong>{check.label}</strong><small>{check.points}/{check.max} points</small></span></summary><div><p><b>Recommended:</b> {check.correction}</p></div></details>)}</div></article></section> : null}
    <p className="disclaimer">AI improves presentation, not facts. It must never be used to claim unverified clinical competence, registration or achievements.</p>
  </main>;
}

function AICoach({ coach = {}, topic, setTopic, missing, score, potentialScore }) {
  const responses = {
    welcome: coach.welcome || "I have prepared a guided review of your CV.",
    score: coach.scoreExplanation || `Your current ATS score is ${score}. The suggested draft could reach ${potentialScore} after you verify the content.`,
    verify: emptyArray(missing).length ? `Before finalising, please clarify: ${emptyArray(missing).slice(0, 3).join("; ")}.` : "I did not find an obvious missing item, but please still verify every date, qualification and clinical claim.",
    next: coach.nextStep || "Review each section, choose Accept or Needs editing, and confirm the facts before selecting a template.",
  };
  return <section className="ai-coach-panel"><div className="coach-avatar"><FiMessageCircle/><span>ONLINE</span></div><div className="coach-conversation"><strong>ResuAI CV Coach</strong><p>{responses[topic]}</p><div><button className={topic === "score" ? "active" : ""} onClick={() => setTopic("score")}>Explain my score</button><button className={topic === "verify" ? "active" : ""} onClick={() => setTopic("verify")}>What should I verify?</button><button className={topic === "next" ? "active" : ""} onClick={() => setTopic("next")}>Guide my next step</button></div></div></section>;
}

function ReviewCard({ title, subtitle, reason, decision, onDecision, children }) {
  return <article className={`guided-review-card ${decision || ""}`}><header><div><span>COACH SUGGESTION</span><h3>{title}</h3>{subtitle ? <p>{subtitle}</p> : null}</div>{decision ? <b><FiCheckCircle/>{decision === "accepted" ? "Accepted" : "Editing"}</b> : null}</header><div className="coach-reason"><FiMessageCircle/><p><strong>Why I’m suggesting this</strong>{reason || "This version is clearer for recruiters and ATS systems while staying grounded in your CV."}</p></div>{children}<footer><button className={decision === "accepted" ? "selected" : ""} onClick={() => onDecision("accepted")}><FiThumbsUp/> Accept suggestion</button><button className={decision === "editing" ? "selected" : ""} onClick={() => onDecision("editing")}><FiEdit3/> Needs editing</button></footer></article>;
}
