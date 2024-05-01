import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/index.css'
import App from './App.vue'
import router from './router'
import '@/http/axios/interceptors'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
