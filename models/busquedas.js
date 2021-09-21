const { default: axios } = require("axios");


class Busquedas {

historial = ['Bogotá', 'Medellín', 'Caldas']

constructor(){
    //TODO: leeer DB si existe
}

async ciudad(lugar = ''){
    //peticion http
    // console.log(lugar);

    const resp = await axios.get('https://reqres.in/api/users?page=2')
    console.log(resp);
    

    
    return [];//retornar los lugares
}
}

module.exports = Busquedas;
