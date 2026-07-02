import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins once at app startup
gsap.registerPlugin(ScrollTrigger)

// Prevent browsers from restoring previous scroll position on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

const app = createApp(App)
app.use(router)
app.mount('#app')
