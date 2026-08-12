import { Link } from "react-router-dom";
import "../css/legal.css";

export default function ChatGPTIntegration() {
  return <main className="legal-page"><article>
    <span>RESUAIBUILDER FOR CHATGPT</span>
    <h1>Healthcare CV assistance inside ChatGPT</h1>
    <p className="legal-intro">After directory approval, users can securely connect ResuAIBuilder and ask ChatGPT to analyse a healthcare CV, match it to a vacancy, draft a cover letter or create an explainable ATS report.</p>
    <section><h2>Available tools</h2><p><strong>Analyse CV:</strong> identifies ATS issues and truthful improvements. <strong>Match Job:</strong> separates matched, missing and unverified requirements. <strong>Generate Cover Letter:</strong> drafts from confirmed facts. <strong>Get ATS Report:</strong> explains readability, relevance, credentials, impact and completeness.</p></section>
    <section><h2>Privacy and safety</h2><p>Authentication is required. CV text is processed only to answer the selected request and is not intentionally stored by the MCP endpoint. Do not submit patient information, government identity numbers or details you are not authorised to share. AI output must be reviewed before use.</p></section>
    <section><h2>Important limitation</h2><p>Availability inside ChatGPT depends on successful OpenAI review and directory publication. This page does not imply that OpenAI endorses ResuAIBuilder or that every ChatGPT user can install it before approval.</p></section>
    <div className="legal-callout"><strong>Need the web version now?</strong><p>The full healthcare CV builder remains available on this website.</p></div>
    <Link className="legal-back" to="/get-started">Build a healthcare CV</Link>
  </article></main>;
}
