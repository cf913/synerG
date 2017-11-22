import Vue from 'vue'
import Vuex from 'vuex'
import axios from './../authentication/axios-auth'
// import globalAxios from 'axios'

import router from './../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null,
    player_list_loading: true,
    players: []
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
      state.user = userData.user
    },
    clearAuthData (state) {
      state.idToken = null
      state.userId = null
      state.user = null
    },
    playerList (state, playerData) {
      state.player_list_loading = playerData.player_list_loading
      state.players = playerData.players
    },
    refreshPlayerList (state, data) {
      state.player_list_loading = data.loading
      state.players = data.players
    }
  },
  actions: {
    setLogoutTimer ({commit}, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    signup ({commit, dispatch}, authData) {
      axios.post('/auth/jwt/register', {
        email: authData.email,
        username: authData.username,
        password: authData.password
      })
        .then(res => {
          console.log(res)
          const tok = res.data.data.token
          const id = res.data.data.localId
          const expires = res.data.data.expires

          commit('authUser', {
            token: tok,
            userId: id
          })
          const now = new Date()
          const expirationDate = new Date(now.getTime() + expires * 1000)
          localStorage.setItem('token', tok)
          localStorage.setItem('userId', id)
          localStorage.setItem('expirationDate', expirationDate)
          // dispatch('storeUser', authData)
          dispatch('setLogoutTimer', expires)
          router.replace('/steam')
        })
        .catch(error => console.log(error))
    },
    login ({commit, dispatch}, authData) {
      axios.post('/auth/jwt/login', {
        email: authData.email,
        password: authData.password
      })
        .then(res => {
          const tok = res.data.data.token
          const id = res.data.data.localId
          const user = res.data.data.user
          const expires = res.data.data.expires

          console.log('Tok:' + res.data.data.token)
          console.log('Tok:' + res.data.data.localId)
          console.dir(res)

          const now = new Date()
          const expirationDate = new Date(now.getTime() + expires * 1000)
          localStorage.setItem('token', tok)
          localStorage.setItem('userId', id)
          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('expirationDate', expirationDate)
          commit('authUser', {
            token: tok,
            userId: id,
            user: user
          })
          dispatch('setLogoutTimer', expires)
          router.replace('/')
        })
        .catch(error => console.log(error))
    },
    tryAutoLogin ({commit}) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      const user = JSON.parse(localStorage.getItem('user'))
      commit('authUser', {
        token: token,
        userId: userId,
        user: user
      })
    },
    logout ({commit}) {
      commit('clearAuthData')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      router.replace('/login')
    },
    getPlayers ({commit, state}) {
      if (!state.idToken) {
        return
      }
      axios.get('http://localhost:3000/api/players')
      .then(res => {
        return res
      })
      .then(({data}) => {
        console.log(data)
        const resultArray = []
        for (let key in data) {
          resultArray.push(data[key])
        }
        state.player_list_loading = false
        state.players = resultArray
        commit('playerList', {
          player_list_loading: false,
          players: resultArray
        })
      })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.idToken !== null
    },
    players (state) {
      return state.players
    },
    player_list_loading (state) {
      return state.player_list_loading
    }
  }
})
