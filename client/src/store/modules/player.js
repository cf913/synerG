import axios from './../../authentication/axios-auth'
import router from './../../router'

const state = {
  player: {},
  playerposts: [],
  player_loading: true
}

const mutations = {
  player (state, playerData) {
    state.player = playerData.player
    state.player_loading = playerData.loading
  },
  playerposts (state, playerposts) {
    state.playerposts = playerposts.posts
  },
  reset (state) {
    state.player = {}
    state.player_loading = true
  }
}

const actions = {
  editPlayer (rootState, data) {
    if (!rootState.getters.idToken) {
      console.log('Not Authenticated')
      router.replace(`/players/${rootState.getters.user._id}`)
      return
    }
    axios.post(`/api/players/${rootState.getters.user._id}/edit?token=${rootState.getters.idToken}`, data.data)
      .then(res => {
        console.dir('Profile Updated!')
        return res
      })
      .then(({data}) => {
        rootState.commit('userUpdate', data)
        router.replace(`/players/${rootState.getters.user._id}`)
      })
      .catch(err => {
        console.log('edit err: ' + err)
      })
  },
  getPlayer ({commit}, id) {
    if (!id) {
      console.log('No id')
      return
    }
    axios.get(`/api/players/${id}`)
    .then(({data}) => {
      commit('player', {
        loading: false,
        player: data
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  updatePlayer (rootState, id) {
    if (!rootState.getters.idToken) {
      console.log('Not Authenticated')
      router.replace(`/players/${rootState.getters.user._id}`)
      return
    }
    axios.get(`/api/players/${rootState.getters.user._id}/update?token=${rootState.getters.idToken}`)
      .then(({data}) => {
        console.log('DATA RETURNED!')
        rootState.commit('player', {
          loading: false,
          player: data
        })
        localStorage.setItem('user', JSON.stringify(data))
        rootState.commit('userUpdate', data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  getPlayerPosts ({commit, rootState}, playerId) {
    if (!rootState.AuthModule.idToken) {
      console.log('Not Authenticated')
      router.replace(`/players/${playerId}`)
    }
    axios.post(`/api/players/${playerId}/posts?token=${rootState.AuthModule.idToken}`, state.player)
    .then(playerposts => {
      console.log(playerposts)
      const data = playerposts.data
      const resultArray = []
      for (let key in data) {
        resultArray.push(data[key])
      }
      console.log(resultArray)
      commit('playerposts', {
        posts: resultArray
      })
    })
    .catch(err => {
      console.log('This is error message')
      console.log(err)
    })
  },
  resetPlayerDetails ({commit}) {
    commit('reset')
  }
}

const getters = {
  player (state) {
    return state.player
  },
  playerposts (state) {
    return state.playerposts
  },
  player_loading (state) {
    return state.player_loading
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
