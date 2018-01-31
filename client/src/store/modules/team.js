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
  createTeam (rootState, data) {
    console.log('About to post')
    console.log(data)
    console.log('ROOTSTATE')
    console.log(rootState.getters)
    axios.post(`/api/teams/new?token=${rootState.getters.idToken}`, {data: data, user: rootState.getters.user})
    .then(res => {
      return res
    })
    .then(({data}) => {
      console.log('done')
      console.log(data)
      console.log(rootState.getters.user)
      // data.teamAdmins.push(rootState.AuthModule.user)
      router.replace(`/players/${rootState.getters.user.steamId}`)
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
  editTeam (rootState, data) {
    if (!(rootState.getters.team.teamAdmins.filter(admin => (admin.steamId === rootState.getters.user.steamId)).length) || !rootState.getters.idToken) {
      console.log('You are not a team admin')
      router.replace(`/teams/${rootState.getters.team._id}`)
      return
    }
    // axios.post(`/api/teams/${state.getters.team._id}/edit?token=${rootState.getters.idToken}`, data.data)
    axios.post(`/api/teams/${rootState.getters.team._id}/edit?token=${rootState.getters.idToken}`, data.data)
    .then(res => {
      console.dir('Profile Updated!')
      router.replace(`/teams/${rootState.getters.team._id}`)
      return res
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  },
  sendTeamRequest (rootState, teamId) {
    if ((rootState.getters.team.teamAdmins.filter(admin => (admin.steamId === rootState.getters.user.steamId)).length) || (rootState.getters.team.teamMembers.filter(member => (member.steamId === rootState.getters.user.steamId)).length)) {
      console.log('You are already a team member')
      router.replace(`/teams/${rootState.getters.team._id}`)
      return
    }
    // axios.post(`/api/teams/${teamId}/send?token=${rootState.getters.idToken}`, rootState.getters.user)
    axios.post(`/api/teams/${teamId}/send`, rootState.getters.user)
    .then(res => {
      console.dir('Request Sent!')
      router.replace(`/teams/${rootState.getters.team._id}`)
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
