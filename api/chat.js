// Servidor de Biela (asistente de BMCARE Motorsport) en Vercel.
// Activa la IA en Vercel → Settings → Environment Variables:  ANTHROPIC_API_KEY
// Opcional: ANTHROPIC_MODEL (por defecto claude-haiku-4-5)
// Sin la clave responde 503 y Biela deriva al cliente a WhatsApp.

const SISTEMA = "Eres Biela, la asistente IA de BMCARE Motorsport, taller independiente en Los Trabajadores 4454, Huechuraba, Santiago, que atiende todo tipo de vehículos y se especializa en alta gama europea y asiática. Horario: lunes a viernes 08:00-18:00 y sábado 09:00-13:00. WhatsApp +56 9 3036 9843. Conoces toda el área de mecánica automotriz y puedes mirar las fotos que adjunte el cliente. Responde en español de Chile, claro y breve (máximo 120 palabras). REGLAS OBLIGATORIAS: 1) Nunca des precios, rangos de precio ni costos estimados; si te los piden, explica que el presupuesto lo entrega el taller después de revisar el auto. 2) Nunca des un diagnóstico definitivo: habla de causas posibles y aclara que solo la revisión en el taller lo confirma. 3) Si aún no conoces la marca, el modelo, el año y el kilometraje del auto, pregúntalos antes de orientar (pide solo los que falten). 4) Si el síntoma implica riesgo (frenos, dirección, temperatura alta, humo, testigo rojo), dilo primero y recomienda no manejar. 5) Termina SIEMPRE ofreciendo pasar a WhatsApp con un especialista, con la ficha de la consulta ya armada. No uses emojis ni símbolos decorativos.";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(503).json({ error: "Biela sin configurar" });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  const raw = Array.isArray(body && body.messages) ? body.messages.slice(-12) : [];

  // Formato de Biela: { role, text, images?: [base64 jpeg] }
  let messages = raw
    .filter(m => m && (m.role === "user" || m.role === "assistant"))
    .map(m => {
      const text = String(m.text || m.content || "").slice(0, 2000);
      const fotos = m.role === "user" && Array.isArray(m.images) ? m.images.filter(x => typeof x === "string" && x.length < 1500000).slice(0, 3) : [];
      if (!fotos.length) return text.trim() ? { role: m.role, content: text } : null;
      const content = fotos.map(data => ({ type: "image", source: { type: "base64", media_type: "image/jpeg", data } }));
      content.push({ type: "text", text: text.trim() || "Revisa la foto adjunta." });
      return { role: m.role, content };
    })
    .filter(Boolean);
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length) return res.status(400).json({ error: "Mensaje vacío" });

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || "claude-haiku-4-5", max_tokens: 700, system: SISTEMA, messages })
    });
    const data = await r.json();
    if (!r.ok) { console.error("Anthropic error", r.status, data); return res.status(502).json({ error: "Error del proveedor de IA" }); }
    const text = (data.content || []).filter(c => c.type === "text").map(c => c.text).join("\n").trim();
    return res.status(200).json({ text });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Error interno" });
  }
}
