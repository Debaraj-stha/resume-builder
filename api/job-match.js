import { secureJsonPost, requireUser } from "./_security.js";
import { runAI, clean } from "./_ai.js";
import { canUseCareerTool, recordCareerToolUse } from "./_freemium.js";
import { healthcareJobsHandler } from "./_healthcare-jobs.js";

const system = `You are ResuAIBuilder's healthcare recruitment specialist. Compare a candidate CV with a target job description. Use only facts explicitly present in the CV. Never invent experience, qualifications, certifications, licences, employers, achievements or metrics. Return JSON only.`;
const schema = `{"overallScore":0,"breakdown":{"experienceMatch":0,"skillsMatch":0,"qualificationMatch":0,"keywordsMatch":0,"jobTitleMatch":0,"certificationMatch":0},"goodMatchReasons":[],"missingKeywords":[],"missingSkills":[],"potentialGaps":[],"atsRisks":[],"recommendedImprovements":[],"tailoringNotes":[]}`;
const valid = data => data && Number.isFinite(Number(data.overallScore)) && Number(data.overallScore) >= 0 && Number(data.overallScore) <= 100 && data.breakdown && Object.values(data.breakdown).every(v => Number.isFinite(Number(v)) && Number(v) >= 0 && Number(v) <= 100) && ["goodMatchReasons","missingKeywords","missingSkills","potentialGaps","atsRisks","recommendedImprovements","tailoringNotes"].every(k => Array.isArray(data[k]));

export default async function handler(request, response) {
  if (request.method === "GET") return healthcareJobsHandler(request, response);
  if (!secureJsonPost(request, response, 70000)) return;
  const user = await requireUser(request, response);
  if (!user) return;
  const access = await canUseCareerTool(user.id, "job_match");
  if (!access.allowed) return response.status(access.status).json({ error: access.error, code: access.code });
  const { cvText, jobDescription, targetRole = "Healthcare Professional", targetCountry = "Global" } = request.body || {};
  if (!cvText || !jobDescription || String(cvText).length < 120 || String(jobDescription).length < 80) return response.status(400).json({ error: "Please provide a readable CV and a complete job description." });
  const prompt = `Target role: ${clean(targetRole, 150)}\nTarget country: ${clean(targetCountry, 100)}\n\nCANDIDATE CV:\n${clean(cvText, 35000)}\n\nJOB DESCRIPTION:\n${clean(jobDescription, 25000)}\n\nReturn this exact JSON structure: ${schema}. Score based on evidence, not assumptions. Missing items must be reported, never added to the candidate profile.`;
  const result = await runAI({ system, prompt, validate: valid });
  if (!result) return response.status(502).json({ error: "AI job matching is temporarily unavailable." });
  await recordCareerToolUse(user.id, access);
  return response.status(200).json({ ...result.data, provider: result.provider });
}
