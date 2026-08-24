/* global process */
import { createClient } from "@supabase/supabase-js";
import { isTestingAccessEnabled } from "./_testing-access.js";

const adminClient = () => {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } }) : null;
};

export async function canUseCareerTool(userId, feature) {
  if (isTestingAccessEnabled()) return { allowed: true, pro: true, testing: true };
  const admin = adminClient();
  if (!admin) return { allowed: false, status: 503, error: "Free usage verification is not configured" };
  const { data: plans } = await admin.from("subscription_records").select("plan_id,expires_at").eq("owner_id", userId).in("status", ["active", "paid"]).order("created_at", { ascending: false }).limit(1);
  const plan = plans?.[0];
  if (plan && (!plan.expires_at || new Date(plan.expires_at) > new Date())) return { allowed: true, pro: true, admin };
  const { data, error } = await admin.auth.admin.getUserById(userId);
  if (error || !data?.user) return { allowed: false, status: 503, error: "Usage verification is temporarily unavailable" };
  const key = `resuai_free_${feature}_used_at`;
  if (data.user.app_metadata?.[key]) return { allowed: false, status: 402, error: "Your free Career Copilot result has been used. Upgrade to Pro for continued access.", code: "FREE_LIMIT" };
  return { allowed: true, pro: false, admin, metadata: data.user.app_metadata || {}, key };
}

export async function recordCareerToolUse(userId, access) {
  if (access.pro || access.testing) return true;
  const { error } = await access.admin.auth.admin.updateUserById(userId, { app_metadata: { ...access.metadata, [access.key]: new Date().toISOString() } });
  return !error;
}
