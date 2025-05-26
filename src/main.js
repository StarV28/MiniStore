import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
import i18n from './plugins/i18n'
import vuetify from './plugins/vuetify'
import IconsComp from './components/IconsComp.vue'
import MainPage from './Layouts/MainPage.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(vuetify)

//------Global Components----//
app.component('IconsComp', IconsComp)
app.component('MainPage', MainPage)

app.mount('#app')
