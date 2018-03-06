import axios from './../../authentication/axios-auth'
import router from './../../router'

const state = {
}

const mutations = {
}

const actions = {
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
}

export default {
  state,
  mutations,
  actions,
  getters
}
