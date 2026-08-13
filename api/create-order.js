const plans = {
  monthly: { amount: 19900, label: "Healthcare ResuAIBuilder Monthly Pro" },
  annual: { amount: 99900, label: "Healthcare ResuAIBuilder Annual Pro" },
  lifetime: { amount: 249900, label: "Healthcare ResuAIBuilder Lifetime Pro" },
};
import { requireUser, secureJsonPost } from "./_security.js";

export default async function handler(request, response) {
  if (!secureJsonPost(request, response, 8_000)) return;
  const user = await requireUser(request, response);
  if (!user) return;
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return response.status(503).json({ error: "Payments are being configured. Please try again shortly." });
  const plan = plans[request.body?.planId];
  if (!plan) return response.status(400).json({ error: "Invalid plan" });
  try {
    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: { "Authorization": `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`, "Content-Type": "application/json" },
      body: JSON.stringify({ amount: plan.amount, currency: "INR", receipt: `hrai_${Date.now()}`, notes: { planId: request.body.planId, ownerId: user.id, product: "Healthcare ResuAIBuilder" } }),
    });
    const order = await razorpayResponse.json();
    if (!razorpayResponse.ok) return response.status(502).json({ error: order?.error?.description || "Could not create payment order" });
    return response.status(200).json({ keyId, orderId: order.id, amount: order.amount, currency: order.currency, label: plan.label, planId: request.body.planId });
  } catch {
    return response.status(500).json({ error: "Payment service is temporarily unavailable" });
  }
}
