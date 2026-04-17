/* Endpoint de Groq */
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

/*
  Envía mensajes al modelo de Groq y devuelve la respuesta generada.
*/
export async function getGroqResponse(messages) {
  try {
    /* Petición POST al modelo */
    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages,
      }),
    });

    /* Validar respuesta HTTP */
    if (!response.ok) {
      throw new Error(`Groq Error: ${response.status}`);
    }

    /* Parsear respuesta */
    const data = await response.json();

    /* Extraer contenido generado */
    return data.choices[0].message.content;
  } catch (error) {
    /* Manejo de error */
    console.error("Error Groq:", error.message);
    return "Error generando respuesta";
  }
}
