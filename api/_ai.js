/* global process */
const clean = (value, max = 50000) => String(value || "").replace(/[<>]/g, "").slice(0, max);

const fetchWithTimeout = async (url, options, timeoutMs = 22000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try { return await fetch(url, { ...options, signal: controller.signal }); }
  finally { clearTimeout(timer); }
};
const providerError = async (provider, response) => {
  let code = "unknown";
  try { code = (await response.json())?.error?.code || "unknown"; } catch { /* provider returned no JSON */ }
  return new Error(`${provider} request failed (${response.status}, ${code})`);
};

const providers = {
  openai: async ({ system, prompt }) => {
    const key = process.env.OPENAI_API_KEY;
    if (!key) return null;
    const r = await fetchWithTimeout("https://api.openai.com/v1/chat/completions", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4.1-mini", temperature: 0.15, response_format: { type: "json_object" }, messages: [{ role: "system", content: system }, { role: "user", content: prompt }] }) });
    if (!r.ok) throw await providerError("OpenAI", r);
    const data = await r.json();
    return data.choices?.[0]?.message?.content || null;
  },
  groq: async ({ system, prompt }) => {
    const key = process.env.GROQ_API_KEY;
    if (!key) return null;
    const r = await fetchWithTimeout("https://api.groq.com/openai/v1/chat/completions", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: process.env.GROQ_MODEL || "openai/gpt-oss-20b", temperature: 0.15, response_format: { type: "json_object" }, messages: [{ role: "system", content: system }, { role: "user", content: prompt }] }) });
    if (!r.ok) throw await providerError("Groq", r);
    const data = await r.json();
    return data.choices?.[0]?.message?.content || null;
  },
};

export const runAI = async ({ system, prompt, validate = () => true }) => {
  const preferred = process.env.AI_PROVIDER?.toLowerCase();
  const order = preferred && providers[preferred] ? [preferred, ...Object.keys(providers).filter((name) => name !== preferred)] : ["openai", "groq"];
  for (const name of order) {
    try {
      const raw = await providers[name]({ system, prompt: clean(prompt) });
      if (raw) {
        const data = JSON.parse(raw);
        if (!validate(data)) throw new Error("AI response did not match the expected format");
        return { data, provider: name };
      }
    } catch (error) {
      console.error(`AI provider ${name} failed`, error instanceof Error ? error.message : "Unknown error");
    }
  }
  return null;
};

export { clean };
