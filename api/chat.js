// Función serverless de Vercel: responde el chatbot del sitio usando la API de Anthropic.
// Configura en Vercel → Settings → Environment Variables:  ANTHROPIC_API_KEY
// Opcional: ANTHROPIC_MODEL (por defecto claude-haiku-4-5)

const SYSTEM = "Eres el asistente técnico de BMCARE Motorsport, taller especialista en autos de alta gama (BMW, Mercedes-Benz, Audi, Porsche, Volkswagen, Volvo, Land Rover, Lexus, Jaguar, Mini) ubicado en Los Trabajadores 4442, Recoleta, Santiago. Horario: lunes a viernes 08:00-18:00 y sábado 09:00-13:00. WhatsApp +56 9 3036 9843. Responde en español de Chile, claro y breve (máximo 120 palabras), con tono profesional y cercano. Da causas probables ordenadas de más a menos frecuente, la urgencia (puede esperar / revisar pronto / no manejar) y qué revisaría el taller. Nunca inventes precios exactos: da rangos aproximados solo si te los piden y aclara que se confirman tras el diagnóstico. Si el síntoma implica riesgo (frenos, dirección, temperatura, humo, testigo rojo), dilo primero. Cierra invitando a agendar por WhatsApp cuando corresponda. Responde solo temas del auto y del taller. No uses emojis, iconos decorativos ni símbolos gráficos: solo texto plano.";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(503).json({ error: "Chat sin configurar" });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  const raw = Array.isArray(body && body.messages) ? body.messages : [];

  // Limpieza: solo roles válidos, texto acotado, últimos 12 mensajes, empezando por "user"
  let messages = raw
    .filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .map(m => ({ role: m.role, content: m.content.slice(0, 2000) }))
    .slice(-12);
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length) return res.status(400).json({ error: "Mensaje vacío" });

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || "claude-haiku-4-5", max_tokens: 600, system: SYSTEM, messages })
    });
    const data = await r.json();
    if (!r.ok) { console.error("Anthropic error", r.status, data); return res.status(502).json({ error: "Error del proveedor de IA" }); }
    const reply = (data.content || []).filter(c => c.type === "text").map(c => c.text).join("\n").trim();
    return res.status(200).json({ reply });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Error interno" });
  }
}
