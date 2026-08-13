import { secureJsonPost } from "./_security.js";
const limits = new Map();
const clean = (value, max = 50000) => String(value || "").replace(/[<>]/g, "").slice(0, max);
const rateLimited = (request) => { const key = (request.headers["x-forwarded-for"] || request.socket?.remoteAddress || "unknown").split(",")[0]; const now = Date.now(); const entry = limits.get(key) || { start: now, count: 0 }; if (now - entry.start > 60000) { entry.start = now; entry.count = 0; } entry.count += 1; limits.set(key, entry); return entry.count > 5; };

const system = `You are a healthcare CV specialist. Transform the supplied CV into a concise, globally usable ATS-friendly healthcare CV. Use only facts explicitly present in the CV. Never invent employers, dates, qualifications, licences, registrations, clinical competence, patient volumes, achievements or metrics. Preserve contact details exactly. Where an important fact is absent, add it to missingInformation, never into the CV as a claim. Naturally align verified experience with the supplied job description. Return valid JSON only, with no markdown.`;
const schema = `{"detectedRole":"","targetHeadline":"","personalDetails":{"name":"","email":"","phone":"","profession":"","address":"","profile":"","urls":[{"value":""}]},"summary":"","skills":[{"field":"Clinical competencies","items":[{"value":""}]}],"experiences":[{"company_name":"","position":"","about_company":"","start_date":"","end_date":"","location":"","achievements":[{"value":""}]}],"educations":[{"university":"","degree":"","start_year":"","end_year":"","gpa":"","address":""}],"certificates":[{"certificate":"","subject":"","date":""}],"trainings":[{"title":"","organization":"","year":"","location":""}],"languages":[{"language":"","proficiency":""}],"achievements":[{"achievement":"","field":"","date":""}],"missingInformation":[""],"verificationChecklist":[""],"improvements":[""]}`;
const sourceContains = (source, value) => !value || String(value).toLowerCase() === "present" || source.toLowerCase().includes(String(value).toLowerCase());
const enforceSourceDates = (draft, source) => {
  const strip = (items, fields) => Array.isArray(items) && items.forEach((item) => fields.forEach((field) => { if (!sourceContains(source, item?.[field])) item[field] = ""; }));
  strip(draft.experiences, ["start_date", "end_date"]);
  strip(draft.educations, ["start_year", "end_year", "gpa"]);
  strip(draft.certificates, ["date"]);
  strip(draft.trainings, ["year"]);
  strip(draft.achievements, ["date"]);
  draft.verificationChecklist = Array.isArray(draft.verificationChecklist) && draft.verificationChecklist.length ? draft.verificationChecklist : ["Confirm every employer and date", "Confirm qualifications, certifications and licence status", "Confirm every clinical skill and achievement"];
  draft.improvements = Array.isArray(draft.improvements) && draft.improvements.length ? draft.improvements : ["Reorganised content into ATS-readable healthcare sections", "Strengthened verified experience using clear action-led language", "Prioritised clinical competencies and credentials"];
  return draft;
};

const providers = {
  openai: async (prompt) => { const key = process.env.OPENAI_API_KEY; if (!key) return null; const r = await fetch("https://api.openai.com/v1/chat/completions", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4.1-mini", temperature: .15, response_format: { type: "json_object" }, messages: [{ role: "system", content: system }, { role: "user", content: prompt }] }) }); if (!r.ok) throw new Error("OpenAI request failed"); const j = await r.json(); return j.choices?.[0]?.message?.content; },
  groq: async (prompt) => { const key = process.env.GROQ_API_KEY; if (!key) return null; const r = await fetch("https://api.groq.com/openai/v1/chat/completions", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile", temperature: .15, response_format: { type: "json_object" }, messages: [{ role: "system", content: system }, { role: "user", content: prompt }] }) }); if (!r.ok) throw new Error("Groq request failed"); const j = await r.json(); return j.choices?.[0]?.message?.content; },
};

export default async function handler(request, response) {
  if (!secureJsonPost(request, response, 80_000)) return;
  if (rateLimited(request)) return response.status(429).json({ error: "Too many requests. Please wait one minute." });
  const { cvText, jobDescription = "", targetCountry = "Global" } = request.body || {};
  if (!cvText || String(cvText).length < 120) return response.status(400).json({ error: "The uploaded CV did not contain enough readable text." });
  const prompt = `Target country: ${clean(targetCountry, 100)}\nTarget job description (optional):\n${clean(jobDescription, 15000)}\n\nSource CV:\n${clean(cvText)}\n\nRewrite the content and populate this exact JSON structure: ${schema}. Keep arrays empty when the source has no verified information. Experience bullets must be strong and ATS-readable but factually equivalent to the source.`;
  const preferred = process.env.AI_PROVIDER?.toLowerCase();
  const order = preferred && providers[preferred] ? [preferred, ...Object.keys(providers).filter((name) => name !== preferred)] : ["openai", "groq"];
  for (const name of order) {
    try {
      const raw = await providers[name](prompt);
      if (!raw) continue;
      const improved = enforceSourceDates(JSON.parse(raw), String(cvText));
      return response.status(200).json({ improved, provider: name, requiresVerification: true });
    } catch (error) {
      console.error(`CV improvement provider ${name} failed`, error instanceof Error ? error.message : "Unknown error");
    }
  }
  return response.status(502).json({ error: "AI CV improvement is temporarily unavailable." });
}
