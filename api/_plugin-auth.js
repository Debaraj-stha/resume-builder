/* global process */
const bearerToken = (request) => {
  const header = request.headers.authorization || request.headers.Authorization || "";
  return header.startsWith("Bearer ") ? header.slice(7).trim() : "";
};

export async function authenticatePluginRequest(request) {
  const token = bearerToken(request);
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!token || !supabaseUrl || !anonKey) return null;

  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: { Authorization: `Bearer ${token}`, apikey: anonKey },
  });
  if (!response.ok) return null;
  const user = await response.json();
  return user?.id ? { id: user.id, email: user.email || "" } : null;
}

export function requirePluginAuth(response) {
  const site = process.env.PUBLIC_SITE_URL || "https://resume-builder-murex-five.vercel.app";
  response.setHeader(
    "WWW-Authenticate",
    `Bearer resource_metadata="${site}/.well-known/oauth-protected-resource"`,
  );
  return response.status(401).json({ error: "Authentication required" });
}
