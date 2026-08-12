import { authenticatePluginRequest, requirePluginAuth } from "./_plugin-auth.js";
import { generatePluginDraft } from "./_plugin-ai.js";

const text = (description, minLength = 0, maxLength = 30000) => ({ type: "string", description, minLength, maxLength });
const common = {
  cv_text: text("Plain text extracted from the applicant's CV. Do not include patient data.", 120),
  profession: text("Healthcare profession, such as registered nurse or pharmacist.", 0, 100),
  target_role: text("Role the applicant is targeting.", 0, 150),
  target_country: text("Destination country or Global.", 0, 100),
};

const tools = [
  { name: "analyse_cv", title: "Analyse a healthcare CV", description: "Review an applicant-supplied healthcare CV for ATS readability, verified strengths, missing information, and safe improvements. Never invent credentials or clinical skills.", inputSchema: { type: "object", properties: common, required: ["cv_text"], additionalProperties: false } },
  { name: "match_job", title: "Match a healthcare CV to a job", description: "Compare confirmed healthcare CV facts against a supplied job description and distinguish matched, missing, and unverified requirements.", inputSchema: { type: "object", properties: { ...common, job_description: text("The vacancy supplied by the applicant.", 80, 15000) }, required: ["cv_text", "job_description"], additionalProperties: false } },
  { name: "generate_cover_letter", title: "Generate a healthcare cover letter", description: "Draft an editable job-specific healthcare cover letter using only applicant-confirmed facts.", inputSchema: { type: "object", properties: { ...common, job_description: text("Optional vacancy text.", 0, 15000) }, required: ["cv_text"], additionalProperties: false } },
  { name: "get_ats_report", title: "Create a healthcare ATS report", description: "Produce an explainable ATS and healthcare-readiness report covering readability, clinical relevance, credentials, impact, and completeness.", inputSchema: { type: "object", properties: { ...common, job_description: text("Optional vacancy text.", 0, 15000) }, required: ["cv_text"], additionalProperties: false } },
];

const tasks = {
  analyse_cv: "Analyse the CV. Return strengths, issues, missing information, and prioritized improvements.",
  match_job: "Compare the CV with the job. Return matched, missing, and unverified requirements plus truthful tailoring suggestions.",
  generate_cover_letter: "Write a concise healthcare cover letter using only confirmed facts.",
  get_ats_report: "Create an explainable ATS report. Do not present arbitrary scores; explain every finding and correction.",
};

const rpc = (response, id, result) => response.status(200).json({ jsonrpc: "2.0", id, result });
const rpcError = (response, id, code, message) => response.status(200).json({ jsonrpc: "2.0", id, error: { code, message } });
const validArguments = (name, args) => {
  if (!args || typeof args.cv_text !== "string" || args.cv_text.length < 120 || args.cv_text.length > 30000) return false;
  if (name === "match_job" && (typeof args.job_description !== "string" || args.job_description.length < 80)) return false;
  return !args.job_description || args.job_description.length <= 15000;
};

export default async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "https://chatgpt.com");
  response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, Mcp-Session-Id");
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  if (request.method === "OPTIONS") return response.status(204).end();
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });

  const user = await authenticatePluginRequest(request);
  if (!user) return requirePluginAuth(response);
  const { id = null, method, params = {} } = request.body || {};
  if (method === "initialize") return rpc(response, id, { protocolVersion: "2025-03-26", capabilities: { tools: { listChanged: false } }, serverInfo: { name: "ResuAIBuilder", version: "1.0.0" } });
  if (method === "notifications/initialized") return response.status(202).end();
  if (method === "ping") return rpc(response, id, {});
  if (method === "tools/list") return rpc(response, id, { tools });
  if (method !== "tools/call") return rpcError(response, id, -32601, "Method not found");

  const name = params.name;
  const args = params.arguments || {};
  if (!tasks[name]) return rpcError(response, id, -32602, "Unknown tool");
  if (!validArguments(name, args)) return rpcError(response, id, -32602, "Invalid or incomplete tool arguments");
  try {
    const draft = await generatePluginDraft(tasks[name], args);
    return rpc(response, id, { content: [{ type: "text", text: draft.content }], structuredContent: { provider: draft.provider, requiresVerification: true }, isError: false });
  } catch {
    return rpc(response, id, { content: [{ type: "text", text: "ResuAIBuilder AI assistance is temporarily unavailable. Please try again later." }], isError: true });
  }
}
