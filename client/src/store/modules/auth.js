import axios from './../../authentication/axios-auth'
import router from './../../router'

const state = {
  idToken: null,
  userId: null,
  user: null
  // user: { _id: '5a2100b386c90104354d705f',
  //   steamId: '76561198303121519',
  //   steam32: '342855791',
  //   steamName: 'B2G \' Orno',
  //   img: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
  //   __v: 0,
  //   description: 'This is a description!',
  //   comms: [ 'Discord' ],
  //   regions: [
  //     'EU West',
  //     'EU East',
  //     'Japan',
  //     'Australia',
  //     'Russia',
  //     'US West',
  //     'South Africa',
  //     'US East'
  //   ],
  //   languages: [ 'Chinese' ],
  //   positions: [],
  //   mmr: { mmr_estimate: 2757 },
  //   steam: {
  //     steamid: '76561198303121519',
  //     communityvisibilitystate: 3,
  //     profilestate: 1,
  //     personaname: 'B2G \' Orno',
  //     lastlogoff: 1512061628,
  //     profileurl: 'http://steamcommunity.com/id/b2gorno/',
  //     avatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg',
  //     avatarmedium: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
  //     avatarfull: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
  //     personastate: 0,
  //     realname: 'Joe Harper',
  //     primaryclanid: '103582791429521408',
  //     timecreated: 1462816155,
  //     personastateflags: 0,
  //     loccountrycode: 'GB',
  //     locstatecode: 'H9'
  //   }
  // }
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
  }
}

const actions = {
  setLogoutTimer ({dispatch}, expirationTime) {
    setTimeout(() => {
      dispatch('logout')
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
  user (state) {
    return state.user
  },
  userId (state) {
    return state.userId
  },
  idToken (state) {
    return state.idToken
  },
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