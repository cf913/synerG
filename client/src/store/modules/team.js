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
      console.log('got team')
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
  },
  editTeam ({commit, state, rootState}, data) {
    if (!(state.getters.team.teamAdmins.includes(rootState.getters.user.steamId))) {
      console.log('You are not a team admin')
      router.replace(`/teams/${state.getters.team._id}`)
      return
    }
    // axios.post(`/api/teams/${state.getters.team._id}/edit?token=${rootState.getters.idToken}`, data.data)
    axios.post(`/api/teams/${state.getters.team._id}/edit`, data.data)
    .then(res => {
      console.dir('Profile Updated!')
      router.replace(`/players/${state.getters.team._id}`)
      return res
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
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
