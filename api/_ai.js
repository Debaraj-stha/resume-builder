const clean = (value, max = 50000) => String(value || "").replace(/[<>]/g, "").slice(0, max);

const providers = {
  openai: async ({ system, prompt }) => {
    const key = process.env.OPENAI_API_KEY;
    if (!key) return null;
    const r = await fetch("https://api.openai.com/v1/chat/completions", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4.1-mini", temperature: 0.15, response_format: { type: "json_object" }, messages: [{ role: "system", content: system }, { role: "user", content: prompt }] }) });
    if (!r.ok) throw new Error("OpenAI request failed");
    const data = await r.json();
    return data.choices?.[0]?.message?.content || null;
  },
  groq: async ({ system, prompt }) => {
    const key = process.env.GROQ_API_KEY;
    if (!key) return null;
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile", temperature: 0.15, response_format: { type: "json_object" }, messages: [{ role: "system", content: system }, { role: "user", content: prompt }] }) });
    if (!r.ok) throw new Error("Groq request failed");
    const data = await r.json();
    return data.choices?.[0]?.message?.content || null;
  },
};

export const runAI = async ({ system, prompt }) => {
  const preferred = process.env.AI_PROVIDER?.toLowerCase();
  const order = preferred && providers[preferred] ? [preferred, ...Object.keys(providers).filter((name) => name !== preferred)] : ["openai", "groq"];
  for (const name of order) {
    try {
      const raw = await providers[name]({ system, prompt: clean(prompt) });
      if (raw) return { data: JSON.parse(raw), provider: name };
    } catch (error) {
      console.error(`AI provider ${name} failed`, error instanceof Error ? error.message : "Unknown error");
    }
  }
  return null;
};

export { clean };
