import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck, FiFileText, FiHeart, FiShield, FiTarget, FiTrendingUp } from "react-icons/fi";
import "../css/home.css";
import "../css/healthcare-tools.css";

const professions = ["Doctors", "Nurses", "Pharmacists", "Allied Health", "Medical Technicians", "Healthcare Leaders"];
const benefits = [
  { icon: <FiHeart />, title: "Built for healthcare", text: "Role-specific guidance for clinical experience, licences, competencies, research and patient-care outcomes." },
  { icon: <FiTarget />, title: "Healthcare ATS guidance", text: "Check the keywords and evidence employers expect for your profession and target country." },
  { icon: <FiFileText />, title: "Matching cover letters", text: "Create a focused cover letter that connects your clinical strengths with each vacancy." },
];

export default function Home() {
  return <main className="landing-page healthcare-home">
    <section className="hero-section">
      <div className="hero-copy">
        <span className="eyebrow">THE CAREER BUILDER FOR HEALTHCARE PROFESSIONALS</span>
        <h1>Your clinical experience deserves a stronger CV.</h1>
        <p className="hero-lead">Build an ATS-friendly healthcare CV and tailored cover letter with guidance for your profession, credentials, target role and country.</p>
        <div className="hero-actions"><Link className="primary-action" to="/get-started">Build my healthcare CV <FiArrowRight /></Link><Link className="secondary-action" to="/cover-letter">Create a cover letter</Link></div>
        <div className="trust-row"><FiShield /> Private workspace · ATS-friendly layouts · Secure PDF export</div>
        <div className="profession-strip">{professions.map(item => <span key={item}>{item}</span>)}</div>
      </div>
      <div className="clinical-preview">
        <div className="clinical-card-head"><span>HEALTHCARE CV CHECK</span><b>86%</b></div>
        <div className="score-ring">86<span>ATS readiness</span></div>
        <div className="check-list"><p><FiCheck /> Licence and registration visible</p><p><FiCheck /> Clinical competencies included</p><p><FiCheck /> Patient-care impact demonstrated</p><p className="suggestion"><FiTrendingUp /> Add target-role keywords</p></div>
        <Link to="/ats-checker">Check my healthcare CV <FiArrowRight /></Link>
      </div>
    </section>
    <section className="benefit-section"><div className="section-heading"><span>MORE THAN A TEMPLATE</span><h2>Guidance that understands healthcare hiring</h2><p>Present trust, competence and measurable impact—not a generic list of duties.</p></div><div className="benefit-grid">{benefits.map(({icon,title,text}) => <article className="benefit-card" key={title}>{icon}<h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="steps-section"><div><span className="eyebrow">A CLEAR APPLICATION WORKFLOW</span><h2>From experience to interview-ready.</h2><p>Use structured prompts to turn everyday clinical responsibilities into credible evidence.</p></div><ol>{["Select profession, target role and country","Build your CV with healthcare-specific prompts","Check readiness and create a matching cover letter"].map((step,i)=><li key={step}><span>{i+1}</span><p>{step}</p><FiCheck/></li>)}</ol></section>
    <section className="final-cta"><div><span>START FREE</span><h2>Make your next healthcare application count.</h2><p>Create and preview your CV before paying to download.</p></div><Link className="light-action" to="/get-started">Create my CV <FiArrowRight /></Link></section>
  </main>;
}
