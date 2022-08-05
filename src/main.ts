import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
const app:any=createApp(App)
app.use(router)
app.mount('#app')


