import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiChevronRight, FiFileText, FiMic, FiPlay, FiRefreshCw, FiTarget, FiTrendingUp, FiXCircle, FiZap } from "react-icons/fi";
import supabase from "../../supabaseClient";
import { readCVFile } from "../utils/cvFileReader";
import "../css/interview-coach.css";

const modes = [
  ["Quick Practice", "5 questions", "A fast warm-up before an interview."],
  ["Standard Interview", "10 questions", "Balanced HR, behavioral and role questions."],
  ["Full Mock Interview", "15 questions", "A deeper realistic interview simulation."],
  ["Job-Specific Interview", "5–20 questions", "Built around the vacancy you provide."],
  ["Healthcare Clinical Interview", "5–20 questions", "Profession-specific clinical scenarios for interview practice."],
  ["HR Interview", "5–20 questions", "Behavioral, communication and workplace questions."],
  ["GCC Interview", "5–20 questions", "Preparation for healthcare roles targeting GCC employers."],
];
const professions = ["Nurse","Doctor","Pharmacist","Pharmacy Technician","Physiotherapist","Medical Laboratory Professional","Radiographer","Healthcare Administrator","Other Healthcare Professional"];

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
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [answered, setAnswered] = useState(0);
  const [questionCount, setQuestionCount] = useState(5);
  const [report, setReport] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cvReady = cvText.trim().length >= 120;
  const modeInfo = useMemo(() => modes.find(m => m[0] === mode), [mode]);

  const call = async (payload) => {
    const { data: { session } = {} } = await supabase.auth.getSession();
    if (!session?.access_token) throw new Error("Your session has expired. Please sign in again.");
    const response = await fetch("/api/interview-coach", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` }, body: JSON.stringify(payload) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Interview service is temporarily unavailable.");
    return data;
  };

  const upload = async (file) => {
    if (!file) return;
    setError("");
    try { const text = await readCVFile(file); setCvText(text); setFileName(file.name); sessionStorage.setItem("resuai_cv_text", text); }
    catch (e) { setError(e.message); }
  };

  const start = async () => {
    setLoading(true); setError("");
    try {
      const count = mode === "Quick Practice" ? 5 : mode === "Standard Interview" ? 10 : mode === "Full Mock Interview" ? 15 : 5;
      const data = await call({ action: "start", mode, personality, profession, specialty, experienceLevel, targetCountry, targetRole: targetRole || profession, jobTitle: targetRole, jobDescription, cvText, questionCount: count });
      setInterviewId(data.interviewId); setQuestion(data.question); setQuestionCount(data.questionCount); setAnswered(0); setAnswer(""); setEvaluation(null); setReport(null); setScreen("interview");
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const submit = async () => {
    if (!answer.trim() || !question) return;
    setLoading(true); setError("");
    try {
      const data = await call({ action: "answer", interviewId, questionId: question.id, answer });
      setEvaluation(data.answer?.feedback || {}); setAnswered(data.answered || answered + 1); setAnswer("");
      if (data.complete) { await finish(); }
      else setQuestion(data.nextQuestion);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const finish = async () => {
    setLoading(true); setError("");
    try { const data = await call({ action: "complete", interviewId }); setReport(data.report); setScreen("report"); }
    catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const loadHistory = async () => {
    try { const data = await call({ action: "history" }); setHistory(data.interviews || []); setScreen("history"); }
    catch (e) { setError(e.message); }
  };

  return <main className="interview-page">
    <header className="interview-top"><Link to="/dashboard"><FiArrowLeft/> Dashboard</Link><div><span>RESUAI HEALTHCARE AI</span><strong>Interview Coach</strong></div><button className="history-button" onClick={loadHistory}><FiRefreshCw/> My Interviews</button></header>
    {error && <div className="interview-error"><FiXCircle/><span>{error}</span>{error.includes("sign in") && <Link to="/login?redirectTo=%2Finterview-coach">Sign in</Link>}</div>}
    {screen === "setup" && <Setup {...{mode,setMode,modeInfo,personality,setPersonality,profession,setProfession,specialty,setSpecialty,experienceLevel,setExperienceLevel,targetCountry,setTargetCountry,targetRole,setTargetRole,jobDescription,setJobDescription,cvText,cvReady,fileName,upload,start,loading}} />}
    {screen === "interview" && <InterviewScreen {...{question,questionCount,answered,answer,setAnswer,evaluation,submit,finish,loading}} />}
    {screen === "report" && <Report report={report} onAgain={() => setScreen("setup")} onHistory={loadHistory} />}
    {screen === "history" && <History items={history} onAgain={() => setScreen("setup")} />}
  </main>;
}

function Setup(p) { return <section className="interview-setup"><div className="coach-hero"><div><span>HEALTHCARE AI INTERVIEW COACH</span><h1>Practice the interview before it matters.</h1><p>Your CV, profession and target role shape the questions. AI evaluates your answers and shows exactly what to improve.</p><div className="coach-proof"><span><FiCheckCircle/> CV-grounded</span><span><FiTarget/> Job-specific</span><span><FiZap/> AI feedback</span></div></div><div className="coach-orb"><FiMic/><small>Voice mode coming later</small></div></div><div className="setup-grid"><section className="setup-card"><div className="step-heading"><b>01</b><div><strong>Choose your practice</strong><small>Make it feel like your real interview.</small></div></div><div className="mode-grid">{modes.map(([name,count,text]) => <button key={name} className={p.mode === name ? "selected" : ""} onClick={() => p.setMode(name)}><strong>{name}</strong><span>{count}</span><small>{text}</small></button>)}</div><div className="personality-row"><strong>Interviewer style</strong>{["Professional","Friendly","Strict","Executive"].map(x => <button key={x} className={p.personality === x ? "active" : ""} onClick={() => p.setPersonality(x)}>{x}</button>)}</div></section><section className="setup-card evidence-card"><div className="step-heading"><b>02</b><div><strong>Build your interview context</strong><small>Use your existing CV — no manual CV entry needed.</small></div></div><label className="cv-drop"><input type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={e => p.upload(e.target.files[0])}/><FiFileText/><strong>{p.fileName || (p.cvReady ? "CV already loaded" : "Upload PDF or Word CV")}</strong><small>{p.cvReady ? `${p.cvText.trim().split(/\s+/).length} words ready` : "Your CV stays the source of truth"}</small></label><div className="form-two"><label>Profession<select value={p.profession} onChange={e => p.setProfession(e.target.value)}>{professions.map(x => <option key={x}>{x}</option>)}</select></label><label>Target country<select value={p.targetCountry} onChange={e => p.setTargetCountry(e.target.value)}>{["UAE","Saudi Arabia","Qatar","Oman","Bahrain","Kuwait","India","Global"].map(x => <option key={x}>{x}</option>)}</select></label><label>Specialty<input value={p.specialty} onChange={e => p.setSpecialty(e.target.value)} placeholder="e.g. ICU"/></label><label>Experience level<input value={p.experienceLevel} onChange={e => p.setExperienceLevel(e.target.value)} placeholder="e.g. 5 years"/></label></div><label>Target job title<input value={p.targetRole} onChange={e => p.setTargetRole(e.target.value)} placeholder="e.g. ICU Nurse"/></label>{(p.mode === "Job-Specific Interview" || p.mode === "GCC Interview") && <label>Job description<textarea value={p.jobDescription} onChange={e => p.setJobDescription(e.target.value)} placeholder="Paste the vacancy here..."/></label>}<button className="start-interview" disabled={!p.cvReady || p.loading} onClick={p.start}><FiPlay/> {p.loading ? "Preparing your interview..." : "Start AI Interview"}<FiChevronRight/></button></section></div><div className="safety-note">AI interview feedback is for preparation only. It is not a clinical decision tool, licensing prediction or hiring guarantee.</div></section> }

function InterviewScreen({question,questionCount,answered,answer,setAnswer,evaluation,submit,finish,loading}) { return <section className="interview-session"><div className="session-head"><div><span>AI INTERVIEWER</span><h1>{question?.category || "Interview question"}</h1></div><div className="progress-box"><strong>Question {Math.min(answered + 1, questionCount)} of {questionCount}</strong><i><b style={{width:`${Math.min((answered / questionCount) * 100,100)}%`}}/></i></div></div><div className="question-card"><div className="ai-avatar"><FiMic/></div><div><span>AI Interviewer</span><h2>{question?.question || "Loading your next question..."}</h2></div></div>{evaluation && <Evaluation evaluation={evaluation}/>}<div className="answer-card"><label htmlFor="answer">Your answer</label><textarea id="answer" value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Answer as you would in the real interview. Use a specific example when you can..." disabled={loading}/><div><small>Tip: For behavioral questions, try Situation → Task → Action → Result.</small><button className="submit-answer" disabled={!answer.trim() || loading} onClick={submit}>{loading ? "AI is evaluating..." : "Submit Answer"}<FiChevronRight/></button></div></div><button className="end-interview" onClick={finish} disabled={loading}>End interview</button></section> }
function Evaluation({evaluation}) { return <div className="evaluation-card"><div className="eval-score"><strong>{evaluation.score || 0}</strong><span>/100</span><small>AI practice score</small></div><div className="eval-body"><h3>Quick feedback</h3><div className="eval-cols"><List title="Strong points" items={evaluation.strengths}/><List title="Improve next" items={evaluation.improvements}/></div>{evaluation.starFeedback && <p className="star"><strong>STAR feedback:</strong> {evaluation.starFeedback}</p>}{evaluation.improvedAnswer && <details><summary>Improve my answer</summary><p>{evaluation.improvedAnswer}</p></details>}</div></div> }
function Report({report,onAgain,onHistory}) { return <section className="report-page"><div className="report-hero"><span>INTERVIEW PERFORMANCE</span><h1>{report?.overallScore || 0}/100</h1><p>{report?.readinessMessage || "This is an AI-generated practice score, not a hiring prediction."}</p></div><div className="report-grid"><Metric label="Communication" value={report?.communication}/><Metric label="Technical knowledge" value={report?.technicalKnowledge}/><Metric label="Clinical reasoning" value={report?.clinicalReasoning}/><Metric label="Confidence" value={report?.confidence}/><Metric label="Job relevance" value={report?.jobRelevance}/><Metric label="Answer structure" value={report?.answerStructure}/></div><div className="report-columns"><List title="Your strengths" items={report?.strengths}/><List title="Improve before your interview" items={report?.improvementAreas}/><List title="Questions to practice again" items={report?.weakQuestions}/></div><div className="report-actions"><button onClick={onAgain}><FiRefreshCw/> Practice again</button><button onClick={onHistory}>My interview history</button></div></section> }
function Metric({label,value}) { return <article className="metric"><span>{label}</span><strong>{value ?? "—"}</strong>{value != null && <i><b style={{width:`${Math.max(0,Math.min(100,Number(value)))}%`}}/></i>}</article> }
function List({title,items}) { const values = Array.isArray(items) ? items.filter(Boolean) : []; return <div className="report-list"><h3>{title}</h3>{values.length ? <ul>{values.map((x,i)=><li key={i}><FiCheckCircle/>{x}</li>)}</ul> : <p>No specific items were identified.</p>}</div> }
function History({items,onAgain}) { return <section className="history-page"><div className="history-heading"><div><span>MY INTERVIEWS</span><h1>Keep getting better.</h1><p>Review your previous AI-generated practice scores and practice again.</p></div><button onClick={onAgain}><FiPlay/> Practice again</button></div>{items.length ? <div className="history-table">{items.map(x=><article key={x.id}><div><strong>{x.target_role}</strong><span>{x.profession} · {x.interview_type} · {x.target_country || "Global"}</span></div><b>{x.overall_score ?? "—"}/100</b><small>{new Date(x.created_at).toLocaleDateString()}</small><FiChevronRight/></article>)}</div> : <div className="empty-history"><FiTrendingUp/><h2>No interviews yet</h2><p>Your first practice session will appear here.</p><button onClick={onAgain}>Start your first interview</button></div>}</section> }
