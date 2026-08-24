/* global process */
import { secureJsonPost } from "./_security.js";
const limits = new Map();
const clean = (value, max = 50000) => String(value || "").replace(/[<>]/g, "").slice(0, max);
const rateLimited = (request) => { const key = (request.headers["x-forwarded-for"] || request.socket?.remoteAddress || "unknown").split(",")[0]; const now = Date.now(); const entry = limits.get(key) || { start: now, count: 0 }; if (now - entry.start > 60000) { entry.start = now; entry.count = 0; } entry.count += 1; limits.set(key, entry); return entry.count > 5; };
const fetchWithTimeout = async (url, options, timeoutMs = 45_000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try { return await fetch(url, { ...options, signal: controller.signal }); }
  finally { clearTimeout(timer); }
};
const providerError = async (provider, response) => {
  let code = "unknown";
  try { code = (await response.json())?.error?.code || "unknown"; } catch { /* provider returned no JSON */ }
  const error = new Error(`${provider} request failed (${response.status}, ${code})`);
  error.status = response.status;
  error.code = code;
  return error;
};

export const parseProviderJson = (raw) => {
  const value = String(raw || "").trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  try { return JSON.parse(value); }
  catch {
    const start = value.indexOf("{");
    const end = value.lastIndexOf("}");
    if (start < 0 || end <= start) throw new Error("AI provider returned no JSON object");
    return JSON.parse(value.slice(start, end + 1));
  }
};

const system = `You are a healthcare CV specialist. Transform the supplied CV into a complete, globally usable ATS-friendly healthcare CV. Use only facts explicitly present in the CV. Never invent employers, dates, qualifications, licences, registrations, clinical competence, patient volumes, achievements or metrics. Preserve contact details exactly. PRESERVATION IS MANDATORY: retain every employer, job title, date, qualification, licence, registration, certification, training, language, publication, research item, membership, award and other career fact found in the source. Improve wording and organisation, but never shorten the CV by deleting verified information. Put content that does not fit a named field into additionalSections. Where an important fact is absent, add it to missingInformation, never into the CV as a claim. Naturally align verified experience with the supplied job description. Return valid JSON only, with no markdown.`;
const schema = `{"detectedRole":"","targetHeadline":"","personalDetails":{"name":"","email":"","phone":"","profession":"","address":"","profile":"","urls":[{"value":""}]},"summary":"","skills":[{"field":"Clinical competencies","items":[{"value":""}]}],"experiences":[{"company_name":"","position":"","about_company":"","start_date":"","end_date":"","location":"","achievements":[{"value":""}]}],"educations":[{"university":"","degree":"","start_year":"","end_year":"","gpa":"","address":""}],"certificates":[{"certificate":"","subject":"","date":""}],"trainings":[{"title":"","organization":"","year":"","location":""}],"languages":[{"language":"","proficiency":""}],"achievements":[{"achievement":"","field":"","date":""}],"additionalSections":[{"title":"Research and publications","items":[{"value":""}]}],"missingInformation":[""],"verificationChecklist":[""],"improvements":[""],"coach":{"welcome":"","scoreExplanation":"","summaryReason":"","experienceReason":"","nextStep":""}}`;
const sourceContains = (source, value) => !value || String(value).toLowerCase() === "present" || source.toLowerCase().includes(String(value).toLowerCase());
const headingType = (line) => {
  const value = line.toLowerCase().replace(/[^a-z& ]/g, " ").replace(/\s+/g, " ").trim();
  if (/^(professional )?(summary|profile|objective)$/.test(value)) return "summary";
  if (/^(professional |work |clinical )?(experience|employment|career history)$/.test(value)) return "experience";
  if (/^(education|qualifications?|academic background)$/.test(value)) return "education";
  if (/^(clinical |core |technical )?(skills|competencies|expertise)$/.test(value)) return "skills";
  if (/^(licen[cs]es?|registration|certifications?|credentials)( & certifications?)?$/.test(value)) return "certificates";
  if (/^(training|courses?|continuing education|professional development)$/.test(value)) return "trainings";
  if (/^languages?$/.test(value)) return "languages";
  return "";
};

