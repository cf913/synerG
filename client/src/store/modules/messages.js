import axios from './../../authentication/axios-auth'
import router from './../../router'

const state = {
  messages: [],
  messages_loading: true
}

const mutations = {
  messages (state, messages) {
    state.messages = messages.messages
    state.messages_loading = messages.loading
  },
  reset (state) {
    state.messages = {}
    state.messages_loading = true
  }
}

const actions = {
  getConversation ({commit}, conversationId) {
    if (!conversationId) {
      console.log('No id')
      return
    }
    axios.get(`/api/messages/${conversationId}`)
    .then(messages => {
      console.log(messages)
      const data = messages.data
      const resultArray = []
      for (let key in data) {
        resultArray.push(data[key])
      }
      console.log(resultArray)
      commit('messages', {
        loading: false,
        messages: resultArray
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  checkConversation (rootState, data) {
    if (!rootState.getters.idToken) {
      console.log('Not Authenticated')
      router.replace(`/players/${rootState.getters.player._id}`)
    }
    axios.post(`/api/messages/check?token=${rootState.getters.idToken}`, {user: rootState.getters.user._id, recipient: data})
    .then(checkConversation => {
      console.log('new conversation')
      console.log(checkConversation)
      if (checkConversation.data.message === 'No conversation yet') {
        console.log('Writing new message')
        router.replace(`/messages/new/${data}`)
      } else {
        router.replace(`/messages/${checkConversation.data._id}`)
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
      router.replace(`/messages/${newMessage.data.conversationId}`)
      return newMessage
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  }
}

const getters = {
  messages (state) {
    return state.messages
  },
  messages_loading (state) {
    return state.messages_loading
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
