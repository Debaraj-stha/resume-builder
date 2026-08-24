import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheckCircle, FiLock, FiMic, FiTarget, FiZap } from "react-icons/fi";
import "../css/interview-coach.css";

export default function InterviewCoachLanding() {
  useEffect(() => {
    document.title = "AI Healthcare Interview Coach | ResuAIBuilder";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Try ResuAIBuilder's healthcare AI interview coach. Practise realistic questions, submit your answer and receive AI-generated practice feedback and an improved answer.");
    const id = "interview-coach-schema";
    document.getElementById(id)?.remove();
    const script = document.createElement("script"); script.id = id; script.type = "application/ld+json";
    script.text = JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication","name":"ResuAIBuilder Healthcare AI Interview Coach","applicationCategory":"BusinessApplication","description":"AI healthcare interview practice with answer feedback and improvement guidance."});
    document.head.appendChild(script); return () => script.remove();
  }, []);
  return <main className="interview-page">
    <section className="coach-hero"><div><span>AI HEALTHCARE INTERVIEW COACH</span><h1>Don't just read interview answers. Practise giving them.</h1><p>Upload your CV, choose your healthcare role and let the AI coach ask realistic interview questions. Answer in your own words, then see what worked and how your answer could be stronger.</p><div className="coach-proof"><span><FiCheckCircle/> CV-grounded</span><span><FiTarget/> Role-specific</span><span><FiZap/> AI feedback</span></div><div className="seo-actions" style={{marginTop:24}}><Link className="coach-primary-action" to="/interview-coach">Start free practice <FiArrowRight/></Link><Link className="seo-secondary" to="/pricing">See Pro plans</Link></div><small className="cta-reassurance">No payment required. Upload a readable PDF or Word CV on the next screen to begin.</small></div></section>
    <section className="setup-grid">
      <article className="setup-card"><div className="step-heading"><b>01</b><div><strong>Get a realistic question</strong><small>Healthcare, HR, clinical or GCC-oriented practice.</small></div></div><h2>Questions shaped around your career</h2><p>Select your profession, specialty, target role and country. Upload your CV so the coach can use relevant experience as interview context.</p></article>
      <article className="setup-card"><div className="step-heading"><b>02</b><div><strong>Answer it yourself</strong><small>No model answer is shown first.</small></div></div><h2>Learn by practising, not copying</h2><p>Write the answer you would genuinely give in an interview. This makes the feedback useful for your actual communication skills.</p></article>
      <article className="setup-card"><div className="step-heading"><b>03</b><div><strong>Get AI feedback</strong><small>Score, strengths and improvement points.</small></div></div><h2>Understand what to improve</h2><p>The coach evaluates relevance, completeness, clarity, structure, communication and job relevance, then shows an improved version without inventing your experience.</p></article>
      <article className="setup-card"><div className="step-heading"><b>04</b><div><strong>Build interview readiness</strong><small>Repeat weak areas.</small></div></div><h2>Finish with a practice report</h2><p>Review your overall practice score, strengths, improvement areas and questions worth practising again.</p></article>
    </section>
    <section className="report-page" style={{paddingLeft:0,paddingRight:0}}><div className="report-hero"><span>FREE PREVIEW · PRO FOR CONTINUED PRACTICE</span><h2>Try the experience before paying.</h2><p>Your first complete interview session is available as a preview. Pro unlocks continued AI interview practice for active job searches.</p><div style={{marginTop:20}}><Link className="seo-primary" to="/interview-coach"><FiMic/> Try the coach</Link></div></div></section>
    <p className="safety-note"><FiLock/> AI interview feedback is for preparation only. It is not a clinical decision tool, licensing prediction or hiring guarantee.</p>
  </main>;
}
