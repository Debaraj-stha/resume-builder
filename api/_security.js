import { createClient } from "@supabase/supabase-js";

const bearerToken = (request) => {
  const value = request.headers.authorization || "";
  return value.startsWith("Bearer ") ? value.slice(7).trim() : "";
};

export const secureJsonPost = (request, response, maxBytes = 64_000) => {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Content-Type-Options", "nosniff");
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    response.status(405).json({ error: "Method not allowed" });
    return false;
  }
  const length = Number(request.headers["content-length"] || 0);
  if (length > maxBytes) {
    response.status(413).json({ error: "Request is too large" });
    return false;
  }
  const origin = request.headers.origin;
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.host) {
        response.status(403).json({ error: "Origin not allowed" });
        return false;
      }
    } catch {
      response.status(403).json({ error: "Origin not allowed" });
      return false;
    }
  }
  return true;
};

export const requireUser = async (request, response) => {
  const token = bearerToken(request);
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  // Verifying a bearer token does not require elevated database privileges.
  // Prefer the service role when configured, otherwise use the same public anon
  // key that Supabase Auth supports in the browser.
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    response.status(503).json({ error: "Account verification is unavailable" });
    return null;
  }
  if (!token) {
    response.status(401).json({ error: "Please sign in to continue" });
    return null;
  }
  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await client.auth.getUser(token);
  if (error || !data?.user) {
    response.status(401).json({ error: "Your session is invalid or has expired" });
    return null;
  }
  return data.user;
};
