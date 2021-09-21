const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  const busquedas = new Busquedas();
  let opt;

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        
      const lugar = await leerInput('Ciudad:')
      await busquedas.ciudad(lugar)
      
      


        console.log('\nInformación de la ciudad\n'.green);
        console.log('Ciudad: ',);
        console.log('Lat: ',);
        console.log('Lng: ',);
        console.log('Temperatura: ',);
        console.log('Mínima: ',);
        console.log('Máxima: ',);
        break;
      case 2:
        //algo
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
