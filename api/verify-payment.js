/* global process, Buffer */
import crypto from "node:crypto";
import { requireUser, secureJsonPost } from "./_security.js";
import { createClient } from "@supabase/supabase-js";

const accessSeconds = { monthly: 30 * 86400, annual: 365 * 86400, lifetime: null, career_early: 60 * 86400, career_experienced: 180 * 86400, career_leadership: 365 * 86400 };
const planAmounts = { monthly: 19900, annual: 99900, lifetime: 249900, career_early: 39900, career_experienced: 69900, career_leadership: 99900 };
const recordPlan = { career_early: "monthly", career_experienced: "annual", career_leadership: "annual" };
const encode = value => Buffer.from(JSON.stringify(value)).toString("base64url");
const sign = (value, secret) => crypto.createHmac("sha256", secret).update(value).digest("base64url");

export default async function handler(request, response) {
  if (!secureJsonPost(request, response, 12_000)) return;
  const user = await requireUser(request, response);
  if (!user) return;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const keyId = process.env.RAZORPAY_KEY_ID;
  if (!secret || !keyId) return response.status(503).json({ error: "Payment verification is not configured" });
  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = request.body || {};
  if (!orderId || !paymentId || !signature) return response.status(400).json({ error: "Incomplete payment verification data" });
  const expected = crypto.createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  const valid = expected.length === signature.length && crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  if (!valid) return response.status(401).json({ error: "Payment signature verification failed" });
  const auth = `Basic ${Buffer.from(`${keyId}:${secret}`).toString("base64")}`;
  const [orderResponse, paymentResponse] = await Promise.all([
    fetch(`https://api.razorpay.com/v1/orders/${encodeURIComponent(orderId)}`, { headers: { Authorization: auth } }),
    fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`, { headers: { Authorization: auth } }),
  ]);
  if (!orderResponse.ok || !paymentResponse.ok) return response.status(502).json({ error: "Could not confirm payment with Razorpay" });
  const [order, payment] = await Promise.all([orderResponse.json(), paymentResponse.json()]);
  const planId = order.notes?.planId;
  const matches = planId in accessSeconds && order.notes?.ownerId === user.id && payment.order_id === orderId && payment.status === "captured" && order.amount === planAmounts[planId] && payment.amount === planAmounts[planId] && order.currency === "INR" && payment.currency === "INR";
  if (!matches) return response.status(401).json({ error: "Payment details do not match this account and plan" });
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = accessSeconds[planId] ? now + accessSeconds[planId] : null;
  const dbUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (dbUrl && serviceKey) {
    const admin = createClient(dbUrl, serviceKey, { auth: { persistSession: false } });
    const { error: recordError } = await admin.from("subscription_records").upsert({ owner_id: user.id, provider_event_id: `verified_${paymentId}`, provider_payment_id: paymentId, provider_order_id: orderId, plan_id: recordPlan[planId] || planId, status: "active", starts_at: new Date(now * 1000).toISOString(), expires_at: expiresAt ? new Date(expiresAt * 1000).toISOString() : null, amount_minor: payment.amount, currency: payment.currency }, { onConflict: "provider_event_id" });
    if (recordError) console.error("Verified entitlement record failed", recordError.message);
  }
  const payload = encode({ planId, paymentId, userId: user.id, issuedAt: now, expiresAt });
  return response.status(200).json({ token: `${payload}.${sign(payload, secret)}`, planId });
}
