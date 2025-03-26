import inquirer from "inquirer";
// import colors from "colors";
// const inquirer = require("inquirer");
import * as colors from "colors";

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "Qué desea hacer?",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Buscar Ciudad`,
      },

      {
        value: 2,
        name: `${"2.".green} Historial`,
      },

      {
        value: 3,
        name: `${"3.".green} Salir`,
      },
    ],
  },
];

export const inquirerMenu = async () => {
  //console.clear();
  console.log("============================".green);
  console.log("Seleccione una opción".white);
  console.log("============================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

export const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"enter".green} para continuar`,
    },
  ];

  console.log("\n");

  await inquirer.prompt(question);
};

export const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Debe ingresar un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);

  return desc;
};

export const listarLugares = async (lugares = []) => {
  const choices = lugares.map((lugar, i) => {
    const idx = `${i + 1}.`;
    return {
      value: lugar.id,
      name: `${idx.green} ${lugar.nombre}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0".green + " Cancelar ",
  });
  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Seleccione lugar:",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);

  return id;
  // {
  //     value: tarea.id,
  //     name: `${'1.'.green} Crear tarea`
  // },
};

const confirmacion = async (message) => {
  const pregunta = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(pregunta);
  return ok;
};

const listadoTarreasCheck = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx.green} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione para completar",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);

  return ids;
};
// module.exports = {
//     inquirerMenu,
//     pausa,
//     leerInput,
//     listadoTarreasBorrar,
//     confirmacion,
//     listadoTarreasCheck
// }
