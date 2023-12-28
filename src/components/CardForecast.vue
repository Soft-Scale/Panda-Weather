<script setup>
import {convertDateToFormatWithDay} from '@/utils/index.js'
const prop = defineProps(["weather"])
</script>

<template>
  <div class="title-box">
    <h3 class="title">{{ prop?.weather?.location?.name }}</h3>
  </div>


  <div v-if="prop.weather" class="ticket-container">
    <div
      v-for="(forecast) in prop.weather"
      :key="forecast"
      class="ticket"
    >
      <div class="ticket-box ticket-day">
        <div class="ticket-date">{{convertDateToFormatWithDay(forecast?.date)}}</div>
        <div class="ticket-table">
          <div class="ticket-row">
            <div class="ticket-col">
                <img class="ticket-icon"
                     :src="`/assets/icons/day/${forecast?.day?.condition?.text.toLowerCase()}.svg`"
                     alt=""
                />
            </div>
            <div class="ticket-col">
              <div class="ticket-temp">
                {{ Math.round(forecast?.day?.avgtemp_c) }}&#176;
              </div>
              <div>
                <div class="ticket-info ticket-pressure">
                  <span class="icon icon-weather icon-humidity"></span>
                  Humidity: <b class="ticket-value">{{ forecast?.day?.avghumidity }}%</b>
                </div>
                <div class="ticket-info ticket-wind">
                  <span class="icon icon-weather icon-wind"></span>
                  Wind: <b class="ticket-value">{{ forecast?.day?.maxwind_kph }} kp/h</b>
                </div>
              </div>
            </div>
          </div>
          <div class="ticket-row">
            <div class="ticket-col">
              <span class="icon icon-weather icon-sunrise"></span>
              <div class="ticket-details">
                <div>Sunrise:</div>
                <b>{{ forecast?.astro?.sunrise }}</b>
              </div>
            </div>
            <div class="ticket-col">
              <span class="icon icon-weather icon-uv"></span>
              <div class="ticket-details">
                <div>UV-index:</div> <b>{{forecast?.day?.uv}} of 11</b>
              </div>
            </div>
            <div class="ticket-col">
              <span class="icon icon-weather icon-temp-min"></span>
              <div class="ticket-details">
                <div>Min Temp:</div>
                <b>{{ forecast?.day?.mintemp_c }}&#176; C</b>
              </div>
            </div>
          </div>
          <div class="ticket-row">
            <div class="ticket-col">
              <span class="icon icon-weather icon-sunset"></span>
              <div class="ticket-details">
                <div>Sunset:</div>
                <b>{{ forecast?.astro?.sunset }}</b>
              </div>
            </div>
            <div class="ticket-col">
              <span class="icon icon-weather icon-clear-day"></span>
              <div class="ticket-details">
                <div>Visibility:</div>
                <b>{{ forecast?.day?.avgvis_km }} km</b>
              </div>
            </div>
            <div class="ticket-col">
              <span class="icon icon-weather icon-temp-max"></span>
              <div class="ticket-details">
                <div>Max Temp:</div>
                <b>{{ forecast?.day?.maxtemp_c }}&#176; C</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
