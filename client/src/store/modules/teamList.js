import axios from './../../authentication/axios-auth'
// import router from './../../router'

const state = {
  team_list_loading: true,
  teams: [],
  my_team_list_loading: true,
  my_teams: []
}

const mutations = {
  teamList (state, teamData) {
    state.team_list_loading = teamData.team_list_loading
    state.teams = teamData.teams
  },
  myTeamList (state, teamData) {
    state.my_team_list_loading = teamData.my_team_list_loading
    state.my_teams = teamData.my_teams
  },
  refreshteamList (state, data) {
    state.team_list_loading = data.loading
    state.teams = data.teams
  }
}

const actions = {
  getTeams ({commit, state, rootState}, query) {
    console.log(query)
    console.log('Getting teams')
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
      console.log('Teams gathered')
      console.log(resultArray)
    })
  },
  getMyTeams ({commit, state, rootState}) {
    console.log('Getting my teams')
    axios.post('/api/teams/myteams', rootState.AuthModule.user)
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
      commit('myTeamList', {
        my_team_list_loading: false,
        my_teams: resultArray
      })
      console.log('My teams gathered')
      console.log(resultArray)
    })
  }
}

const getters = {
  teams (state) {
    return state.teams
  },
  team_list_loading (state) {
    return state.team_list_loading
  },
  my_teams (state) {
    return state.my_teams
  },
  my_team_list_loading (state) {
    return state.my_team_list_loading
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
