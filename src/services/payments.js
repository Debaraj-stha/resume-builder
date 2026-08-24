import supabase from "../../supabaseClient";

const ACCESS_KEY = "resuaibuilder_access";

const loadRazorpay = () => new Promise(resolve => {
  if (window.Razorpay) return resolve(true);
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.onload = () => resolve(true);
  script.onerror = () => resolve(false);
  document.body.appendChild(script);
});

const requestJson = async (url, body) => {
  const { data: sessionData } = await supabase.auth.getSession();
  const accessToken = sessionData?.session?.access_token;
  if (!accessToken) throw new Error("Please sign in to continue");
  const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` }, body: JSON.stringify(body) });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Payment request failed");
  return data;
};

export async function startPayment(planId, onSuccess) {
  if (!(await loadRazorpay())) throw new Error("Secure checkout could not be loaded. Please check your connection.");
  const order = await requestJson("/api/create-order", { planId });
  return new Promise((resolve, reject) => {
    const checkout = new window.Razorpay({
      key: order.keyId, amount: order.amount, currency: order.currency, order_id: order.orderId,
      name: "Healthcare ResuAIBuilder", description: order.label,
      theme: { color: "#0f766e" },
      handler: async payment => {
        try {
          const verified = await requestJson("/api/verify-payment", payment);
          localStorage.setItem(ACCESS_KEY, verified.token);
          await onSuccess?.(verified);
          resolve(verified);
        } catch (error) { reject(error); }
      },
      modal: { ondismiss: () => resolve(null) },
    });
    checkout.on("payment.failed", event => reject(new Error(event.error?.description || "Payment failed")));
    checkout.open();
  });
}

export async function hasDownloadAccess() {
  const token = localStorage.getItem(ACCESS_KEY);
  try {
    const result = await requestJson("/api/check-access", { token });
    if (!result.active) localStorage.removeItem(ACCESS_KEY);
    return result.active;
  } catch { return false; }
}

export async function claimFreeDownload() {
  return requestJson("/api/claim-free-download", {});
}
