import axios from './../../authentication/axios-auth'
// import router from './../../router'

const state = {
  team_list_loading: true,
  teams: []
}

const mutations = {
  teamList (state, teamData) {
    state.team_list_loading = teamData.team_list_loading
    state.teams = teamData.teams
  },
  refreshteamList (state, data) {
    state.team_list_loading = data.loading
    state.teams = data.teams
  }
}

const actions = {
  getTeams ({commit}) {
    axios.get('api/teams')
    .then(res => {
      return res
    })
    .then(({data}) => {
      console.log(data)
      const resultArray = []
      for (let key in data) {
        resultArray.push(data[key])
      }
      state.team_list_loading = false
      state.teams = resultArray
      commit('teamList', {
        team_list_loading: false,
        teams: resultArray
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  
  getTeamsFiltered ({commit, state, rootState}, query) {
    console.log(query)
    axios.post('/api/teams', query)
    .then(res => {
      return res
    })
    .then(({data}) => {
      console.log(data)
      const resultArray = []
      for (let key in data) {
        resultArray.push(data[key])
      }
      state.team_list_loading = false
      state.teams = resultArray
      commit('teamList', {
        team_list_loading: false,
        teams: resultArray
      })
    })
  }
}

const getters = {
  teams (state) {
    return state.teams
  },
  team_list_loading (state) {
    return state.team_list_loading
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
