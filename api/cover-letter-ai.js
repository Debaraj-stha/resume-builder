import { secureJsonPost, requireUser } from "./_security.js";
import { runAI, clean } from "./_ai.js";

const system = `You write personalized healthcare job cover letters. Use only facts explicitly present in the CV and job description. Never invent qualifications, licences, employers, achievements, clinical experience or metrics. If a fact is absent, omit it. Return JSON only.`;

export default async function handler(request, response) {
  if (!secureJsonPost(request, response, 70000)) return;
  const user = await requireUser(request, response);
  if (!user) return;
  const { cvText, jobDescription, companyName = "", jobTitle = "", style = "Professional" } = request.body || {};
  if (!cvText || !jobDescription) return response.status(400).json({ error: "CV and job description are required." });
  const prompt = `Style: ${clean(style, 40)}\nCompany: ${clean(companyName, 200)}\nJob title: ${clean(jobTitle, 200)}\n\nCV:\n${clean(cvText, 35000)}\n\nJob description:\n${clean(jobDescription, 25000)}\n\nWrite a concise, specific cover letter grounded in the source. Return {"subject":"","opening":"","body":"","closing":""}.`;
  const result = await runAI({ system, prompt });
  if (!result) return response.status(502).json({ error: "AI cover letter generation is temporarily unavailable." });
  return response.status(200).json({ ...result.data, provider: result.provider });
}
