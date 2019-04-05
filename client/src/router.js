import Vue from 'vue'
import Router from 'vue-router'
import Home from './routes/Home.vue'
import Login from './routes/Login.vue'
import PointPicker from './routes/PointPicker.vue'
import Book from './routes/Book.vue'
import PlayNow from './routes/PlayNow.vue'
import CloseGame from './routes/CloseGame.vue'
import scanQR from './routes/scanQR.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/pick',
      name: 'PointPicker',
      component: PointPicker
    },
    {
      path: '/book',
      name: 'Book',
      component: Book
    },
    {
      path: '/play',
      name: 'Play',
      component: PlayNow
    },
    {
      path: '/closeGame',
      name: 'CloseGame',
      component: CloseGame
    },
    {
      path: '/scanQR',
      name: 'scanQR',
      component: scanQR
    }
  ]
})
