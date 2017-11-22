import axios from './../../authentication/axios-auth'
// import router from './../../router'

const state = {
  player_list_loading: true,
  players: []
}

const mutations = {
  playerList (state, playerData) {
    state.player_list_loading = playerData.player_list_loading
    state.players = playerData.players
  },
  refreshPlayerList (state, data) {
    state.player_list_loading = data.loading
    state.players = data.players
  }
}

const actions = {
  getPlayers ({commit, state, rootState}) {
    // if (!rootState.idToken) {
    //   router.replace('/login')
    //   return
    // }
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
}

const getters = {
  players (state) {
    return state.players
  },
  player_list_loading (state) {
    return state.player_list_loading
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
