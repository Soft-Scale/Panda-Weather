<script setup>
import { ref, watchEffect } from "vue"
import {roundTemperature} from '@/utils/index.js'

const prop = defineProps(["weather", "graph"])
const hours = ref([])
const temps = ref([])

const chartOptions = ref(null)
const series = ref(null)

const createForecast = () => {
  if (prop.weather) {
    hours.value = prop?.weather[0]?.hour?.map(data => data.time.substring(11, 16))
    temps.value = prop?.weather[0]?.hour?.map(data => roundTemperature(data.temp_c))
  }
  if(prop.graph){
    hours.value = prop?.graph[0]?.map(data => data.time.substring(11, 16))
    temps.value = prop?.graph[0]?.map(data => roundTemperature(data.temp_c))
  }

  chartOptions.value = {
    chart: {
      id: "chart",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        },
        autoSelected: "zoom"
      },
      zoom: {
        autoScaleYaxis: true
      }
    },
    xaxis: {
      name: "Graph",
      categories: hours.value,
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shade: "light"
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        dataLabels: {
          position: "top"
        },
        colors: {
          ranges: [{
            from: 0,
            to: 100,
            color: "#fcb831"
          }, {
            from: 0,
            to: -100,
            color: "#5fcdfe"
          }]
        },
        columnWidth: "80%"
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function(val) {
        return `${val}°\n`
      },
      offsetY: -10,
      style: {
        fontSize: "10px",
        colors: ["#1a3754"]
      }
    }

  }

  series.value = [
    {
      name: "Temp",
      data: temps.value
    }
  ]
}

watchEffect(() => createForecast())

</script>

<template>
  <div class="forecast">
    <apexchart id="chart" :options="chartOptions" :series="series" height="350" type="area"></apexchart>
  </div>
</template>
