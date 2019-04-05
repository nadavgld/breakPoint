import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import App from './App.vue'
import config from './config.js'
import VueSocketIO from 'vue-socket.io'
import router from './router'

Vue.use(new VueSocketIO({
  connection: config.server_url,
}))

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
