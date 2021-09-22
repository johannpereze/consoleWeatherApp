require("dotenv").config();

const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  const busquedas = new Busquedas();
  let opt;

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const termino = await leerInput("Ciudad:");
        const lugares = await busquedas.ciudad(termino);
        const id = await listarLugares(lugares);

        if (id === '0') continue;

        const lugarSel = lugares.find((l) => l.id === id);
        //Guardar en DB
        busquedas.agregarHistorial(lugarSel.nombre)
        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

        console.clear();
        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad: ", lugarSel.nombre);
        console.log("Lat: ", lugarSel.lat);
        console.log("Lng: ", lugarSel.lng);
        console.log("Temperatura:", clima.temperatura, "°C");
        console.log("Mínima: ", clima.minima, "°C");
        console.log("Máxima: ", clima.maxima, "°C");
        console.log("Descripción: ", clima.clima);
        break;
      case 2:
        console.log();
        busquedas.historial.forEach((ciudad, i)=>{
          idx = `${i+1}`.green
          console.log(`${idx}. ${ciudad}`);
        })
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
