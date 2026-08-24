/* global process */
import { createClient } from "@supabase/supabase-js";
import { requireUser, secureJsonPost } from "./_security.js";
import { isTestingAccessEnabled } from "./_testing-access.js";

export default async function handler(request, response) {
  if (!secureJsonPost(request, response, 8_000)) return;
  const user = await requireUser(request, response);
  if (!user) return;

  if (isTestingAccessEnabled()) {
    return response.status(200).json({ granted: true, access: "testing" });
  }

  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return response.status(503).json({ error: "Free download verification is not configured" });
  }

  const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: subscriptions } = await admin.from("subscription_records").select("plan_id,expires_at").eq("owner_id", user.id).in("status", ["active", "paid"]).order("created_at", { ascending: false }).limit(1);
  const subscription = subscriptions?.[0];
  if (subscription && (!subscription.expires_at || new Date(subscription.expires_at) > new Date())) {
    return response.status(200).json({ granted: true, access: "paid", planId: subscription.plan_id });
  }
  const { data, error } = await admin.auth.admin.getUserById(user.id);
  if (error || !data?.user) {
    console.error("Free download lookup failed", error?.message);
    return response.status(503).json({ error: "Free download verification is temporarily unavailable" });
  }

  const metadata = data.user.app_metadata || {};
  if (metadata.resuai_free_cv_download_used_at) {
    return response.status(200).json({ granted: false, reason: "free_download_used" });
  }

  const { error: updateError } = await admin.auth.admin.updateUserById(user.id, {
    app_metadata: { ...metadata, resuai_free_cv_download_used_at: new Date().toISOString() },
  });
  if (updateError) {
    console.error("Free download claim failed", updateError.message);
    return response.status(503).json({ error: "Free download verification is temporarily unavailable" });
  }

  return response.status(200).json({ granted: true, access: "free" });
}
