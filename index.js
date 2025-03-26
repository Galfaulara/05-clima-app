import {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} from "./helpers/inquirer.js";
import { Busquedas } from "./models/busquedas.js";
import dotenv from "dotenv";

dotenv.config();

const main = async () => {
  const busquedas = new Busquedas();
  let opt = "";
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // Mostrar mensaje
        const termino = await leerInput("Ciudad: ");
        //Buscar los lugares
        const lugares = await busquedas.ciudad(termino);

        //Seleccionar el lugar
        const id = await listarLugares(lugares);
        if (id === "0") continue;

        //Guardar en db

        const lugarSel = lugares.find((l) => l.id === id);
        // console.log(lugarSel);

        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
        //Clima

        //Mostrar resultados
        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad:", lugarSel.nombre);
        console.log("Lat:", lugarSel.lat);
        console.log("Lng:", lugarSel.lng);
        console.log("Temperatura:", clima.temp);
        console.log("Mínima:", clima.min);
        console.log("Máxima:", clima.max);
        console.log("Descripción:", clima.desc);
        break;

      case 2:
        busquedas.historial.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx}${lugar}`);
        });
        break;
    }

    // guardarInfo(tareas.listadoArr);

    await pausa();
  } while (opt !== 3);
};

main();
