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
  sendTeamRequest ({state, rootState, dispatch}, teamId) {
    if ((state.team.teamAdmins.filter(admin => (admin.steamId === rootState.AuthModule.user.steamId)).length) || (state.team.teamMembers.filter(member => (member.steamId === rootState.AuthModule.user.steamId)).length)) {
      console.log('You are already a team member')
      router.replace(`/teams/${teamId}`)
      return
    }
    if (!rootState.AuthModule.idToken) {
      console.log('You are not authenticated')
      router.replace(`/teams/${teamId}`)
      return
    }
    axios.post(`/api/teams/${teamId}/send?token=${rootState.AuthModule.idToken}`, rootState.AuthModule.user)
    .then(res => {
      console.log(res)
      console.dir('Request Sent!')
      dispatch('getTeam', teamId)
      router.replace(`/teams/${teamId}`)
      return res
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  },
  declineTeamRequest ({state, rootState, dispatch}, player) {
    if (!(state.team.teamAdmins.filter(admin => (admin.steamId === rootState.AuthModule.user.steamId)).length) || !rootState.AuthModule.idToken) {
      console.log('You are not a team admin')
      router.replace(`/teams/${state.team._id}`)
      return
    }
    axios.post(`/api/teams/${state.team._id}/decline?token=${rootState.AuthModule.idToken}`, player)
    .then(res => {
      console.dir('Request Declined!')
      dispatch('getTeam', state.team._id)
      router.replace(`/teams/${state.team._id}`)
      return res
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  },
  acceptTeamRequest ({state, rootState, dispatch}, player) {
    if (!(state.team.teamAdmins.filter(admin => (admin.steamId === rootState.AuthModule.user.steamId)).length) || !rootState.AuthModule.idToken) {
      console.log('You are not a team admin')
      router.replace(`/teams/${state.team._id}`)
      return
    }
    axios.post(`/api/teams/${state.team._id}/accept?token=${rootState.AuthModule.idToken}`, player)
    .then(res => {
      console.dir('Request Accepted!')
      dispatch('getTeam', state.team._id)
      router.replace(`/teams/${state.team._id}`)
      return res
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  },
  cancelTeamRequest ({state, rootState, dispatch}, teamId) {
    if ((state.team.teamAdmins.filter(admin => (admin.steamId === rootState.AuthModule.user.steamId)).length) || (state.team.teamMembers.filter(member => (member.steamId === rootState.AuthModule.user.steamId)).length)) {
      console.log('You are already a team member')
      router.replace(`/teams/${teamId}`)
      return
    }
    if (!rootState.AuthModule.idToken) {
      console.log('You are not authenticated')
      router.replace(`/teams/${teamId}`)
      return
    }
    axios.post(`/api/teams/${teamId}/cancel?token=${rootState.AuthModule.idToken}`, rootState.AuthModule.user)
    .then(res => {
      console.dir('Request Cancelled!')
      dispatch('getTeam', teamId)
      router.replace(`/teams/${teamId}`)
      return res
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  },
  leaveTeam ({state, rootState, dispatch}, teamId) {
    if (!(state.team.teamAdmins.filter(admin => (admin.steamId === rootState.AuthModule.user.steamId)).length) && !(state.team.teamMembers.filter(member => (member.steamId === rootState.AuthModule.user.steamId)).length)) {
      console.log('You are not a team member')
      router.replace(`/teams/${teamId}`)
      return
    }
    if (!rootState.AuthModule.idToken) {
      console.log('You are not authenticated')
      router.replace(`/teams/${teamId}`)
      return
    }
    axios.post(`/api/teams/${teamId}/leave?token=${rootState.AuthModule.idToken}`, rootState.AuthModule.user)
    .then(res => {
      console.dir('Left Team!')
      dispatch('getTeam', teamId)
      router.replace(`/teams/${teamId}`)
      return res
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  },
  deleteTeam (rootState, teamId) {
    if (!(rootState.getters.team.teamAdmins.filter(admin => (admin.steamId === rootState.getters.user.steamId)).length) || !rootState.getters.idToken) {
      console.log('You are not a team admin')
      router.replace(`/teams/${teamId}`)
      return
    }
    axios.post(`/api/teams/${teamId}/delete?token=${rootState.getters.idToken}`, rootState.getters.user)
    .then(res => {
      console.dir('Deleted Team!')
      router.replace(`/players/${rootState.getters.user.steamId}`)
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
