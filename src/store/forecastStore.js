import { defineStore } from "pinia"
import { useForecast } from "@/composables/useForecast.js"
const api = useForecast();

export const useForecastStore = defineStore('forecast', {
  state: () => {
    return {
      forecastData: null,
    }
  },
  actions: {
    async updateForecast(city, id = '') {
      this.forecastData = !id ? await api.getForecast(city?.name) : '';
    },
  },
})
