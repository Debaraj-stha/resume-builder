import crypto from "node:crypto";

const accessSeconds = { monthly: 30 * 86400, annual: 365 * 86400, lifetime: null };
const encode = value => Buffer.from(JSON.stringify(value)).toString("base64url");
const sign = (value, secret) => crypto.createHmac("sha256", secret).update(value).digest("base64url");

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return response.status(503).json({ error: "Payment verification is not configured" });
  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature, planId, userId } = request.body || {};
  if (!orderId || !paymentId || !signature || !(planId in accessSeconds) || !/^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(userId || "")) return response.status(400).json({ error: "Incomplete payment verification data" });
  const expected = crypto.createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  const valid = expected.length === signature.length && crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  if (!valid) return response.status(401).json({ error: "Payment signature verification failed" });
  const now = Math.floor(Date.now() / 1000);
  const payload = encode({ planId, paymentId, userId, issuedAt: now, expiresAt: accessSeconds[planId] ? now + accessSeconds[planId] : null });
  return response.status(200).json({ token: `${payload}.${sign(payload, secret)}`, planId });
}
