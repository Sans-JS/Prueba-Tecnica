/* Endpoint de HuggingFace Router */
const API_URL = "https://router.huggingface.co/v1/chat/completions";

/*
  Envía el historial de conversación al modelo MiniMax
  y devuelve la respuesta generada.
*/
export async function getDialoGPTResponse(messages) {
  try {
    /* Petición POST al modelo */
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "MiniMaxAI/MiniMax-M2.7:novita",
        messages,
      }),
    });

    /* Validar respuesta HTTP */
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HF Error: ${response.status} - ${errorText}`);
    }

    /* Parsear respuesta */
    const data = await response.json();

    /* Extraer contenido generado */
    return data.choices?.[0]?.message?.content || "Sin respuesta";
  } catch (error) {
    /* Manejo de error */
    console.error("Error modelo:", error.message);
    return "No pude responder en este momento.";
  }
}
