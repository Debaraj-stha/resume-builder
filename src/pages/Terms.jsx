import { Link } from "react-router-dom";
import "../css/legal.css";

const sections = [
  ["1. Service", "ResuAIBuilder provides healthcare career-document drafting, ATS analysis and related assistance. Outputs are drafts and do not guarantee interviews, employment, licensing, immigration approval or regulatory acceptance."],
  ["2. User responsibility", "You must provide truthful information, verify every generated statement and remove patient-identifying or other information you are not authorised to share."],
  ["3. AI-generated content", "AI may make mistakes. You remain responsible for checking employers, dates, qualifications, licences, clinical competencies, achievements and application requirements before use."],
  ["4. Prohibited use", "Do not use the service to fabricate credentials, impersonate another person, process patient records, upload malware, bypass access controls or violate another person's privacy or intellectual-property rights."],
  ["5. ChatGPT integration", "The ResuAIBuilder ChatGPT integration processes only the information a user deliberately sends to a selected tool. Tool results require verification and are subject to the same safety and accuracy limitations as the website."],
  ["6. Availability", "We may change, suspend or discontinue features to maintain security, legal compliance or service quality. Third-party AI, hosting, authentication and payment services may occasionally be unavailable."],
  ["7. Privacy and payment", "Our Privacy Policy explains data handling. Paid access and eligible refunds are governed by the pricing and Refund & Cancellation Policy shown at purchase."],
  ["8. Contact", "Questions about these terms, privacy or deletion requests can be submitted through the Contact page."],
];

export default function Terms() {
  return <main className="legal-page"><article><span>LAST UPDATED: 12 AUGUST 2026</span><h1>Terms of Service</h1><p className="legal-intro">These terms apply to the ResuAIBuilder website and its approved AI-platform integrations.</p>{sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}<Link className="legal-back" to="/">Return home</Link></article></main>;
}
