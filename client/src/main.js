import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import router from './router'

Vue.use(new VueSocketIO({
  connection: 'https://boiling-mesa-96862.herokuapp.com',
}))

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
