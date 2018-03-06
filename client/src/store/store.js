import Vue from 'vue'
import Vuex from 'vuex'
// import axios from './../authentication/axios-auth'
// import router from './../router'

import PlayersListModule from './modules/playerList'
import PlayerModule from './modules/player'
import FriendsModule from './modules/friends'
import AuthModule from './modules/auth'
import HeroesModule from './modules/heroes'
import TeamListModule from './modules/teamList'
import TeamModule from './modules/team'
import CommunitiesModule from './modules/communities'
import MessagesModule from './modules/messages'
import NewsModule from './modules/news'

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
    FriendsModule,
    PlayersListModule,
    PlayerModule,
    HeroesModule,
    TeamModule,
    TeamListModule,
    CommunitiesModule,
    MessagesModule,
    NewsModule
  }
})
