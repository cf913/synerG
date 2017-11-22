import axios from './../../authentication/axios-auth'
import router from './../../router'

const state = {
  idToken: null,
  userId: null,
  user: null
}

const mutations = {
  authUser (state, userData) {
    state.idToken = userData.token
    state.userId = userData.userId
    state.user = userData.user
  },
  clearAuthData (state) {
    state.idToken = null
    state.userId = null
    state.user = null
  }
}

const actions = {
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
  }
}

const getters = {
  user (state) {
    return state.user
  },
  isAuthenticated (state) {
    return state.idToken !== null
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
