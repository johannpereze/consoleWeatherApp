const { default: axios } = require("axios");

class Busquedas {
  historial = ["Bogotá", "Medellín", "Caldas"];

  constructor() {
    //TODO: leeer DB si existe
  }

  get paramsMapbox() {
    return {
      access_token:
        process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  async ciudad(lugar = "") {
    //peticion http
    // console.log(lugar);

    const instance = axios.create({
      baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
      params: this.paramsMapbox,
    });

    const resp = await instance.get();

    console.log(resp.data);

    return []; //retornar los lugares
  }
}

module.exports = Busquedas;
