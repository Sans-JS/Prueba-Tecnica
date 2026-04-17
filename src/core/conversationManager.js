import { evaluateConversation } from "../services/evaluationService.js";
import { getDialoGPTResponse } from "../services/dialogptService.js";
import { getGroqResponse } from "../services/groqService.js";
import { saveResultToFile } from "../services/fileService.js";
import { scenarios } from "./scenarios.js";

/* Recorta respuestas largas a máximo 2 líneas y 200 caracteres */
function trimResponse(text) {
  if (!text) return "";
  return text.split("\n").slice(0, 2).join(" ").slice(0, 200);
}

/*
  Ejecuta una conversación completa de 4 turnos para un escenario dado.
  Simula usuario (Groq), chatbot (MiniMax), evalúa y guarda resultado.
*/
export async function runConversation(scenarioKey) {
  /* Obtener escenario */
  const scenario = scenarios[scenarioKey];

  /* Validar escenario */
  if (!scenario) {
    throw new Error(`Escenario no válido: ${scenarioKey}`);
  }

  let turnos = [];

  /* Historial para Groq (usuario simulado) */
  let groqMessages = [
    {
      role: "system",
      content: scenario.prompt,
    },
  ];

  /* Historial para el chatbot */
  let chatHistory = [
    {
      role: "system",
      content: `
Eres un chatbot útil.

Reglas:
- Responde en máximo 2 líneas
- Sé directo
- No des listas largas
- No des explicaciones extensas
`,
    },
  ];

  /* Loop de 4 turnos */
  for (let i = 0; i < 4; i++) {
    /* Indicar turno actual a Groq */
    groqMessages.push({
      role: "system",
      content: `Estás en el turno ${i + 1}. Sigue el flujo indicado del escenario.`,
    });

    /* Generar mensaje del usuario */
    let userMessage = await getGroqResponse(groqMessages);

    /* Fallback si la respuesta es inválida */
    if (
      !userMessage ||
      userMessage.trim().length < 5 ||
      userMessage.toLowerCase().includes("cuéntame más")
    ) {
      const fallback = [
        "Hola, ¿puedes explicarme esto?",
        "No me queda claro, ¿puedes dar más detalles?",
        "¿Y eso cómo funciona en la práctica?",
        "Gracias, ahora lo entiendo mejor.",
      ];
      userMessage = fallback[i];
    }

    /* Recortar mensaje */
    userMessage = trimResponse(userMessage);

    /* Guardar turno del usuario */
    turnos.push({ rol: "groq", mensaje: userMessage });

    /* Agregar mensaje al historial del chatbot */
    chatHistory.push({
      role: "user",
      content: userMessage,
    });

    /* Obtener respuesta del chatbot */
    let botResponse = await getDialoGPTResponse(chatHistory);

    /* Recortar respuesta */
    botResponse = trimResponse(botResponse);

    /* Guardar turno del chatbot */
    turnos.push({ rol: "dialogpt", mensaje: botResponse });

    /* Guardar respuesta en historial */
    chatHistory.push({
      role: "assistant",
      content: botResponse,
    });

    /* Actualizar contexto para Groq */
    groqMessages.push({
      role: "user",
      content: userMessage,
    });

    groqMessages.push({
      role: "assistant",
      content: botResponse,
    });
  }

  /* Evaluar conversación */
  const evaluation = await evaluateConversation(turnos, scenario.nombre);

  /* Construir resultado final */
  const result = {
    escenario: scenario.nombre,
    turnos,
    veredicto: evaluation.veredicto,
    analisis: evaluation.analisis,
  };

  /* Guardar resultado en archivo */
  saveResultToFile(result, scenarioKey);

  console.log(`\n--- ${scenario.nombre} ---`);
  console.log("Conversación:", turnos);
  console.log("Resultado:", result);

  return result;
}