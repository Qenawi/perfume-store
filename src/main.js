import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import config from './config/site'
import './assets/styles/main.css'

document.title = config.siteTitle

createApp(App).use(router).mount('#app')
