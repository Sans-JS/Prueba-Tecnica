import "dotenv/config";
import { runConversation } from "./core/conversationManager.js";

async function main() {
  const escenarios = ["escenario1", "escenario2", "escenario3", "escenario4"];

  for (const escenario of escenarios) {
    console.log(`\n--- Ejecutando ${escenario} ---`);
    await runConversation(escenario); // 👈 AQUÍ se pasa el parámetro
  }
}

main();
