import { secureJsonPost, requireUser } from "./_security.js";
import { runAI, clean } from "./_ai.js";
import { canUseCareerTool, recordCareerToolUse } from "./_freemium.js";

const system = `You write personalized healthcare job cover letters. Use only facts explicitly present in the CV and job description. Never invent qualifications, licences, employers, achievements, clinical experience or metrics. If a fact is absent, omit it. Return JSON only.`;

export default async function handler(request, response) {
  if (!secureJsonPost(request, response, 70000)) return;
  const user = await requireUser(request, response);
  if (!user) return;
  const access = await canUseCareerTool(user.id, "cover_letter");
  if (!access.allowed) return response.status(access.status).json({ error: access.error, code: access.code });
  const { cvText, jobDescription, companyName = "", jobTitle = "", targetRole = "", targetCountry = "", style = "Professional" } = request.body || {};
  if (!cvText || !jobDescription) return response.status(400).json({ error: "CV and job description are required." });
  const prompt = `Style: ${clean(style, 40)}\nCompany: ${clean(companyName, 200)}\nJob title: ${clean(jobTitle || targetRole, 200)}\nTarget country: ${clean(targetCountry, 100)}\n\nCV:\n${clean(cvText, 35000)}\n\nJob description:\n${clean(jobDescription, 25000)}\n\nWrite a concise, specific cover letter grounded in the source. Return {"subject":"","opening":"","body":"","closing":""}.`;
  const result = await runAI({ system, prompt, validate: data => data && ["subject","opening","body","closing"].every(k => typeof data[k] === "string") });
  if (!result) return response.status(502).json({ error: "AI cover letter generation is temporarily unavailable." });
  await recordCareerToolUse(user.id, access);
  return response.status(200).json({ ...result.data, provider: result.provider });
}
