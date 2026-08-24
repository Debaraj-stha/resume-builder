import { Link } from "react-router-dom";
import { FiArrowRight, FiBriefcase, FiCheckCircle, FiGlobe, FiHeart, FiLock, FiShield, FiTarget } from "react-icons/fi";
import "../css/about.css";

const principles = [
  { icon: <FiHeart />, title: "Built for healthcare", copy: "Guidance is shaped around clinical experience, professional registration, patient-care evidence, research, quality and healthcare leadership." },
  { icon: <FiShield />, title: "Accuracy before appearance", copy: "AI may improve structure and wording, but it must not invent qualifications, licences, clinical competence, employers or achievements." },
  { icon: <FiTarget />, title: "Practical career preparation", copy: "CV review, job matching, country readiness and interview practice work together as one guided application journey." },
  { icon: <FiGlobe />, title: "Designed for global mobility", copy: "Support is designed for healthcare professionals exploring India, GCC and selected international career pathways." },
];

const journey = [
  "Upload a PDF or Word CV for healthcare-focused ATS review",
  "Review AI suggestions and verify every professional claim",
  "Match the improved CV to a real vacancy",
  "Practise role-specific interview questions and strengthen weak answers",
];

export default function About() {
  return <main className="about-page">
    <section className="about-hero">
      <span>ABOUT RESUAIBUILDER</span>
      <h1>A more responsible AI career partner for healthcare professionals.</h1>
      <p>ResuAIBuilder helps doctors, nurses, pharmacists, allied health professionals and healthcare leaders prepare clearer applications for opportunities in India, the GCC and other international markets.</p>
      <div className="about-actions">
        <Link className="about-primary" to="/ats-checker">Improve my healthcare CV <FiArrowRight /></Link>
        <Link className="about-secondary" to="/healthcare-interview-coach">Try interview practice</Link>
      </div>
    </section>

    <section className="about-story">
      <div><span>WHY WE EXIST</span><h2>Generic résumé advice often misses what healthcare careers require.</h2></div>
      <div className="about-story-copy">
        <p>Healthcare applications involve more than attractive templates. Employers and regulators may look for clear experience chronology, registration, licensing status, clinical competencies, professional development and evidence of patient-care or operational impact.</p>
        <p>ResuAIBuilder brings those needs into one guided workspace while keeping the applicant in control of every fact included in the final CV.</p>
      </div>
    </section>

    <section className="about-principles" aria-labelledby="principles-title">
      <div className="about-section-heading"><span>OUR APPROACH</span><h2 id="principles-title">Healthcare-specific, evidence-led and transparent.</h2></div>
      <div className="about-principle-grid">{principles.map(({ icon, title, copy }) => <article key={title}>{icon}<h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className="about-journey">
      <div className="about-journey-intro"><span>ONE CONNECTED WORKFLOW</span><h2>From your existing experience to a stronger application.</h2><p>You do not need to start from an empty form or use unrelated tools for each stage.</p></div>
      <ol>{journey.map((item, index) => <li key={item}><b>{index + 1}</b><span>{item}</span></li>)}</ol>
    </section>

    <section className="about-trust">
      <div><FiLock /><span><strong>Your documents deserve care</strong>Do not upload patient records, passport numbers or other sensitive identifiers.</span></div>
      <div><FiCheckCircle /><span><strong>You remain the final reviewer</strong>Verify every date, credential and clinical statement before using an AI-assisted CV.</span></div>
      <div><FiBriefcase /><span><strong>No hiring or licensing guarantee</strong>Career and readiness tools provide preparation guidance, not regulator or employer decisions.</span></div>
    </section>

    <section className="about-company">
      <span>OPERATED BY WYONORA GLOBAL · INDIA</span>
      <h2>Ready to strengthen your next healthcare application?</h2>
      <p>Start with one free healthcare CV review and download before deciding whether a paid plan is right for you.</p>
      <Link to="/ats-checker">Start free <FiArrowRight /></Link>
    </section>
  </main>;
}
