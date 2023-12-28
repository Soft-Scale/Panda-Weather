<script setup>
import { ref } from "vue"

const weatherData = ref(JSON.parse(localStorage.getItem('favoriteWeather')) || [])
console.log(weatherData)
</script>

<template>
  <div class="favorite" v-if="weatherData">
    <div class="ticket" v-for="ticket of weatherData" :key="ticket.id">
      <h3 class="ticket-title">{{ ticket?.name }}</h3>

      <div class="ticket-table">
        <div class="ticket-row">
          <div class="ticket-col">
            <img class="ticket-icon"
                 :src="`/src/assets/icons/day/${ticket?.weather[0]?.main?.toLowerCase()}.svg`"
                 alt=""
            />
          </div>
          <div class="ticket-col">
            <div class="ticket-temp">
              {{ Math.round(ticket?.main?.temp) }}&#176;
            </div>
            <div>
              <div class="ticket-details ticket-pressure">
                <span class="icon icon-weather icon-humidity"></span>
                Humidity: <b class="ticket-value">{{ ticket?.main?.humidity }}%</b>
              </div>
              <div class="ticket-details ticket-wind">
                <span class="icon icon-weather icon-wind"></span>
                Wind: <b class="ticket-value">{{ ticket?.wind?.speed }} kp/h</b>
              </div>
            </div>
          </div>
        </div>
        <div class="ticket-row">
          <div class="ticket-col">
            <span class="icon icon-weather icon-sunrise"></span>
            <div class="ticket-details">
              <div>Sunrise:</div>
              <b>{{ ticket?.sys?.sunrise }}</b>
            </div>
          </div>
          <div class="ticket-col">
            <span class="icon icon-weather icon-uv"></span>
            <div class="ticket-details">
              <div>UV-index:</div> <b>{{ticket?.day?.uv}} of 11</b>
            </div>
          </div>
          <div class="ticket-col">
            <span class="icon icon-weather icon-temp-min"></span>
            <div class="ticket-details">
              <div>Min Temp:</div>
              <b>{{ ticket?.main?.temp_min }}&#176; C</b>
            </div>
          </div>
        </div>
        <div class="ticket-row">
          <div class="ticket-col">
            <span class="icon icon-weather icon-sunset"></span>
            <div class="ticket-details">
              <div>Sunset:</div>
              <b>{{ ticket?.sys?.sunset }}</b>
            </div>
          </div>
          <div class="ticket-col">
            <span class="icon icon-weather icon-clear-day"></span>
            <div class="ticket-details">
              <div>Visibility:</div>
              <b>{{ ticket?.visibility }} km</b>
            </div>
          </div>
          <div class="ticket-col">
            <span class="icon icon-weather icon-temp-max"></span>
            <div class="ticket-details">
              <div>Max Temp:</div>
              <b>{{ ticket?.main?.temp_max }}&#176; C</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
