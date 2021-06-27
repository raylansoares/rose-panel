import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AxiosClient from './repositories/clients/axios'
import VueSocketIO from 'vue-socket.io'

import { ColorPicker, Slider } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/pt-br'
import locale from 'element-ui/lib/locale'

import './index.css'

locale.use(lang)

Vue.use(ColorPicker)
Vue.use(Slider)

Vue.use(new VueSocketIO({
  debug: false,
  connection: `${process.env.VUE_APP_SERVER_HOST}:${process.env.VUE_APP_SERVER_PORT}`
}))

Vue.config.productionTip = false

Vue.prototype.$http = AxiosClient

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
