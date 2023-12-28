<script setup>
import { ref, watch } from "vue"
import { useWeather } from "@/composables/useWeather.js"

const { getWeather } = useWeather()

const searchCityField = ref(null)
let autocompleteList = ref(null)
const mapboxToken = "pk.eyJ1IjoiaXQtZm9yZXN0IiwiYSI6ImNsbmEwaTJ4ZjBheWgycXA1NzhmdWdqYzUifQ.AZmdv6-0muODdZoCaams_A"

const getLocation = async (city) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?types=place&language=en&autocomplete=true&access_token=${mapboxToken}`,
      {
        method: "GET"
      }
    )

    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`)
    }

    const data = await response.json()
    autocompleteList.value = data.features
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}

const handleSelectedCity = async (selectedCity) => {

  await getWeather(selectedCity.place_name, true)

  searchCityField.value = ""
  autocompleteList.value = null
}

watch(searchCityField, () => {
  getLocation(searchCityField.value)
})
</script>

<template>
  <div class="search">
    <label class="search-label">
      <input
        v-model="searchCityField"
        class="search-input bd-radius"
        placeholder="Find places"
        type="text"
      />
      <span class="material-icons search-icon">search</span>
    </label>
    <div v-show="autocompleteList?.length" class="search-dropdown">
      <div
        v-for="city in autocompleteList"
        :key="city.place_name"
        class="search-dropdown-item"
        @click="handleSelectedCity(city)"
      >
        {{ city.place_name }}
      </div>
    </div>
  </div>
</template>
