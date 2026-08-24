import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const siteUrl = "https://www.resuaibuilder.com";
const defaultDescription = "Create an ATS-friendly healthcare CV with AI-assisted improvement, nursing and medical templates, job matching and secure PDF export.";
const pages = {
  "/": { title: "Healthcare CV Builder & ATS Resume Optimiser | ResuAIBuilder", description: defaultDescription },
  "/templates": { title: "Healthcare CV Templates for Nurses, Doctors & Allied Health", description: "Choose professional ATS-friendly healthcare CV templates designed for nurses, doctors, pharmacists and allied health professionals." },
  "/ats-checker": { title: "Healthcare ATS CV Checker & AI Resume Optimiser", description: "Upload your healthcare CV, check ATS readiness and create an improved, editable version using verified professional information." },
  "/uae-healthcare-jobs": { title: "UAE Healthcare Jobs for Nurses, Doctors & Allied Health", description: "Search current UAE healthcare opportunities by profession and emirate, then match your healthcare CV before applying on the original job website." },
  "/licensing-exam-prep": { title: "DHA, DOH & GCC Healthcare Exam Practice | ResuAIBuilder", description: "Practise healthcare licensing-style questions for DHA, DOH, MOHAP, SCFHS, DHP and other GCC pathways by profession." },
  "/healthcare-guide": { title: "Healthcare CV Guide by Role and Country | ResuAIBuilder", description: "Practical CV guidance for healthcare professionals applying in the UAE, UK, Saudi Arabia, Qatar, India and other global markets." },
  "/cover-letter": { title: "Healthcare Cover Letter Builder | ResuAIBuilder", description: "Create a tailored healthcare cover letter for nursing, medical, pharmacy and allied health roles." },
  "/pricing": { title: "Healthcare CV Builder Pricing | ResuAIBuilder", description: "Compare affordable ResuAIBuilder plans for healthcare CV creation, ATS analysis and professional document tools." },
  "/about": { title: "About Healthcare ResuAIBuilder", description: "Learn how ResuAIBuilder helps healthcare professionals create accurate, ATS-friendly CVs for global career opportunities." },
  "/contact": { title: "Contact ResuAIBuilder", description: "Contact the ResuAIBuilder team for support with your healthcare CV builder account and tools." },
  "/privacy": { title: "Privacy Policy | ResuAIBuilder", description: "Read how ResuAIBuilder handles account, CV and payment-related information." },
  "/refund-policy": { title: "Refund and Cancellation Policy | ResuAIBuilder", description: "Review ResuAIBuilder subscription, cancellation and refund terms." },
  "/healthcare-cv-examples": { title: "20 Healthcare CV Examples by Role & Country | ResuAIBuilder", description: "Explore practical CV structures for nurses, doctors, pharmacists, allied health and healthcare leaders applying in India, GCC and the UK." },
  "/gcc-eligibility-checker": { title: "Free GCC Healthcare Eligibility Checklist | ResuAIBuilder", description: "Prepare healthcare licensing documents for UAE, Saudi Arabia, Qatar, Oman and Bahrain with a free informational checklist." },
  "/healthcare-interview-questions": { title: "Healthcare Interview Questions with Answer Frameworks", description: "Practise nursing, doctor, pharmacy, allied health, clinical, HR and GCC healthcare interview questions." },
  "/healthcare-salary-explorer": { title: "Healthcare Salary Explorer – India & GCC", description: "Review indicative salary ranges for nurses, doctors, pharmacists and allied health professionals in India and GCC markets." },
  "/application-tracker": { title: "Free Healthcare Job Application Tracker", description: "Privately organise healthcare job applications, target countries, interview stages and follow-up progress in your browser." },
  "/career-readiness-score": { title: "Free Healthcare Career Readiness Score", description: "Check CV, licensing, job matching and interview preparation readiness and share a privacy-safe score." },
  "/nurse-resume-builder": { title: "Nurse Resume Builder – ATS Nursing CV | ResuAIBuilder", description: "Build an ATS-friendly nursing CV with prompts for registration, clinical competencies, unit experience and patient-care achievements." },
  "/doctor-cv-builder": { title: "Doctor CV Builder – Professional Medical CV | ResuAIBuilder", description: "Create a professional doctor CV covering clinical appointments, procedures, registration, audits, teaching, research and publications." },
  "/pharmacist-resume-builder": { title: "Pharmacist Resume Builder – ATS Pharmacy CV | ResuAIBuilder", description: "Create an ATS-ready pharmacist CV for hospital, clinical, community, regulatory and pharmacovigilance roles." },
  "/dha-cv-builder": { title: "DHA CV Builder for Dubai Healthcare Jobs | ResuAIBuilder", description: "Build a UAE-focused healthcare CV that clearly presents DHA status, DataFlow progress, credentials and clinical experience." },
  "/healthcare-ats-checker": { title: "Healthcare ATS Checker & CV Optimiser | ResuAIBuilder", description: "Check healthcare CV structure, role keywords, credentials and evidence, then create a cleaner editable draft from verified information." },
  "/gulf-healthcare-cv": { title: "Gulf Healthcare CV Builder for GCC Jobs | ResuAIBuilder", description: "Create a healthcare CV for UAE, Saudi Arabia, Qatar and Oman with clear licence readiness and relevant clinical evidence." },
  "/medical-cv-examples": { title: "Medical CV Examples for Healthcare Professionals | ResuAIBuilder", description: "Explore credible medical, nursing, pharmacy and allied health CV examples and learn to write stronger evidence-led achievements." },
};
const privatePrefixes = ["/dashboard", "/login", "/build-resume", "/redirecting", "/get-started", "/ai-assistant"];

const setMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) { element = document.createElement("meta"); document.head.appendChild(element); }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
};

export default function SEO() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = pages[pathname] || pages["/"];
    const isPrivate = privatePrefixes.some((prefix) => pathname.startsWith(prefix)) || !pages[pathname];
    const canonical = `${siteUrl}${pathname === "/" ? "" : pathname}`;
    document.title = page.title;
    setMeta('meta[name="description"]', { name: "description", content: page.description });
    setMeta('meta[name="robots"]', { name: "robots", content: isPrivate ? "noindex, nofollow" : "index, follow, max-image-preview:large" });
    setMeta('meta[property="og:title"]', { property: "og:title", content: page.title });
    setMeta('meta[property="og:description"]', { property: "og:description", content: page.description });
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: page.title });
    setMeta('meta[name="twitter:description"]', { name: "twitter:description", content: page.description });
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = canonical;
  }, [pathname]);
  return null;
}
