import Vue from 'vue'
import Vuex from 'vuex'
// import axios from './../authentication/axios-auth'
// import router from './../router'

import PlayersListModule from './modules/playerList'
import PlayerModule from './modules/player'
import AuthModule from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters: {

  },
  modules: {
    AuthModule,
    PlayersListModule,
    PlayerModule
  }
})
