import { secureJsonPost, requireUser } from "./_security.js";
import { runAI, clean } from "./_ai.js";

const system = `You are an expert healthcare CV editor. Analyze the supplied CV and identify weaknesses before proposing improvements. Use only facts in the source. Never fabricate numbers, achievements, qualifications, employers, licences, clinical competence or experience. Return JSON only.`;
const schema = `{"problems":[{"type":"","severity":"","original":"","why":"","suggestion":""}],"summary":"","priorityActions":[],"improvedSections":[]}`;

export default async function handler(request, response) {
  if (!secureJsonPost(request, response, 60000)) return;
  const user = await requireUser(request, response);
  if (!user) return;
  const { cvText, targetRole = "Healthcare Professional", targetCountry = "Global" } = request.body || {};
  if (!cvText || String(cvText).length < 120) return response.status(400).json({ error: "Please upload a readable CV first." });
  const prompt = `Target role: ${clean(targetRole, 150)}\nTarget country: ${clean(targetCountry, 100)}\n\nSOURCE CV:\n${clean(cvText, 45000)}\n\nFind weak bullet points, generic statements, missing measurable achievements where applicable, weak action verbs, keyword issues, ATS/formatting risks, redundancy and missing relevant sections. If a metric would help but is not present, say to add it if applicable; do not invent it. Return: ${schema}`;
  const result = await runAI({ system, prompt });
  if (!result) return response.status(502).json({ error: "AI CV optimization is temporarily unavailable." });
  return response.status(200).json({ ...result.data, provider: result.provider });
}
