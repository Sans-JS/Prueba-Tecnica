import fs from "fs";
import path from "path";

/*
  Guarda el resultado de un escenario en un archivo JSON.
*/
export function saveResultToFile(data, fileName) {
  /* Ruta de la carpeta output */
  const dir = path.resolve("output");

  /* Crear carpeta si no existe */
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  /* Construir ruta completa del archivo */
  const filePath = path.join(dir, `${fileName}.json`);

  /* Escribir archivo en formato JSON */
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
