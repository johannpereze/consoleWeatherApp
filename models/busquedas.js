const fs = require("fs");

const { default: axios } = require("axios");

class Busquedas {
  historial = [];
  dbPath = "./db/database.json";
  constructor() {}

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  get paramsOpenWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      lang: "es",
      units: "metric",
    };
  }

  async ciudad(lugar = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();

      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`, //sin https:// no funciona
        params: { ...this.paramsOpenWeather, lat, lon },
      });

      const resp = await instance.get();
      //   console.log(resp.data);
      const { main, weather } = resp.data;
      return {
        temperatura: main.temp,
        minima: main.temp_min,
        maxima: main.temp_max,
        clima: weather[0].description,
      };
    } catch (error) {
      console.log(error);
    }
  }

  agregarHistorial(lugar = "") {
    if (!this.historial.includes(lugar)) {
      this.historial.unshift(lugar);
    }
    this.guardarDB();
  }

  guardarDB() {
    fs.writeFileSync(this.dbPath, JSON.stringify(this.historial));
  }

  leerDB() {}
}

module.exports = Busquedas;
