/* global process */
export default function handler(request, response) {
  const site = process.env.PUBLIC_SITE_URL || "https://resume-builder-murex-five.vercel.app";
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  if (!supabaseUrl) return response.status(503).json({ error: "OAuth metadata is not configured" });
  response.setHeader("Cache-Control", "public, max-age=3600");
  return response.status(200).json({
    resource: `${site}/api/mcp`,
    authorization_servers: [`${supabaseUrl}/auth/v1`],
    bearer_methods_supported: ["header"],
    scopes_supported: ["openid", "email", "profile"],
    resource_documentation: `${site}/chatgpt-integration`,
  });
}
