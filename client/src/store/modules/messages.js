import axios from './../../authentication/axios-auth'
import router from './../../router'

const state = {
}

const mutations = {
}

const actions = {
  checkConversation (rootState, data) {
    if (!rootState.getters.idToken) {
      console.log('Not Authenticated')
      router.replace(`/players/${rootState.getters.player._id}`)
    }
    axios.get(`/api/messages/check?token=${rootState.getters.idToken}`, {user: rootState.getters.user._id, recipient: data})
    // axios.post(`/api/messages/new/${data}?token=${rootState.getters.idToken}`, {user: rootState.getters.user._id, recipient: data})
    .then(checkConversation => {
      console.log('new conversation')
      console.log(checkConversation)
      if (checkConversation.message === 'No conversation yet') {
        console.log('Writing new message')
        router.replace(`/messages/new/${data}`)
      } else {
        router.replace(`/messages/new/${data}`)
      }
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  },
  newConversation (rootState, {message, recipient}) {
    if (!rootState.getters.idToken) {
      console.log('Not Authenticated')
      router.replace(`/players/${rootState.getters.player._id}`)
    }
    axios.post(`/api/messages/new/${recipient}?token=${rootState.getters.idToken}`, {message: message, recipient: recipient, sender: rootState.getters.user._id})
    .then(newMessage => {
      console.log('created new conversation')
      console.log(newMessage)
      router.replace(`/myteams`)
      return newMessage
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
