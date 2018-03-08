import axios from './../../authentication/axios-auth'
import router from './../../router'

const state = {
  community: {},
  community_loading: true
}

const mutations = {
  community (state, communityData) {
    state.community = communityData.community
    state.community_loading = communityData.loading
  },
  reset (state) {
    state.community = {}
    state.community_loading = true
  }
}

const actions = {
  getCommunity ({commit}, id) {
    if (!id) {
      console.log('No id')
      return
    }
    axios.get(`/api/communities/${id}`)
    .then(({data}) => {
      console.log('got community')
      commit('community', {
        loading: false,
        community: data
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  resetCommunityDetails ({commit}) {
    commit('reset')
  },
  createCommunity (rootState, {data, player}) {
    if (!rootState.getters.idToken) {
      console.log('You are not authenticated')
      router.replace(`/myteams`)
      return
    }
    console.log('About to post to create a community')
    axios.post(`/api/communities/new?token=${rootState.getters.idToken}`, {data: data, player: player})
    .then(res => {
      return res
    })
    .then(({data}) => {
      console.log('done')
      console.log(data)
      router.replace(`/players/${rootState.getters.user._id}`)
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  }
}

const getters = {
  community (state) {
    return state.community
  },
  community_loading (state) {
    return state.community_loading
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
