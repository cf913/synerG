import axios from './../../authentication/axios-auth'
import router from './../../router'

const state = {
}

const mutations = {
}

const actions = {
  editPlayer (rootState, data) {
    if (!rootState.getters.idToken) {
      console.log('Not Authenticated')
      router.replace(`/players/${rootState.getters.userId}`)
      return
    }
    axios.post(`/api/players/${rootState.getters.userId}/edit?token=${rootState.getters.idToken}`, data.data)
      .then(res => {
        console.dir('Profile Updated!')
        return res
      })
      .then(({data}) => {
        rootState.commit('userUpdate', data)
        router.replace(`/players/${rootState.getters.userId}`)
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
