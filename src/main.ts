import { createApp } from 'vue'
import Popup from './components/Popup.vue'
// import Login from './components/Login.vue'
import router from './router'
import './assets/main.css'
const app = createApp(Popup)
app.use(router)
app.mount('#app')
