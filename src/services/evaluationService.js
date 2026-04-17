import { getGroqResponse } from "./groqService.js";

/*
  Evalúa la conversación usando Groq como evaluador.
  Recibe los turnos y devuelve veredicto + análisis.
*/
export async function evaluateConversation(turnos, escenarioNombre) {
  /* Convertir la conversación a texto plano */
  const conversationText = turnos
    .map((t) => `${t.rol.toUpperCase()}: ${t.mensaje}`)
    .join("\n");

  /* Prompt con instrucciones y formato esperado */
  const prompt = `
Analiza la siguiente conversación entre un usuario (groq) y un chatbot (dialogpt).

Conversación:
${conversationText}

Responde SOLO en formato JSON válido:

{
  "veredicto": "PASS | FAIL | PARCIAL",
  "analisis": "explicación breve"
}

Criterios:
- ¿El chatbot entendió los mensajes?
- ¿Las respuestas fueron coherentes?
- ¿La conversación tuvo sentido?
`;

  /* Estructura de mensajes para Groq */
  const messages = [
    {
      role: "system",
      content: "Eres un evaluador de calidad de conversaciones.",
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  try {
    /* Llamada al modelo */
    const response = await getGroqResponse(messages);

    /* Limpiar formato en caso de que venga con ```json */
    const clean = response.replace(/```json|```/g, "").trim();

    /* Convertir respuesta a JSON */
    const parsed = JSON.parse(clean);

    return parsed;
  } catch (error) {
    /* Manejo de error si falla el parseo o la API */
    console.error("Error evaluando:", error.message);

    return {
      veredicto: "PARCIAL",
      analisis: "No se pudo evaluar correctamente la conversación.",
    };
  }
}