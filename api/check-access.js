import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { requireUser, secureJsonPost } from "./_security.js";

export default async function handler(request, response) {
  if (!secureJsonPost(request, response, 16_000)) return;
  const user = await requireUser(request, response);
  if (!user) return;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const token = request.body?.token;
  const dbUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (dbUrl && serviceKey) {
    const admin = createClient(dbUrl, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data } = await admin.from("subscription_records").select("plan_id,expires_at").eq("owner_id", user.id).in("status", ["active", "paid"]).order("created_at", { ascending: false }).limit(1);
    const entitlement = data?.[0];
    if (entitlement && (!entitlement.expires_at || new Date(entitlement.expires_at) > new Date())) {
      return response.status(200).json({ active: true, planId: entitlement.plan_id, expiresAt: entitlement.expires_at, source: "account" });
    }
  }
  if (!secret || !token) return response.status(200).json({ active: false });
  try {
    const [payload, signature] = token.split(".");
    const expected = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
    if (!signature || expected.length !== signature.length || !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return response.status(200).json({ active: false });
    const entitlement = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    const active = entitlement.userId === user.id && (!entitlement.expiresAt || entitlement.expiresAt > Math.floor(Date.now() / 1000));
    return response.status(200).json({ active, planId: entitlement.planId, expiresAt: entitlement.expiresAt });
  } catch {
    return response.status(200).json({ active: false });
  }
}
