import { ref } from "vue"

import { useUnsplash } from "@/composables/useUnsplash.js"
import { useModal } from "@/composables/useModal.js"

const { modal } = useModal()

const apiKey = "960f2e8c6b55c735ed5be8394fbe2054"
const cityNamesStorage = ref(JSON.parse(localStorage.getItem('cityNames')) || [])
const weatherList = ref( [])

export function useWeather() {
  const weatherData = ref(null);

  async function fetchImage(cityName) {
    const { getImage } = useUnsplash();
    const imageData = await getImage(cityName);
    return imageData.results[0].urls.regular;
  }

  async function getWeather(cityName) {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      const thumbUrl = await fetchImage(data.name);
      const cityNamesSet = new Set(weatherList.value.map((item) => item?.name));

      if (!cityNamesSet.has(data.name)) {
        const localCityObject = { ...data, thumbUrl };
        weatherList.value.push(localCityObject);

        if (weatherList.value.length <= 5 && !cityNamesStorage.value.some(item => item.cityName === data.name)) {
          cityNamesStorage.value.push({ cityName: data.name, id: data.id });
          localStorage.setItem("cityNames", JSON.stringify(cityNamesStorage.value));
        }
      }

      if (weatherList.value.length > 5) {
        weatherList.value.splice(-1);
        modal("Too many cards!", "Please delete one, then add a new one!", "info");
      }

    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  }

  return { weatherList, weatherData, cityNamesStorage, getWeather };
}

export default useWeather