export const buildSourcePreservingDraft = (sourceText) => {
  const source = clean(sourceText);
  const lines = source.split(/\r?\n/).map((line) => line.replace(/^\s*[•·▪*-]\s*/, "").trim()).filter(Boolean);
  const grouped = { summary: [], experience: [], education: [], skills: [], certificates: [], trainings: [], languages: [], other: [] };
  let section = "other";
  for (const line of lines) { const type = headingType(line); if (type) section = type; else grouped[section].push(line); }
  const email = source.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || "";
  const phone = source.match(/\+?\d[\d\s()-]{7,}\d/)?.[0]?.trim() || "";
  const urls = source.match(/(?:https?:\/\/|www\.|linkedin\.com\/)[^\s,;]+/gi) || [];
  const identityLines = lines.filter((line) => !headingType(line) && line !== email && line !== phone && !line.includes("@"));
  const name = identityLines.find((line) => line.length >= 3 && line.length <= 80 && !/\d/.test(line)) || "Healthcare Professional";
  const profession = identityLines.find((line) => line !== name && line.length <= 100 && !/\d/.test(line)) || "Healthcare Professional";
  const summaryLines = grouped.summary.length ? grouped.summary : identityLines.filter((line) => line !== name && line !== profession).slice(0, 4);
  const experienceLines = grouped.experience.length ? grouped.experience : lines.filter((line) => !headingType(line)).slice(0, 40);
  const known = new Set([...grouped.summary, ...grouped.experience, ...grouped.education, ...grouped.skills, ...grouped.certificates, ...grouped.trainings, ...grouped.languages]);
  const remaining = lines.filter((line) => !headingType(line) && !known.has(line) && line !== name && line !== profession && line !== email && line !== phone);
  return enforceSourceDates({
    detectedRole: profession, targetHeadline: profession,
    personalDetails: { name, email, phone, profession, address: "", profile: "", urls: urls.map((value) => ({ value })) },
    summary: summaryLines.join(" ").slice(0, 1200),
    skills: grouped.skills.length ? [{ field: "Clinical competencies", items: grouped.skills.map((value) => ({ value })) }] : [],
    experiences: experienceLines.length ? [{ company_name: "", position: "Professional experience", about_company: "", start_date: "", end_date: "", location: "", achievements: experienceLines.map((value) => ({ value })) }] : [],
    educations: grouped.education.map((degree) => ({ university: "", degree, start_year: "", end_year: "", gpa: "", address: "" })),
    certificates: grouped.certificates.map((certificate) => ({ certificate, subject: "", date: "" })),
    trainings: grouped.trainings.map((title) => ({ title, organization: "", year: "", location: "" })),
    languages: grouped.languages.map((language) => ({ language, proficiency: "" })), achievements: [],
    additionalSections: remaining.length ? [{ title: "Additional information from uploaded CV", items: remaining.map((value) => ({ value })) }] : [],
    missingInformation: ["AI enhancement is temporarily limited; verify the source-preserving draft before download."],
    verificationChecklist: [], improvements: ["Preserved readable information from the uploaded CV", "Organised detected content under standard ATS headings"], coach: {}
  }, source);
};
const enforceSourceDates = (draft, source) => {
  const strip = (items, fields) => Array.isArray(items) && items.forEach((item) => fields.forEach((field) => { if (!sourceContains(source, item?.[field])) item[field] = ""; }));
  strip(draft.experiences, ["start_date", "end_date"]);
  strip(draft.educations, ["start_year", "end_year", "gpa"]);
  strip(draft.certificates, ["date"]);
  strip(draft.trainings, ["year"]);
  strip(draft.achievements, ["date"]);
  draft.verificationChecklist = Array.isArray(draft.verificationChecklist) && draft.verificationChecklist.length ? draft.verificationChecklist : ["Confirm every employer and date", "Confirm qualifications, certifications and licence status", "Confirm every clinical skill and achievement"];
  draft.improvements = Array.isArray(draft.improvements) && draft.improvements.length ? draft.improvements : ["Reorganised content into ATS-readable healthcare sections", "Strengthened verified experience using clear action-led language", "Prioritised clinical competencies and credentials"];
  draft.coach = { welcome: draft.coach?.welcome || "I have reviewed your CV and prepared a safer, clearer healthcare version for you.", scoreExplanation: draft.coach?.scoreExplanation || "Your score reflects ATS readability, healthcare relevance, credentials, achievements and completeness.", summaryReason: draft.coach?.summaryReason || "I made the summary more specific to your healthcare role while keeping it grounded in your source CV.", experienceReason: draft.coach?.experienceReason || "I changed passive duties into concise action-led evidence without adding unsupported facts.", nextStep: draft.coach?.nextStep || "Review each section, edit anything that needs context, then confirm every clinical and licensing statement." };
  return draft;
};

