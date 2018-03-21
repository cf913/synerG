// import axios from './../../authentication/axios-auth'
// Commented out global axios config as I needed to access openDota url
import axios from './../../authentication/axios-auth'
import router from './../../router'

const state = {
  idToken: null,
  userId: null,
  user: null
}

const mutations = {
  userUpdate (state, newUser) {
    state.user = newUser
  },
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
  udpateFriends (state, friends) {
    state.user.friends = friends
  },
  socketFriend (state, id) {
    state.user.friends.pending_received.push(id)
  },
  socketFriendCancel (state, id) {
    state.user.friends.pending_received.splice(state.user.friends.pending_received.indexOf(id), 1)
  },
  socketFriendAccept (state, id) {
    state.user.friends.pending_sent.splice(state.user.friends.pending_sent.indexOf(id), 1)
    state.user.friends.accepted.push(id)
  },
  socketFriendDecline (state, id) {
    state.user.friends.pending_sent.splice(state.user.friends.pending_sent.indexOf(id), 1)
  },
  socketFriendRemove (state, id) {
    state.user.friends.accepted.splice(state.user.friends.accepted.indexOf(id), 1)
  }
  // Not needed
  // updateHeroes (state, newStats) {
  //   state.heroStats = newStats
  // }
}

const actions = {
  setLogoutTimer ({dispatch}, expirationTime) {
    setTimeout(() => {
      dispatch('logout')
    }, expirationTime * 1000)
  },
  // autoRefreshUserData (rootState) {
  //   setInterval(() => {
  //     rootState.dispatch('updatePlayer', rootState.getters.userId)
  //     console.log('Refreshing...')
  //   }, 300 * 1000)
  // },
  checkLogin ({commit, dispatch}, params) {
    if (params == null || state.idToken) {
      return
    }
    if (params.steamid && params.token) {
      const token = params.token
      console.log('Pre confirming')
      axios.post('/auth/jwt/confirm-login/?token=' + token)
      .then(data => {
        const user = data.data.user
        const id = data.data.user.steamId
        console.log(user)
        const expiresIn = 7200 // 2h
        const now = new Date()
        const expirationDate = new Date(now.getTime() + expiresIn * 1000)

        localStorage.setItem('token', token)
        localStorage.setItem('userId', id)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('expirationDate', expirationDate)
        commit('authUser', {
          token: token,
          userId: id,
          user: user
        })
        dispatch('setLogoutTimer', expiresIn)
        // dispatch('autoRefreshUserData')
      })
      .catch(error => console.log(error))
    }
  },
  tryAutoLogin ({commit, dispatch}) {
    console.log('trying auto loggin')
    const token = localStorage.getItem('token')
    if (!token) {
      console.log('no token')
      return
    }
    const expirationDate = new Date(localStorage.getItem('expirationDate'))
    const now = new Date()

    if (now >= expirationDate) {
      console.log(`expiration issue: now = ${now}, exp = ${expirationDate}`)
      dispatch('logout')
      return
    }
    const userId = localStorage.getItem('userId')
    const user = JSON.parse(localStorage.getItem('user'))
    commit('authUser', {
      token: token,
      userId: userId,
      user: user
    })
    console.log('Success!')
  },
  // No longer required but just keeping the code for reference of how to get hero stats from opendota
  // getHeroes ({commit}) {
  //   axios.get(`https://api.opendota.com/api/heroStats`)
  //     .then(({data}) => {
  //       commit('updateHeroes', {
  //         heroStats: data
  //       })
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // },
  logout ({commit}) {
    commit('clearAuthData')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('user')
    router.replace('/')
  }
}

const getters = {
  user_id (state) {
    return state.user._id
  },
  user (state) {
    return state.user
  },
  userId (state) {
    return state.userId
  },
  idToken (state) {
    return state.idToken
  },
  // Not needed
  // heroStats (state) {
  //   return state.heroStats
  // },
  isAuthenticated (state) {
    return state.idToken !== null && state.user !== null && state.userId !== null
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
