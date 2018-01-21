import axios from './../../authentication/axios-auth'
import router from './../../router'

const state = {
  team: {},
  team_loading: true
}

const mutations = {
  team (state, teamData) {
    state.team = teamData.team
    state.team_loading = teamData.loading
  },
  reset (state) {
    state.team = {}
    state.team_loading = true
  }
}

const actions = {
  createTeam ({commit, rootState}, data) {
    console.log('About to post')
    console.log(data)
    axios.post(`/api/teams/new`, {data: data, user: rootState.AuthModule.user})
    .then(res => {
      return res
    })
    .then(({data}) => {
      console.log('done')
      console.log(data)
      console.log(rootState.AuthModule.user)
      // data.teamAdmins.push(rootState.AuthModule.user)
      router.replace(`/profile`)
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  },
  getTeam ({commit}, id) {
    if (!id) {
      console.log('No id')
      return
    }
    axios.get(`/api/teams/${id}`)
    .then(({data}) => {
      commit('team', {
        loading: false,
        team: data
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  resetTeamDetails ({commit}) {
    commit('reset')
  }
}

const getters = {
  team (state) {
    return state.team
  },
  team_loading (state) {
    return state.team_loading
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