const providers = {
  openai: async (prompt) => { const key = process.env.OPENAI_API_KEY; if (!key) return null; const r = await fetchWithTimeout("https://api.openai.com/v1/chat/completions", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4.1-mini", temperature: .15, response_format: { type: "json_object" }, messages: [{ role: "system", content: system }, { role: "user", content: prompt }] }) }); if (!r.ok) throw await providerError("OpenAI", r); const j = await r.json(); return j.choices?.[0]?.message?.content; },
  groq: async (prompt) => {
    const key = process.env.GROQ_API_KEY;
    if (!key) return null;
    const request = async (forceJson) => {
      const body = { model: process.env.GROQ_MODEL || "openai/gpt-oss-20b", temperature: .1, messages: [{ role: "system", content: system }, { role: "user", content: prompt }] };
      if (forceJson) body.response_format = { type: "json_object" };
      return fetchWithTimeout("https://api.groq.com/openai/v1/chat/completions", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
    };
    let r = await request(true);
    if (!r.ok) {
      const error = await providerError("Groq", r);
      if (error.status !== 400) throw error;
      console.warn(`Groq forced JSON failed (${error.code}); retrying with prompt-enforced JSON.`);
      r = await request(false);
    }
    if (!r.ok) throw await providerError("Groq", r);
    const j = await r.json();
    return j.choices?.[0]?.message?.content;
  },
};

export default async function handler(request, response) {
  if (!secureJsonPost(request, response, 80_000)) return;
  if (rateLimited(request)) return response.status(429).json({ error: "Too many requests. Please wait one minute." });
  const { cvText, jobDescription = "", targetCountry = "Global", refinementFeedback = "" } = request.body || {};
  if (!cvText || String(cvText).length < 120) return response.status(400).json({ error: "The uploaded CV did not contain enough readable text." });
  const prompt = `Target country: ${clean(targetCountry, 100)}\nTarget job description (optional):\n${clean(jobDescription, 15000)}\n${refinementFeedback ? `\nATS refinement feedback from the first draft:\n${clean(refinementFeedback, 5000)}\n` : ""}\nSource CV:\n${clean(cvText)}\n\nRewrite the content and populate this exact JSON structure: ${schema}. Keep arrays empty only when the source has no verified information for that section. Preserve the complete employment chronology and every education, credential and professional-development item. Do not merge separate employers or qualifications. Experience bullets must be strong and ATS-readable but factually equivalent to the source. Use additionalSections for publications, research, memberships, conferences, references or any source content that does not fit another field. Use conventional ATS headings and naturally repeat supported role language where it improves clarity. If ATS refinement feedback is supplied, correct every item possible using facts from the source; never invent a missing credential, skill or metric. Before returning JSON, compare it against the source and restore every omitted career fact. In coach, speak directly to the applicant like a warm professional healthcare CV consultant. Briefly explain what you noticed, why the summary and experience changes help, and the safest next step. Do not promise interviews or licensing success.`;
  const preferred = process.env.AI_PROVIDER?.toLowerCase();
  const order = preferred && providers[preferred] ? [preferred, ...Object.keys(providers).filter((name) => name !== preferred)] : ["openai", "groq"];
  for (const name of order) {
    try {
      const raw = await providers[name](prompt);
      if (!raw) continue;
      const improved = enforceSourceDates(parseProviderJson(raw), String(cvText));
      return response.status(200).json({ improved, provider: name, requiresVerification: true });
    } catch (error) {
      console.error(`CV improvement provider ${name} failed`, error instanceof Error ? error.message : "Unknown error");
    }
  }
  console.warn("All AI CV providers unavailable; returning source-preserving local fallback.");
  return response.status(200).json({ improved: buildSourcePreservingDraft(String(cvText)), provider: "source-preserving fallback", requiresVerification: true, fallbackUsed: true });
}
