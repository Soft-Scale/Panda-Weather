import { ref } from "vue"

import { useUnsplash } from "@/composables/useUnsplash.js"
import { useModal } from "@/composables/useModal.js"

const { modal } = useModal()

const apiKey = "960f2e8c6b55c735ed5be8394fbe2054"
const cityNamesStorage = ref(JSON.parse(localStorage.getItem('cityNames')) || [])
const weatherList = ref( [])

export function useWeather() {
  const weatherData = ref(null);
  const weatherObject = ref({
    cityName: '',
    id: null
  })

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
      const city = data.name;

      const thumbUrl = await fetchImage(city);

      const cityNamesSet = new Set(
        weatherList.value.map((item) => item?.name)
      );


      if (!cityNamesSet.has(city)) {
        const localCityObject = { ...data, thumbUrl };
        weatherList.value.push(localCityObject);
      }

      if (!cityNamesStorage.value.some(item => item.cityName === data.name)) {
        weatherObject.value.cityName = data.name;
        weatherObject.value.id = data.id;

        cityNamesStorage.value.push({ ...weatherObject.value });

        localStorage.setItem("cityNames", JSON.stringify(cityNamesStorage.value));
      }


      if (weatherList.value.length > 5) {
        weatherList.value.splice(-1);
        modal({
          title: "Too many cards!",
          text: "Please delete one, then add a new one!",
          icon: "info"
        });
      }

    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  }

  return { weatherList, weatherData, cityNamesStorage, getWeather };
}

export default useWeather
