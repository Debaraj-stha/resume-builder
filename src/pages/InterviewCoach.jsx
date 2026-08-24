import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiChevronRight, FiFileText, FiMic, FiPlay, FiRefreshCw, FiTarget, FiTrendingUp, FiXCircle, FiZap } from "react-icons/fi";
import supabase from "../../supabaseClient";
import { readCVFile } from "../utils/cvFileReader";
import DownloadPaywall from "../components/DownloadPaywall";
import "../css/interview-coach.css";

const MODES = [
  ["Quick Practice", 5, "A fast warm-up before an interview."],
  ["Standard Interview", 10, "Balanced HR, behavioral and role questions."],
  ["Full Mock Interview", 15, "A deeper realistic interview simulation."],
  ["Job-Specific Interview", 5, "Built around the vacancy you provide."],
  ["Healthcare Clinical Interview", 5, "Profession-specific healthcare scenarios."],
  ["HR Interview", 5, "Behavioral and workplace questions."],
  ["GCC Interview", 5, "Healthcare interview preparation for GCC roles."],
];
const PROFESSIONS = ["Nurse", "Doctor", "Pharmacist", "Pharmacy Technician", "Physiotherapist", "Medical Laboratory Professional", "Radiographer", "Healthcare Administrator", "Other Healthcare Professional"];
const COUNTRIES = ["UAE", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Kuwait", "India", "Global"];

export default function InterviewCoach() {
  const [screen, setScreen] = useState("setup");
  const [mode, setMode] = useState("Quick Practice");
  const [personality, setPersonality] = useState("Professional");
  const [profession, setProfession] = useState("Nurse");
  const [specialty, setSpecialty] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [targetCountry, setTargetCountry] = useState("UAE");
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [cvText, setCvText] = useState(() => sessionStorage.getItem("resuai_cv_text") || "");
  const [fileName, setFileName] = useState("");
  const [interviewId, setInterviewId] = useState("");
  const [statelessSession, setStatelessSession] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [answered, setAnswered] = useState(0);
  const [questionCount, setQuestionCount] = useState(5);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [report, setReport] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paywallOpen, setPaywallOpen] = useState(false);

  const selectedMode = useMemo(() => MODES.find(([name]) => name === mode), [mode]);
  const cvReady = cvText.trim().length >= 120;

  async function api(payload) {
    const { data } = await supabase.auth.getSession();
    const token = data?.session?.access_token;
    if (!token) throw new Error("Your session has expired. Please sign in again.");
    const response = await fetch("/api/interview-coach", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => ({}));
    if (response.status === 402) {
      const paywallError = new Error(result.error || "Your free interview has been used.");
      paywallError.upgradeRequired = true;
      throw paywallError;
    }
    if (!response.ok) throw new Error(result.error || "Interview service is temporarily unavailable.");
    return result;
  }

  async function upload(file) {
    if (!file) return;
    setError("");
    try {
      const text = await readCVFile(file);
      setCvText(text);
      setFileName(file.name);
      sessionStorage.setItem("resuai_cv_text", text);
    } catch (err) {
      setError(err?.message || "Could not read this CV file.");
    }
  }

  async function startInterview() {
    setLoading(true);
    setError("");
    try {
      const count = selectedMode?.[1] || 5;
      const session = { mode, personality, profession, specialty, experienceLevel, targetCountry, targetRole: targetRole || profession, jobTitle: targetRole || profession, jobDescription, cvText, questionCount: count };
      const result = await api({ action: "start", ...session });
      setInterviewId(result.interviewId);
      setStatelessSession(result.stateless ? session : null);
      setQuestion(result.question);
      setQuestionCount(result.questionCount || count);
      setAnswered(0);
      setAnswerHistory([]);
      setAnswer("");
      setEvaluation(null);
      setReport(null);
      setScreen("interview");
    } catch (err) {
      if (err?.upgradeRequired) setPaywallOpen(true);
      setError(err?.message || "Could not start the AI interview.");
    } finally {
      setLoading(false);
    }
  }

  async function submitAnswer() {
    if (!answer.trim() || !question) return;
    setLoading(true);
    setError("");
    try {
      const result = await api({ action: "answer", interviewId, questionId: question.id, question: question.question, category: question.category, answer, answered, questionCount, session: statelessSession, previousAnswers: answerHistory });
      const nextHistory = result.history || [...answerHistory, { question: question.question, answer, score: result.answer?.score, feedback: result.answer?.feedback }];
      setEvaluation(result.answer?.feedback || null);
      setAnswered(result.answered ?? answered + 1);
      setAnswerHistory(nextHistory);
      setAnswer("");
      if (result.complete) await completeInterview(nextHistory);
      else setQuestion(result.nextQuestion);
    } catch (err) {
      setError(err?.message || "Could not evaluate your answer.");
    } finally {
      setLoading(false);
    }
  }

  async function completeInterview(answers = answerHistory) {
    setLoading(true);
    setError("");
    try {
      const result = await api({ action: "complete", interviewId, session: statelessSession, answers });
      setReport(result.report);
      setScreen("report");
    } catch (err) {
      setError(err?.message || "Could not create the interview report.");
    } finally {
      setLoading(false);
    }
  }

  async function loadHistory() {
    setLoading(true);
    setError("");
    try {
      const result = await api({ action: "history" });
      setHistory(result.interviews || []);
      setScreen("history");
    } catch (err) {
      setError(err?.message || "Could not load interview history.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="interview-page">
      <header className="interview-top">
        <Link to="/dashboard"><FiArrowLeft /> Dashboard</Link>
        <div><span>RESUAI HEALTHCARE AI</span><strong>Interview Coach</strong></div>
        <button className="history-button" onClick={loadHistory} disabled={loading} title={loading ? "Wait for the current interview action to finish." : "View previous interviews"}><FiRefreshCw /> {loading ? "Please wait..." : "My Interviews"}</button>
      </header>
      {error && <div className="interview-error"><FiXCircle /><span>{error}</span>{error.toLowerCase().includes("sign in") && <Link to="/login?redirectTo=%2Finterview-coach">Sign in</Link>}</div>}
      {screen === "setup" && <Setup {...{ mode, setMode, personality, setPersonality, profession, setProfession, specialty, setSpecialty, experienceLevel, setExperienceLevel, targetCountry, setTargetCountry, targetRole, setTargetRole, jobDescription, setJobDescription, cvText, cvReady, fileName, upload, startInterview, loading }} />}
      {screen === "interview" && <InterviewScreen {...{ question, questionCount, answered, answer, setAnswer, evaluation, submitAnswer, completeInterview, loading }} />}
      {screen === "report" && <Report report={report} onAgain={() => setScreen("setup")} onHistory={loadHistory} />}
      {screen === "history" && <History items={history} onAgain={() => setScreen("setup")} />}
      {paywallOpen ? <DownloadPaywall feature="interview session" title="Continue practising with AI Interview Coach" message="Your complete free interview session has been used. Upgrade for unlimited role-specific practice and feedback during your access period." onClose={() => setPaywallOpen(false)} onPaid={() => { setPaywallOpen(false); setError(""); }} /> : null}
    </main>
  );
}

function Setup(p) {
  const startReason = p.loading ? "Your interview is being prepared." : !p.cvReady ? "Upload a readable PDF or Word CV to unlock interview practice." : "";
  return (
    <section className="interview-setup">
      <div className="coach-hero">
        <div>
          <span>HEALTHCARE AI INTERVIEW COACH</span>
          <h1>Practice the interview before it matters.</h1>
          <p>Your CV, profession and target role shape the questions. AI evaluates your answers and shows exactly what to improve.</p>
          <div className="coach-proof"><span><FiCheckCircle /> CV-grounded</span><span><FiTarget /> Job-specific</span><span><FiZap /> AI feedback</span></div>
        </div>
        <div className="coach-orb"><FiMic /><small>Voice mode coming later</small></div>
      </div>
      <div className="setup-grid">
        <section className="setup-card">
          <div className="step-heading"><b>01</b><div><strong>Choose your practice</strong><small>Make it feel like your real interview.</small></div></div>
          <div className="mode-grid">
            {MODES.map(([name, count, text]) => <button type="button" key={name} className={p.mode === name ? "selected" : ""} onClick={() => p.setMode(name)}><strong>{name}</strong><span>{count} questions</span><small>{text}</small></button>)}
          </div>
          <div className="personality-row"><strong>Interviewer style</strong>{["Professional", "Friendly", "Strict", "Executive"].map((style) => <button type="button" key={style} className={p.personality === style ? "active" : ""} onClick={() => p.setPersonality(style)}>{style}</button>)}</div>
        </section>
        <section className="setup-card evidence-card">
          <div className="step-heading"><b>02</b><div><strong>Build your interview context</strong><small>Use your existing CV — no manual CV entry needed.</small></div></div>
          <label className="cv-drop"><input type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => p.upload(e.target.files?.[0])} /><FiFileText /><strong>{p.fileName || (p.cvReady ? "CV already loaded" : "Upload PDF or Word CV")}</strong><small>{p.cvReady ? `${p.cvText.trim().split(/\s+/).length} words ready` : "Your CV stays the source of truth"}</small></label>
          <div className="form-two">
            <label>Profession<select value={p.profession} onChange={(e) => p.setProfession(e.target.value)}>{PROFESSIONS.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Target country<select value={p.targetCountry} onChange={(e) => p.setTargetCountry(e.target.value)}>{COUNTRIES.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Specialty<input value={p.specialty} onChange={(e) => p.setSpecialty(e.target.value)} placeholder="e.g. ICU" /></label>
            <label>Experience level<input value={p.experienceLevel} onChange={(e) => p.setExperienceLevel(e.target.value)} placeholder="e.g. 5 years" /></label>
          </div>
          <label>Target job title<input value={p.targetRole} onChange={(e) => p.setTargetRole(e.target.value)} placeholder="e.g. ICU Nurse" /></label>
          {(p.mode === "Job-Specific Interview" || p.mode === "GCC Interview") && <label>Job description<textarea value={p.jobDescription} onChange={(e) => p.setJobDescription(e.target.value)} placeholder="Paste the vacancy here..." /></label>}
          <button type="button" className="start-interview" disabled={!p.cvReady || p.loading} aria-describedby={startReason ? "start-interview-reason" : undefined} title={startReason || "Start AI interview"} onClick={p.startInterview}><FiPlay /> {p.loading ? "Preparing your interview..." : !p.cvReady ? "Upload CV to start practice" : "Start AI Interview"} <FiChevronRight /></button>
          {startReason ? <p id="start-interview-reason" className="control-reason"><FiFileText />{startReason}</p> : <p className="control-ready"><FiCheckCircle />Your CV is ready. You can start practising.</p>}
        </section>
      </div>
      <div className="safety-note">AI interview feedback is for preparation only. It is not a clinical decision tool, licensing prediction or hiring guarantee.</div>
    </section>
  );
}

function InterviewScreen(p) {
  const progress = Math.min((p.answered / Math.max(p.questionCount, 1)) * 100, 100);
  return (
    <section className="interview-session">
      <div className="session-head"><div><span>AI INTERVIEWER</span><h1>{p.question?.category || "Interview question"}</h1></div><div className="progress-box"><strong>Question {Math.min(p.answered + 1, p.questionCount)} of {p.questionCount}</strong><i><b style={{ width: `${progress}%` }} /></i></div></div>
      <div className="question-card"><div className="ai-avatar"><FiMic /></div><div><span>AI Interviewer</span><h2>{p.question?.question || "Loading your next question..."}</h2></div></div>
      {p.evaluation && <Evaluation evaluation={p.evaluation} />}
      <div className="answer-card"><label htmlFor="answer">Your answer</label><textarea id="answer" value={p.answer} onChange={(e) => p.setAnswer(e.target.value)} placeholder="Answer as you would in the real interview. Use a specific example when you can..." disabled={p.loading} /><div><small>{!p.answer.trim() ? "Write an answer to enable AI feedback. Tip: use Situation → Task → Action → Result." : "Your answer is ready for AI feedback."}</small><button type="button" className="submit-answer" disabled={!p.answer.trim() || p.loading} title={p.loading ? "Your answer is being evaluated." : !p.answer.trim() ? "Write an answer before submitting." : "Submit answer"} onClick={p.submitAnswer}>{p.loading ? "AI is evaluating..." : "Submit Answer"}<FiChevronRight /></button></div></div>
      <button type="button" className="end-interview" onClick={() => p.completeInterview()} disabled={p.loading} title={p.loading ? "Wait for the current answer evaluation to finish." : "End interview and create report"}>{p.loading ? "Finishing current evaluation..." : "End interview"}</button>
    </section>
  );
}

function Evaluation({ evaluation }) {
  return <div className="evaluation-card"><div className="eval-score"><strong>{evaluation.score || 0}</strong><span>/100</span><small>AI practice score</small></div><div className="eval-body"><h3>Quick feedback</h3><div className="eval-cols"><FeedbackList title="Strong points" items={evaluation.strengths} /><FeedbackList title="Improve next" items={evaluation.improvements} /></div>{evaluation.starFeedback && <p className="star"><strong>STAR feedback:</strong> {evaluation.starFeedback}</p>}{evaluation.improvedAnswer && <details><summary>Improve my answer</summary><p>{evaluation.improvedAnswer}</p></details>}</div></div>;
}

function Report({ report, onAgain, onHistory }) {
  return <section className="report-page"><div className="report-hero"><span>INTERVIEW PERFORMANCE</span><h1>{report?.overallScore || 0}/100</h1><p>{report?.readinessMessage || "This is an AI-generated practice score, not a hiring prediction."}</p></div><div className="report-grid"><Metric label="Communication" value={report?.communication} /><Metric label="Technical knowledge" value={report?.technicalKnowledge} /><Metric label="Clinical reasoning" value={report?.clinicalReasoning} /><Metric label="Confidence" value={report?.confidence} /><Metric label="Job relevance" value={report?.jobRelevance} /><Metric label="Answer structure" value={report?.answerStructure} /></div><div className="report-columns"><FeedbackList title="Your strengths" items={report?.strengths} /><FeedbackList title="Improve before your interview" items={report?.improvementAreas} /><FeedbackList title="Questions to practice again" items={report?.weakQuestions} /></div><div className="report-actions"><button type="button" onClick={onAgain}><FiRefreshCw /> Practice again</button><button type="button" onClick={onHistory}>My interview history</button></div></section>;
}

function Metric({ label, value }) {
  const numeric = Number(value);
  const valid = Number.isFinite(numeric);
  return <article className="metric"><span>{label}</span><strong>{valid ? numeric : "—"}</strong>{valid && <i><b style={{ width: `${Math.max(0, Math.min(100, numeric))}%` }} /></i>}</article>;
}

function FeedbackList({ title, items }) {
  const values = Array.isArray(items) ? items.filter(Boolean) : [];
  return <div className="report-list"><h3>{title}</h3>{values.length ? <ul>{values.map((item, index) => <li key={`${title}-${index}`}><FiCheckCircle />{item}</li>)}</ul> : <p>No specific items were identified.</p>}</div>;
}

function History({ items, onAgain }) {
  return <section className="history-page"><div className="history-heading"><div><span>MY INTERVIEWS</span><h1>Keep getting better.</h1><p>Review your previous AI-generated practice scores and practice again.</p></div><button type="button" onClick={onAgain}><FiPlay /> Practice again</button></div>{items.length ? <div className="history-table">{items.map((item) => <article key={item.id}><div><strong>{item.target_role}</strong><span>{item.profession} · {item.interview_type} · {item.target_country || "Global"}</span></div><b>{item.overall_score ?? "—"}/100</b><small>{item.created_at ? new Date(item.created_at).toLocaleDateString() : ""}</small><FiChevronRight /></article>)}</div> : <div className="empty-history"><FiTrendingUp /><h2>No interviews yet</h2><p>Your first practice session will appear here.</p><button type="button" onClick={onAgain}>Start your first interview</button></div>}</section>;
}
