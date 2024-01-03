<script setup>
import { ref, onMounted } from "vue"

import { roundTemperature, convertUnixToTime } from "@/utils/index.js"
import { useCurrentIp } from "@/composables/useCurrentIp"
import { useWeather } from "@/composables/useWeather"

import { useWeatherStore } from "@/store/weatherStore.js"
import { useForecastStore } from "@/store/forecastStore.js"

const { getCurrentIp } = useCurrentIp()
const { weatherList } = useWeather()

const weatherStore = useWeatherStore()
const forecastStore = useForecastStore()

const favoriteWeatherList = ref([])
const favoriteActiveStatus = ref([])
const favoriteWeather = ref(JSON.parse(localStorage.getItem("favoriteWeather")) || [])
const activeFavoriteButton = ref(JSON.parse(localStorage.getItem("activeFavoriteButton")) || [])
const activeCard = ref("")


const setActiveCard = (card, event) => {
  if (event.target.closest("button")) return

  activeCard.value !== card.id
    ? (activeCard.value = card.id)
    : (activeCard.value = "")
}
const removeCard = (city) => {
  swal({
    title: `Ви хочете видалити картку про ${city?.name}?`,
    text: `Картка містить інформацію про місто ${city?.name}`,
    icon: "warning",
    buttons: true,
    dangerMode: true
  })
    .then((willDelete) => {
      if (willDelete) {
        const cities = JSON.parse(localStorage.getItem("cityNames"))
        const favoriteIndex = favoriteWeatherList.value.findIndex((item) => item.id === city.id)
        weatherList.value = weatherList.value.filter(item => item.id !== city.id)

        const cityToRemove = cities.findIndex(item => {
          return item?.id === city?.id
        })

        cities.splice(cityToRemove, 1)

        localStorage.setItem("cityNames", JSON.stringify(cities))

        if (!cities.length) {
          localStorage.removeItem("cityNames")
        }

        forecastStore.updateForecast(city, city.id)

        if (favoriteIndex !== -1) {
          favoriteWeatherList.value.splice(favoriteIndex, 1)
          favoriteActiveStatus.value.splice(favoriteIndex, 1)
        }

        // Update localStorage for favoriteWeather and activeFavoriteButton
        if (!favoriteWeatherList.value.length || !favoriteActiveStatus.value.length) {
          localStorage.removeItem("favoriteWeather")
          localStorage.removeItem("activeFavoriteButton")
        } else {
          localStorage.setItem("activeFavoriteButton", JSON.stringify(favoriteActiveStatus.value))
          localStorage.setItem("favoriteWeather", JSON.stringify(favoriteWeatherList.value))
        }

        swal(`Поки! Картка міста ${city?.name} була видалена!`, {
          icon: "success"
        })
      }
    })
}

const handleCardClick = (city, event) => {
  if (!event.currentTarget.classList.contains("active") && !event.target.closest("button")) {
    forecastStore.updateForecast(city)
  }
}

const toggleCard = (city) => {
  const index = favoriteWeatherList.value.findIndex((item) => item.id === city.id)
  const buttonObj = {
    active: index,
    id: city.id
  }

  if (index === -1) {
    favoriteWeatherList.value.push(city)
    favoriteActiveStatus.value.push(buttonObj)
  } else {
    favoriteWeatherList.value.splice(index, 1)
    favoriteActiveStatus.value.splice(index, 1)
  }

  if (!favoriteWeatherList.value.length || !favoriteActiveStatus.value.length) {
    localStorage.removeItem("favoriteWeather")
    localStorage.removeItem("activeFavoriteButton")
  } else {
    localStorage.setItem("activeFavoriteButton", JSON.stringify(favoriteActiveStatus.value))
    localStorage.setItem("favoriteWeather", JSON.stringify(favoriteWeatherList.value))
  }
}

onMounted(async () => {
  const cityName = await getCurrentIp()
  const storage = JSON.parse(localStorage.getItem("cityNames"))

  if (cityName && !storage) await weatherStore.updateWeather(cityName)

  if (storage) {
    for (const item of storage) {
      await weatherStore.updateWeather(item.cityName)
    }
  }
  favoriteWeatherList.value = JSON.parse(localStorage.getItem("favoriteWeather")) || []
  favoriteActiveStatus.value = JSON.parse(localStorage.getItem("activeFavoriteButton")) || []
})

</script>
<template>
  <div class="cards" v-if="weatherList.length">
    <div
      v-for="(city) in weatherList"
      :key="city.id"
      :class="activeCard === city.id ? 'active' : ''"
      class="card"
      @click="[setActiveCard(city, $event), handleCardClick(city, $event)]"
    >
      <div class="card-full" v-show="activeCard === city.id">
        <header class="card-full--header">
          <h3 class="card-full--title">{{ city?.name }}</h3>
          <h4 class="card-full--time">
            {{ convertUnixToTime(city?.dt, city?.timezone) }}
          </h4>
        </header>
        <main class="card-full--main">
          <div class="card-full--view">
            <div class="card-full--temp">
              {{ roundTemperature(city?.main?.temp) }}&#176;C
            </div>
            <div class="card-full--icon">
              <img
                :src="`/icons/day/${city?.weather[0]?.main?.toLowerCase()}.svg`"
                alt=""
              />
            </div>
          </div>
          <div class="card-full--container">
            <div class="card-full--box">
              <div class="card-full--condition">
                <span class="icon icon-weather icon-temp"></span>
                RealFeel: <b>{{ city?.main?.feels_like }}&#176; C</b>
              </div>
              <div class="card-full--condition">
                <span class="icon icon-weather icon-humidity"></span>
                Humidity: <b> {{ city?.main?.humidity }} %</b>
              </div>
              <div class="card-full--condition">
                <span class="icon icon-weather icon-wind"></span>
                Wind: <b> {{ city?.wind?.speed }} m/s</b>
              </div>
            </div>
            <div class="card-full--box">
              <div class="card-full--condition" v-if="city?.main?.sea_level">
                <span class="icon icon-weather icon-sea-level"></span>
                See level: <b>{{ city?.main?.sea_level }}</b>
              </div>
              <div class="card-full--condition">
                <span class="icon icon-weather icon-pressure"></span>
                Pressure: <b>{{ city?.main?.pressure }} mb</b>
              </div>
              <div class="card-full--condition">
                <span class="icon icon-weather icon-cloud"></span>
                Cloud: <b>{{ city?.clouds?.all }}%</b>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div v-show="activeCard !== city.id" class="card-main">
        <button @click="removeCard(city)" class="card-btn card-btn--remove"><span
          class="material-icons">delete</span>
        </button>
        <button
          @click="toggleCard(city)"
          :class="{ active: favoriteActiveStatus.some(item => item.id === city.id) }"
          class="card-btn card-btn--favorite"
        >
          <span class="material-icons favorite-border">favorite_border</span>
          <span class="material-icons favorite-fill">favorite</span>
        </button>
        <div :style="`background-image: url('${city.thumbUrl}');`" class="card-image">
          <div class="card-time">
            {{ convertUnixToTime(city?.dt, city?.timezone) }}
          </div>
        </div>
        <div class="card-city">
          {{ city?.name }}
        </div>
      </div>
    </div>
  </div>
</template>
