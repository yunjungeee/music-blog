import { createApp } from 'vue'
import { createBootstrap } from 'bootstrap-vue-next'
import App from './App.vue'
import router from './router'

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)
app.use(router)
app.use(createBootstrap())
app.mount('#app')



