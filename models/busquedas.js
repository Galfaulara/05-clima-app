import axios from "axios";

export class Busquedas {
  historial = ["Tegucigalpa, Madrid, San José, Bogotá"];
  constructor() {
    //Todo: Leer DB si existe
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
}
