import axios from './../../authentication/axios-auth'
import router from './../../router'

const state = {
  player: {},
  player_loading: true
}

const mutations = {
  player (state, playerData) {
    state.player = playerData.player
    state.player_loading = playerData.loading
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
      router.replace(`/players/${rootState.getters.user.steamId}`)
      return
    }
    axios.post(`/api/players/${rootState.getters.user.steamId}/edit?token=${rootState.getters.idToken}`, data.data)
      .then(res => {
        console.dir('Profile Updated!')
        return res
      })
      .then(({data}) => {
        rootState.commit('userUpdate', data)
        router.replace(`/players/${rootState.getters.userId}`)
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
  resetPlayerDetails ({commit}) {
    commit('reset')
  }
}

const getters = {
  player (state) {
    return state.player
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
