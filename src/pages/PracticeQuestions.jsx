import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiChevronRight, FiRefreshCw, FiTarget } from "react-icons/fi";
import supabase from "../../supabaseClient";
import "../css/interview-coach.css";

const CATEGORIES = ["General", "Clinical", "HR", "GCC", "Job-Specific"];
const PROFESSIONS = ["Nurse", "Doctor", "Pharmacist", "Pharmacy Technician", "Physiotherapist", "Medical Laboratory Professional", "Radiographer", "Healthcare Administrator"];

const questions = {
  General: ["Tell me about yourself and the healthcare experience that makes you a strong candidate.", "Why are you interested in this healthcare role?", "Describe a challenging situation at work and how you handled it."],
  Clinical: ["Describe how you would respond to a patient-safety concern while following your organisation's escalation process.", "How do you make sure your clinical or technical documentation is accurate and complete?", "Tell me about a time you had to prioritise competing patient-care responsibilities."],
  HR: ["Tell me about a disagreement with a colleague and how you resolved it.", "Describe a time you received difficult feedback. What did you do with it?", "What would your previous colleagues say is your biggest professional strength?"],
  GCC: ["Why do you want to work in the GCC healthcare market?", "How would you adapt to a multicultural healthcare team and patient population?", "How would you demonstrate professionalism when working with patients from different cultural backgrounds?"],
  "Job-Specific": ["Which part of your experience makes you a strong match for your target role?", "Which responsibility in the vacancy would require the most preparation from you?", "What would you aim to accomplish during your first 90 days in this role?"]
};

export default function PracticeQuestions() {
  const [category, setCategory] = useState("General");
  const [profession, setProfession] = useState("Nurse");
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const current = useMemo(() => questions[category][index % questions[category].length], [category, index]);

  const next = () => { setIndex((v) => v + 1); setAnswer(""); setFeedback(null); };
  const reset = () => { setIndex(0); setAnswer(""); setFeedback(null); };

  async function evaluate() {
    if (!answer.trim()) return;
    setLoading(true);
    setFeedback(null);
    try {
      const { data } = await supabase.auth.getSession();
      const token = data?.session?.access_token;
      if (!token) throw new Error("Please sign in to use AI feedback.");
      const response = await fetch("/api/interview-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: "practice-evaluate", profession, category, question: current, answer })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "AI feedback is temporarily unavailable.");
      setFeedback(result.feedback);
    } catch (error) {
      setFeedback({ score: 60, strengths: ["You attempted the question."], improvements: [error.message || "Add a specific example and explain your actions and result."], starFeedback: "Use Situation → Task → Action → Result for behavioural answers." });
    } finally { setLoading(false); }
  }

  return <main className="interview-page">
    <header className="interview-top"><Link to="/dashboard"><FiArrowLeft /> Dashboard</Link><div><span>RESUAI HEALTHCARE AI</span><strong>Practice Questions</strong></div><Link className="history-button" to="/interview-coach">Mock Interview <FiChevronRight /></Link></header>
    <section className="interview-setup">
      <div className="coach-hero"><div><span>HEALTHCARE PRACTICE LAB</span><h1>Practise one question at a time.</h1><p>Choose a healthcare interview category, write your answer, get AI feedback, then move to the next question.</p><div className="coach-proof"><span><FiCheckCircle /> Guided practice</span><span><FiTarget /> Healthcare focused</span><span><FiRefreshCw /> Repeat anytime</span></div></div></div>
      <div className="setup-grid">
        <section className="setup-card"><div className="step-heading"><b>01</b><div><strong>Choose your practice</strong><small>Switch categories instantly.</small></div></div><div className="mode-grid">{CATEGORIES.map((item) => <button type="button" key={item} className={category === item ? "selected" : ""} onClick={() => { setCategory(item); reset(); }}><strong>{item} Questions</strong><span>{questions[item].length} starter questions</span><small>Practice {item.toLowerCase()} interview skills.</small></button>)}</div><label style={{display:"block",marginTop:18}}>Profession<select value={profession} onChange={(e) => setProfession(e.target.value)}>{PROFESSIONS.map((item) => <option key={item}>{item}</option>)}</select></label></section>
        <section className="setup-card evidence-card"><div className="step-heading"><b>02</b><div><strong>Question {index + 1}</strong><small>{category} · {profession}</small></div></div><div className="question-card"><div className="ai-avatar"><FiTarget /></div><div><span>Practice question</span><h2>{current}</h2></div></div><div className="answer-card"><label htmlFor="practice-answer">Your answer</label><textarea id="practice-answer" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Write your answer as if you were in the interview..." disabled={loading}/><div><small>{answer.trim() ? "Your answer is ready for feedback." : "Write an answer to enable AI feedback. Use a specific real example when possible."}</small><button type="button" className="submit-answer" onClick={evaluate} disabled={!answer.trim() || loading} title={loading ? "Your answer is being evaluated." : !answer.trim() ? "Write an answer before requesting feedback." : "Get AI feedback"}>{loading ? "Evaluating..." : "Get AI Feedback"}<FiChevronRight /></button></div></div>{feedback && <div className="evaluation-card"><div className="eval-score"><strong>{feedback.score || 60}</strong><span>/100</span><small>Practice score</small></div><div className="eval-body"><h3>Feedback</h3><div className="eval-cols"><div><h4>Strong points</h4><ul>{(feedback.strengths || []).map((x,i)=><li key={i}><FiCheckCircle />{x}</li>)}</ul></div><div><h4>Improve next</h4><ul>{(feedback.improvements || []).map((x,i)=><li key={i}><FiTarget />{x}</li>)}</ul></div></div>{feedback.starFeedback && <p className="star"><strong>STAR:</strong> {feedback.starFeedback}</p>}</div></div>}<div className="report-actions"><button type="button" onClick={reset}><FiRefreshCw /> Restart</button><button type="button" onClick={next}>Next Question <FiChevronRight /></button></div></section>
      </div>
    </section>
  </main>;
}
