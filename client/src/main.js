import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import DaySpanVuetify from 'dayspan-vuetify'
import router from './router'

Vue.use(new VueSocketIO({
  connection: 'localhost:5555',
}))

Vue.use( DaySpanVuetify, {
  // options is vue definition, the resulting reactive component is stored in components as this.$dayspan or Vue.$dayspan
  data: {
    // data or computed to override
  },
  computed: {
    // data or computed to override
  },
  methods: {
    // methods to override
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
