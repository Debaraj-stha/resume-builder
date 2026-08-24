import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck, FiHeart, FiMic, FiShield, FiTarget, FiTrendingUp, FiBookOpen } from "react-icons/fi";
import "../css/home.css";
import "../css/healthcare-tools.css";
import "../css/home-professional.css";
import { seoPageLinks } from "../data/healthcareSeoPages";

const professions = ["Doctors", "Nurses", "Pharmacists", "Allied Health", "Medical Technicians", "Healthcare Leaders"];
const benefits = [
  { icon: <FiHeart />, title: "Built for healthcare", text: "Role-specific guidance for clinical experience, licences, competencies, research and patient-care outcomes." },
  { icon: <FiTarget />, title: "Healthcare ATS guidance", text: "Check the keywords and evidence employers expect for your profession and target country." },
  { icon: <FiMic />, title: "AI interview practice", text: "Practise realistic healthcare interviews, submit your own answers and see how AI can improve them." },
  { icon: <FiBookOpen />, title: "GCC licensing exam prep", text: "Take scored practice tests by profession for DHA, DOH, MOHAP, SCFHS, DHP and other pathways." },
];

export default function Home() {
  return <main className="landing-page healthcare-home">
    <section className="hero-section">
      <div className="hero-copy">
        <span className="eyebrow">THE CAREER BUILDER FOR HEALTHCARE PROFESSIONALS</span>
        <h1>Your guided AI career partner for global healthcare roles.</h1>
        <p className="hero-lead">Improve your CV with a step-by-step AI coach, check credential readiness for your destination and practise interviews with guidance based on your profession and real experience.</p>
        <div className="hero-actions"><Link className="primary-action" to="/ats-checker">Upload & improve my CV <FiArrowRight /></Link><Link className="secondary-action" to="/healthcare-interview-coach">Try AI Interview Coach</Link></div>
        <div className="trust-row"><FiShield /> Evidence-led AI coaching · Healthcare ATS guidance · Country readiness</div>
        <div className="profession-strip">{professions.map(item => <span key={item}>{item}</span>)}</div>
      </div>
      <div className="clinical-preview">
        <div className="clinical-card-head"><span>AI INTERVIEW COACH</span><b>TRY FREE</b></div>
        <div className="score-ring">AI<span>Practice feedback</span></div>
        <div className="check-list"><p><FiCheck /> CV-based questions</p><p><FiCheck /> Role-specific practice</p><p><FiCheck /> AI answer scoring</p><p className="suggestion"><FiTrendingUp /> See a stronger answer</p></div>
        <Link to="/healthcare-interview-coach">Try the interview coach <FiArrowRight /></Link>
      </div>
    </section>
    <section className="benefit-section"><div className="section-heading"><span>MORE THAN A TEMPLATE</span><h2>From CV preparation to interview confidence</h2><p>Use one healthcare career workspace instead of separate generic tools.</p></div><div className="benefit-grid">{benefits.map(({icon,title,text}) => <article className="benefit-card" key={title}>{icon}<h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="role-pathways"><div className="section-heading"><span>BUILT AROUND YOUR CAREER</span><h2>Choose guidance that matches your healthcare path</h2><p>Start with role-specific CV advice, then practise explaining your real experience.</p></div><div>{seoPageLinks.map(([label, path]) => <Link key={path} to={path}>{label}<FiArrowRight /></Link>)}</div></section>
    <section className="steps-section"><div><span className="eyebrow">A CLEAR APPLICATION WORKFLOW</span><h2>From experience to interview-ready.</h2><p>Turn your real experience into a stronger application and practise how you will explain it.</p></div><ol>{["Upload your CV once for ATS review and AI improvement","Prepare for your licensing pathway with profession-specific practice","Practise the interview and improve your answers with AI"].map((step,i)=><li key={step}><span>{i+1}</span><p>{step}</p><FiCheck/></li>)}</ol></section>
    <section className="final-cta"><div><span>TRY THE AI INTERVIEW COACH</span><h2>See the value before you subscribe.</h2><p>Experience a real interview question, submit your answer and see AI-generated practice feedback.</p></div><Link className="light-action" to="/healthcare-interview-coach">Try AI Interview Coach <FiArrowRight /></Link></section>
  </main>;
}
