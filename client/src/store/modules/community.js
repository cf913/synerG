import axios from './../../authentication/axios-auth'
import router from './../../router'

const state = {
  community: {},
  community_posts: [],
  community_loading: true
}

const mutations = {
  community (state, communityData) {
    state.community = communityData.community
    state.community_loading = communityData.loading
  },
  community_posts (state, communityPosts) {
    state.community_posts = communityPosts.posts
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
      router.replace(`/app/myteams`)
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
      router.replace(`/app/players/${rootState.getters.user._id}`)
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  },
  editCommunity (rootState, data) {
    if (!(rootState.getters.community.admins.filter(admin => (admin.steamId === rootState.getters.user.steamId)).length) || !rootState.getters.idToken) {
      console.log('You are not a community admin')
      router.replace(`/app/communities/${rootState.getters.community._id}`)
      return
    }
    axios.post(`/api/communities/${rootState.getters.community._id}/edit?token=${rootState.getters.idToken}`, data.data)
    .then(res => {
      console.dir('Community Updated!')
      router.replace(`/app/communities/${rootState.getters.community._id}`)
      return res
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  },
  sendCommunityRequest ({state, rootState, dispatch}) {
    if ((state.community.admins.filter(admin => (admin.steamId === rootState.AuthModule.user.steamId)).length) || (state.community.members.filter(member => (member.steamId === rootState.AuthModule.user.steamId)).length)) {
      console.log('You are already a team member')
      router.replace(`/app/communities/${state.community._id}`)
      return
    }
    if (!rootState.AuthModule.idToken) {
      console.log('You are not authenticated')
      router.replace(`/app/communities/${state.community._id}`)
      return
    }
    axios.post(`/api/communities/${state.community._id}/send?token=${rootState.AuthModule.idToken}`, rootState.AuthModule.user)
    .then(res => {
      console.log(res)
      console.dir('Request Sent!')
      dispatch('getCommunity', state.community._id)
      router.replace(`/app/communities/${state.community._id}`)
      return res
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  },
  declineCommunityRequest ({state, rootState, dispatch}, player) {
    if (!(state.community.admins.filter(admin => (admin.steamId === rootState.AuthModule.user.steamId)).length) || !rootState.AuthModule.idToken) {
      console.log('You are not a community admin')
      router.replace(`/app/communities/${state.community._id}`)
      return
    }
    axios.post(`/api/communities/${state.community._id}/decline?token=${rootState.AuthModule.idToken}`, player)
    .then(res => {
      console.dir('Request Declined!')
      dispatch('getCommunity', state.community._id)
      router.replace(`/app/communities/${state.community._id}`)
      return res
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  },
  acceptCommunityRequest ({state, rootState, dispatch}, player) {
    if (!(state.community.admins.filter(admin => (admin.steamId === rootState.AuthModule.user.steamId)).length) || !rootState.AuthModule.idToken) {
      console.log('You are not a community admin')
      router.replace(`/app/communities/${state.community._id}`)
      return
    }
    axios.post(`/api/communities/${state.community._id}/accept?token=${rootState.AuthModule.idToken}`, player)
    .then(res => {
      console.dir('Request Accepted!')
      dispatch('getCommunity', state.community._id)
      router.replace(`/app/communities/${state.community._id}`)
      return res
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  },
  cancelCommunityRequest ({state, rootState, dispatch}, communityId) {
    if ((state.community.admins.filter(admin => (admin.steamId === rootState.AuthModule.user.steamId)).length) || (state.community.members.filter(member => (member.steamId === rootState.AuthModule.user.steamId)).length)) {
      console.log('You are already a community member')
      router.replace(`/app/communities/${communityId}`)
      return
    }
    if (!rootState.AuthModule.idToken) {
      console.log('You are not authenticated')
      router.replace(`/app/communities/${communityId}`)
      return
    }
    axios.post(`/api/communities/${communityId}/cancel?token=${rootState.AuthModule.idToken}`, rootState.AuthModule.user)
    .then(res => {
      console.dir('Request Cancelled!')
      dispatch('getCommunity', communityId)
      router.replace(`/app/communities/${communityId}`)
      return res
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  },
  leaveCommunity ({state, rootState, dispatch}, communityId) {
    if (!(state.community.admins.filter(admin => (admin.steamId === rootState.AuthModule.user.steamId)).length) && !(state.community.members.filter(member => (member.steamId === rootState.AuthModule.user.steamId)).length)) {
      console.log('You are not a community member')
      router.replace(`/app/communities/${communityId}`)
      return
    }
    if (!rootState.AuthModule.idToken) {
      console.log('You are not authenticated')
      router.replace(`/app/communities/${communityId}`)
      return
    }
    axios.post(`/api/communities/${communityId}/leave?token=${rootState.AuthModule.idToken}`, rootState.AuthModule.user)
    .then(res => {
      console.dir('Left Community!')
      dispatch('getCommunity', communityId)
      router.replace(`/app/communities/${communityId}`)
      return res
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  },
  deleteCommunity (rootState, communityId) {
    if (!(rootState.getters.community.admins.filter(admin => (admin.steamId === rootState.getters.user.steamId)).length) || !rootState.getters.idToken) {
      console.log('You are not a community admin')
      router.replace(`/app/communities/${communityId}`)
      return
    }
    axios.post(`/api/communities/${communityId}/delete?token=${rootState.getters.idToken}`, rootState.getters.user)
    .then(res => {
      console.dir('Deleted Community!')
      router.replace(`/app/players/${rootState.getters.user._id}`)
      return res
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  },
  newCommunityPost ({state, rootState, dispatch}, post) {
    if (!(state.community.admins.filter(admin => (admin.steamId === rootState.AuthModule.user.steamId)).length) && !(state.community.members.filter(member => (member.steamId === rootState.AuthModule.user.steamId)).length)) {
      console.log('You are not a member of this community. Join to post')
      router.replace(`/app/communities/${state.community._id}`)
    }
    console.log(state.community._id)
    axios.post(`/api/communities/${state.community._id}/post?token=${rootState.AuthModule.idToken}`, {post: post, author: rootState.AuthModule.user})
    .then(newCommunityPost => {
      console.log('created new post')
      console.log(newCommunityPost)
      dispatch('getCommunityPosts', state.community._id)
      router.replace(`/app/communities/${state.community._id}`)
      return newCommunityPost
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  },
  getCommunityPosts ({commit, rootState}, communityId) {
    if (!rootState.AuthModule.idToken) {
      console.log('Not Authenticated')
      router.replace(`/app/`)
    }
    console.log(communityId)
    axios.get(`/api/communities/${communityId}/post?token=${rootState.AuthModule.idToken}`)
    .then(communityPosts => {
      console.log(communityPosts)
      const data = communityPosts.data
      const resultArray = []
      for (let key in data) {
        resultArray.push(data[key])
      }
      console.log(resultArray)
      commit('community_posts', {
        posts: resultArray
      })
    })
    .catch(err => {
      console.log('This is error message')
      console.log(err)
    })
  }
}

const getters = {
  community (state) {
    return state.community
  },
  community_posts (state) {
    return state.community_posts
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
