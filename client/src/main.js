// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import VueSocketIO from 'vue-socket.io'
import socketio from 'socket.io-client'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.css'

import store from './store/store'

Vue.use(BootstrapVue)
Vue.use(VueResource)
// Vue.use(VueSocketIO, socketio('https://b1g-synerg.herokuapp.com/'), store)
Vue.use(VueSocketIO, socketio('http://localhost:3000'), store)

Vue.config.productionTip = false

Vue.filter('displayListContent', function (value) {
  return value.join(', ')
})
Vue.filter('toDecimal', function (value, decimals) {
  if (!value) {
    value = 0
  }
  if (!decimals) {
    decimals = 1
  }
  value = (value / 1000).toFixed(1)
  return value
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
