import { defineStore } from 'pinia';
import { useWeather } from '@/composables/useWeather.js';
const fetchWeather = useWeather();

export const useWeatherStore = defineStore('weather', {
  state() {
    return {
      weatherData: null,
    };
  },
  actions: {
    async updateWeather(cityName) {
      this.weatherData = await fetchWeather.getWeather(cityName)
    },
  },
});

