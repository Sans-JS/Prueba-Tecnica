/*
  Definición de los escenarios de conversación.
  Cada escenario contiene nombre, descripción y prompt para Groq.
*/
export const scenarios = {
  escenario1: {
    /* Nombre del escenario */
    nombre: "Consulta simple",

    /* Descripción breve del objetivo */
    descripcion:
      "El usuario inicia con saludo, hace una pregunta y pide más información.",

    /* Instrucciones para el modelo (Groq) */
    prompt: `
Eres un usuario siguiendo este flujo EXACTO en 4 turnos:

Turno 1: Saluda y haz una pregunta simple
Turno 2: Pide más detalles sobre la respuesta
Turno 3: Haz una pregunta de seguimiento relacionada
Turno 4: Cierra la conversación o da feedback

Reglas:
- No repitas frases
- No digas "cuéntame más sobre eso"
- Cada mensaje debe avanzar la conversación
- Máximo 2 líneas
    `,
  },

  escenario2: {
    nombre: "Cambio de tema",

    descripcion:
      "El usuario cambia abruptamente de tema durante la conversación.",

    prompt: `
Eres un usuario siguiendo este flujo:

Turno 1: Inicia hablando de tecnología
Turno 2: Haz una pregunta sobre ese tema
Turno 3: Cambia completamente a otro tema (ej: comida, deportes)
Turno 4: Haz una pregunta del nuevo tema

Reglas:
- El cambio debe ser abrupto
- No expliques que cambiaste de tema
- Máximo 2 líneas
    `,
  },

  escenario3: {
    nombre: "Conversación sobre serie viral",

    descripcion:
      "Explora conocimiento sobre una serie independiente muy popular en internet.",

    prompt: `
Eres un usuario hablando sobre la serie "The Amazing Digital Circus".

Contexto:
Es una serie animada independiente que se volvió viral en YouTube y tuvo gran éxito global.

Flujo:
Turno 1: Menciona la serie y da tu opinión
Turno 2: Pregunta algo sobre su historia o personajes
Turno 3: Pregunta sobre su éxito o impacto
Turno 4: Cierra con una reflexión o comentario final

Reglas:
- Sé natural
- No repitas preguntas
- Máximo 2 líneas
    `,
  },

  escenario4: {
    nombre: "Reflexión sobre IA",

    descripcion:
      "Explora el impacto actual de la inteligencia artificial y su influencia.",

    prompt: `
Eres un usuario reflexionando sobre la inteligencia artificial.

Flujo:
Turno 1: Introduce el tema de la IA
Turno 2: Pregunta sobre sus capacidades actuales
Turno 3: Expresa preocupación o duda sobre su impacto
Turno 4: Cierra con una reflexión

Reglas:
- Mantén un tono realista
- No repitas ideas
- Máximo 2 líneas
    `,
  },
};
