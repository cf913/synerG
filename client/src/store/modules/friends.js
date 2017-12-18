import axios from './../../authentication/axios-auth'
// import router from './../../router'

const state = {
}

const mutations = {
}

const actions = {
  getOneFriend (rootState, id) {
    if (!id) {
      console.log('No id')
      return
    }
    axios.get(`/api/players/${id}`)
      .then(({data}) => {
        return data
      })
      .catch(err => {
        console.log(err)
      })
  },
  sendRequest (rootState, id) {
    if (rootState.getters.userId === id) {
      console.log('It\'s you!')
      return
    }
    axios.post(`/api/friends/${id}/send?token=${rootState.getters.idToken}`)
    .then(({data}) => {
      if (data.message) console.log(data.message)
      if (data.steamId === rootState.getters.userId) {
        console.log('DATA RETURNED!')
        localStorage.setItem('user', JSON.stringify(data))
        rootState.commit('userUpdate', data)
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  cancelRequest (rootState, id) {
    axios.post(`/api/friends/${id}/cancel?token=${rootState.getters.idToken}`)
    .then(({data}) => {
      if (data.steamId === rootState.getters.userId) {
        console.log('DATA RETURNED!')
        localStorage.setItem('user', JSON.stringify(data))
        rootState.commit('userUpdate', data)
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  acceptRequest (rootState, id) {
    axios.post(`/api/friends/${id}/accept?token=${rootState.getters.idToken}`)
    .then(({data}) => {
      if (data.message) console.log(data.message)
      if (data.steamId === rootState.getters.userId) {
        console.log('DATA RETURNED!')
        localStorage.setItem('user', JSON.stringify(data))
        rootState.commit('userUpdate', data)
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  declineRequest (rootState, id) {
    axios.post(`/api/friends/${id}/decline?token=${rootState.getters.idToken}`)
    .then(({data}) => {
      if (data.message) console.log(data.message)
      if (data.steamId === rootState.getters.userId) {
        console.log('DATA RETURNED!')
        localStorage.setItem('user', JSON.stringify(data))
        rootState.commit('userUpdate', data)
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  deleteFriend (rootState, id) {
    axios.delete(`/api/friends/${id}/remove?token=${rootState.getters.idToken}`)
    .then(({data}) => {
      if (data.message) console.log(data.message)
      if (data.steamId === rootState.getters.userId) {
        console.log('DATA RETURNED!')
        localStorage.setItem('user', JSON.stringify(data))
        rootState.commit('userUpdate', data)
      }
    })
    .catch(err => {
      console.log(err)
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
