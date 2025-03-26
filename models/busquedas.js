import axios from "axios";
import fs from "fs";

export class Busquedas {
  historial = [];
  dbPath = "./db/database.json";
  constructor() {
    //Todo: Leer DB si existe
    this.leerDB();
  }

  get historialCapitalizado() {
    return this.historial.map((lugar) => {
      let palabras = lugar.split(" ");
      palabras = palabras.map((p = p[0].toUppercase() + p.substring()));

      return palabras.join(" ");
    });
  }

  get paramsMapbox() {
    return {
      language: `es`,
      access_token: process.env.mapbox_key,
      limit: 5,
    };
  }

  get paramsWeather() {
    return {
      lang: `es`,
      appid: process.env.weathermap_key,
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

    //Retornar los lugares que coincidan con 'lugar'
  }

  async climaLugar(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
        params: this.paramsWeather,
      });

      const resp = await instance.get();
      return {
        // resp,
        desc: resp.data.weather[0].description,
        min: resp.data.main.temp_min,
        max: resp.data.main.temp_max,
        temp: resp.data.main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  agregarHistorial(lugar = "") {
    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return;
    }
    this.historial.unshift(lugar);

    this.guardarDB();
  }
  guardarDB() {
    const payload = {
      historial: this.historial,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB() {
    if (fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, { enconding: "utf-8" });

    const data = JSON.parse(info);

    this.historial = data.historial;
  }
}
