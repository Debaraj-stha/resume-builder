import { secureJsonPost, requireUser } from "./_security.js";
import { canUseCareerTool, recordCareerToolUse } from "./_freemium.js";
import { calculateReadiness, destinations, professions } from "../src/data/credentialReadiness.js";

export default async function handler(request, response) {
  if (!secureJsonPost(request, response, 20_000)) return;
  const user = await requireUser(request, response);
  if (!user) return;
  const { profession, destination, experienceYears, credentials } = request.body || {};
  if (!professions.includes(profession) || !destinations[destination] || !Array.isArray(credentials)) return response.status(400).json({ error: "Select a valid profession, destination and credential checklist." });
  const access = await canUseCareerTool(user.id, "credential_readiness");
  if (!access.allowed) return response.status(access.status).json({ error: access.error.replace("Career Copilot", "country-readiness"), code: access.code });
  const report = calculateReadiness({ profession, destination, experienceYears, credentials });
  const recorded = await recordCareerToolUse(user.id, access);
  if (!recorded) return response.status(503).json({ error: "Your report was prepared, but usage could not be recorded. Please try again." });
  return response.status(200).json({ ...report, premium: access.pro });
}
