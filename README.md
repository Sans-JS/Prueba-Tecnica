# Prueba-Tecnica
Evaluación QA – Integración y análisis de chatbot 📌 Descripción General

Este proyecto simula una conversación entre un usuario y un chatbot utilizando dos modelos de inteligencia artificial:

Groq (LLaMA 3.1 8B) → Simula el comportamiento de un usuario real
MiniMax (HuggingFace) → Actúa como el chatbot
El sistema:

Genera una conversación de 4 turnos
Mantiene el contexto completo en cada interacción
Evalúa la calidad de la conversación
Exporta los resultados en formato JSON
🎯 Objetivo
Evaluar la capacidad de:

Integrar APIs externas
Simular interacciones con un chatbot
Mantener el contexto conversacional
Analizar la calidad de respuestas
🧠 Arquitectura
Groq (Usuario simulado) ↓ Conversation Manager ↓ MiniMax (Chatbot) ↓ Evaluación (Groq) ↓ Archivo JSON

⚙️ Tecnologías utilizadas
Node.js
API de Groq (llama-3.1-8b-instant)
HuggingFace Router (MiniMax-M2.7)
Fetch API
File System (fs)
📁 Estructura del proyecto
src/ ├── core/ │ ├── conversationManager.js │ ├── scenarios.js │ ├── services/ │ ├── groqService.js │ ├── dialogptService.js │ ├── evaluationService.js │ ├── fileService.js │ ├── index.js

output/ ├── escenario1.json ├── escenario2.json ├── escenario3.json ├── escenario4.json

🚀 Instalación
git clone cd npm install

🔐 Variables de entorno
Crear un archivo .env:

GROQ_API_KEY=tu_api_key_de_groq HUGGINGFACE_API_KEY=tu_token_de_huggingface

▶️ Ejecución
npm start

🧪 Escenarios evaluados
1. Consulta simple
El usuario inicia con un saludo, realiza una pregunta y solicita más información.

2. Cambio de tema
El usuario comienza con un tema y cambia abruptamente a otro durante la conversación.

3. Serie viral – The Amazing Digital Circus
Se eligió este escenario porque es una serie independiente que logró gran impacto global a través de YouTube, demostrando cómo contenido digital puede escalar masivamente.

4. Reflexión sobre inteligencia artificial
Se eligió este escenario debido a la relevancia actual de la IA, su impacto en la información y la necesidad de un análisis crítico sobre su uso.

📊 Formato de salida
Cada escenario genera un archivo JSON:

{ "escenario": "Consulta simple", "turnos": [ { "rol": "groq", "mensaje": "..." }, { "rol": "dialogpt", "mensaje": "..." } ], "veredicto": "PASS", "analisis": "El chatbot respondió de forma coherente..." }

🧠 Criterios de evaluación
Se analiza:

✅ Comprensión del mensaje
✅ Coherencia de las respuestas
✅ Continuidad de la conversación
Resultado final:

PASS
FAIL
PARCIAL
💡 Características clave
Mantiene el contexto completo en cada turno
Simulación realista de usuario mediante IA
Evaluación automática de calidad
Exportación estructurada en JSON
Manejo de errores y respuestas fallback
Control de longitud en respuestas (máx. 2 líneas)
🧪 Decisiones técnicas
Separación de responsabilidades: cada servicio cumple una función específica
Uso de dos modelos: uno para simular usuario y otro como chatbot
Control por escenarios: permite pruebas reproducibles y medibles
Limitación de respuestas: mejora la claridad y evita ruido innecesario
📌 Notas

DialoGPT fue reemplazado debido a problemas de disponibilidad
Se utilizó MiniMax como alternativa compatible
Todas las conversaciones tienen exactamente 4 turnos (según requerimiento)
👨‍💻 Autor

Irvin Alberto Moreno Cruz Ing. En Desarrollo y Gestión de Software
📬 Contacto

Disponible para cualquier duda o aclaración. Num. de Contacto: 56-3287-4098 Correo: irvincruz0304@gmail.com
