import axios from './../../authentication/axios-auth'
import router from './../../router'

const state = {
  community_list_loading: true,
  communities: []
}

const mutations = {
  communityList (state, communityData) {
    state.community_list_loading = communityData.community_list_loading
    state.communities = communityData.communities
  },
  refreshcommunityList (state, data) {
    state.community_list_loading = data.loading
    state.communities = data.communities
  }
}

const actions = {
  getCommunities ({commit, state, rootState}, query) {
    console.log(query)
    console.log('Getting communities')
    axios.post('/api/communities', query)
    .then(res => {
      return res
    })
    .then(({data}) => {
      console.log(data)
      const resultArray = []
      for (let key in data) {
        resultArray.push(data[key])
      }
      state.community_list_loading = false
      state.communities = resultArray
      commit('communityList', {
        community_list_loading: false,
        communities: resultArray
      })
      console.log('Communities gathered')
      console.log(resultArray)
    })
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
  communities (state) {
    return state.communities
  },
  community_list_loading (state) {
    return state.community_list_loading
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
