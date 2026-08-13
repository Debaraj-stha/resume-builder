import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowRight, FiCheck, FiFileText, FiShield } from "react-icons/fi";
import { healthcareSeoPages, seoPageLinks } from "../data/healthcareSeoPages";
import "../css/healthcare-seo.css";

export default function HealthcareSeoLanding() {
  const { pathname } = useLocation();
  const content = healthcareSeoPages[pathname];
  const primaryAction = content.primaryAction || { label: "Build my healthcare CV", to: "/get-started" };

  useEffect(() => {
    const scriptId = "healthcare-page-schema";
    document.getElementById(scriptId)?.remove();
    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.text = JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: content.title, description: content.intro,
      mainEntity: { "@type": "FAQPage", mainEntity: content.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) } });
    document.head.appendChild(script);
    return () => script.remove();
  }, [content]);

  return <main className="seo-landing">
    <section className="seo-hero"><div className="seo-hero-copy"><span>{content.eyebrow}</span><h1>{content.title}</h1><p>{content.intro}</p><div className="seo-actions"><Link className="seo-primary" to={primaryAction.to}>{primaryAction.label} <FiArrowRight /></Link><Link className="seo-secondary" to="/templates">View healthcare templates</Link></div><small><FiShield /> {content.audience}</small></div>
      <aside className="seo-check-card" aria-label="Included CV guidance"><div><FiFileText /><span>ROLE-SPECIFIC CV REVIEW</span></div><h2>What you can improve</h2><ul>{content.highlights.map(item => <li key={item}><FiCheck /> {item}</li>)}</ul><p>AI-assisted wording should always be checked against your real qualifications and experience.</p></aside></section>
    <section className="seo-content-section"><div className="seo-section-heading"><span>BUILD WITH PURPOSE</span><h2>{content.sectionTitle}</h2></div><div className="seo-card-grid">{content.sections.map((item, index) => <article key={item.title}><b>0{index + 1}</b><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
    <section className="seo-example"><div><span>WRITING EXAMPLE</span><h2>{content.exampleTitle}</h2></div><blockquote>{content.example}</blockquote></section>
    <section className="seo-keywords"><div><span>ROLE LANGUAGE</span><h2>Relevant terms to use when they match your experience</h2><p>Do not add keywords that you cannot support in an interview.</p></div><div>{content.keywords.map(keyword => <span key={keyword}>{keyword}</span>)}</div></section>
    <section className="seo-faq"><div className="seo-section-heading"><span>COMMON QUESTIONS</span><h2>Practical answers before you apply</h2></div><div>{content.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
    <section className="seo-related"><p>Explore more healthcare CV resources</p><div>{seoPageLinks.filter(([, link]) => link !== pathname).map(([label, link]) => <Link key={link} to={link}>{label} <FiArrowRight /></Link>)}</div></section>
    <section className="seo-final-cta"><div><span>BUILD WITH VERIFIED INFORMATION</span><h2>Ready to create a clearer healthcare CV?</h2><p>Start with your profession, target market and real career details.</p></div><Link to={primaryAction.to}>{primaryAction.label} <FiArrowRight /></Link></section>
  </main>;
}
