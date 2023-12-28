import { createApp } from "vue"
import { createPinia } from "pinia"
import "material-icons/iconfont/material-icons.css"
import "./styles/main.scss"
import router from "./routers/router"
import VueApexCharts from "vue3-apexcharts"


import App from "./App.vue"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueApexCharts)
app.mount("#app")
