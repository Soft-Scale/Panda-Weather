<script setup>
import CardFavorite from "@/components/CardFavorite.vue"
import { ref } from "vue"

const weatherData = ref(JSON.parse(localStorage.getItem('favoriteWeather')) || [])
</script>

<template>
  <div class="content" v-if="weatherData.length">
    <h3 class="title">Favorite Cards</h3>
    <CardFavorite />
  </div>
  <div class="content-not" v-else>
    You can add a new city to the favorites page from the main page
  </div>
</template>

<style scoped>

</style>
