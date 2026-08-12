import crypto from "node:crypto";

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const token = request.body?.token;
  if (!secret || !token) return response.status(200).json({ active: false });
  try {
    const [payload, signature] = token.split(".");
    const expected = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
    if (!signature || expected.length !== signature.length || !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return response.status(200).json({ active: false });
    const entitlement = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    const active = entitlement.userId === request.body?.userId && (!entitlement.expiresAt || entitlement.expiresAt > Math.floor(Date.now() / 1000));
    return response.status(200).json({ active, planId: entitlement.planId, expiresAt: entitlement.expiresAt });
  } catch {
    return response.status(200).json({ active: false });
  }
}
