<script setup>
import SearchWeather from "@/components/SearchWeather.vue"
</script>

<template>
  <div class="container">
    <header class="header">
      <div class="logo">
        <span class="logo-icon"></span>
        <span class="logo-text">Panda Weather</span>
      </div>
      <div class="nav">
        <div class="nav-item">
          <router-link class="nav-link" to="/">
            <span class="icon icon-dashboard"></span><span class="nav-text">Home</span>
          </router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" to="/favorites">
            <span class="icon icon-favorites"></span><span class="nav-text">Favorites</span>
          </router-link>
        </div>
      </div>
      <SearchWeather />
    </header>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
