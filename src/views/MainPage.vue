<script setup>
import { ref, watch } from "vue"
import { useForecastStore } from "@/store/forecastStore.js"

import TabsForecast from "@/components/TabsForecast.vue"
import CardWeather from "@/components/CardWeather.vue"
import CardForecast from "@/components/CardForecast.vue"
import ChartForecast from "@/components/ChartForecast.vue"

const storeForecast = useForecastStore()
const tabList = ref(["One Day", "Three Days"])
const daysGraph = ref([])
const currentGraph = ref([])
const currentDay = ref([])
const threeDays = ref()

watch(() => storeForecast.forecastData, () => {
  console.log('Here Store Forecast: ', storeForecast.forecastData)
  if (storeForecast.forecastData) {
    currentDay.value = [storeForecast.forecastData.forecast.forecastday[0]]
    threeDays.value = storeForecast.forecastData.forecast.forecastday

    const allHours = threeDays.value.flatMap(day => day.hour);

    let filteredHours = allHours.filter(hour => new Date(hour.time).getHours() % 3 === 0);

    currentGraph.value = [currentDay.value];
    daysGraph.value = [filteredHours];
  }
})

</script>

<template>
  <div class="content">
    <section class="card-section">
      <h3 class="title">Weather Cards</h3>
      <CardWeather />
    </section>
    <section class="ticket-section" v-if="storeForecast.forecastData">
      <TabsForecast :tabList="tabList">
        <template #tab-1>
          <CardForecast :weather="currentDay" />
          <ChartForecast :weather="currentDay" />
        </template>
        <template #tab-2>
          <CardForecast :weather="threeDays" />
          <ChartForecast :graph="daysGraph" />
        </template>
      </TabsForecast>

    </section>
  </div>
</template>

<style></style>
