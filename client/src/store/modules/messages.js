import axios from './../../authentication/axios-auth'
import router from './../../router'

const state = {
  messages: [],
  messages_loading: true,
  conversations: []
}

const mutations = {
  messages (state, messages) {
    state.messages = messages.messages
    state.messages_loading = messages.loading
  },
  reset (state) {
    state.messages = {}
    state.messages_loading = true
  },
  conversations (state, conversations) {
    state.conversations = conversations.conversations
  }
}

const actions = {
  incomingMessage ({commit, getters}, data) {
    const messages = getters.messages
    messages.push(data)
    commit('messages', { messages, loading: false })
  },
  getConversations ({commit, rootState}) {
    if (!rootState.AuthModule.idToken) {
      console.log('Not Authenticated')
      router.replace(`/players/${rootState.AuthModule.user._id}`)
    }
    axios.post(`/api/messages/`, {userId: rootState.AuthModule.user._id})
    .then(conversations => {
      console.log(conversations)
      const data = conversations.data
      const resultArray = []
      for (let key in data) {
        resultArray.push(data[key])
      }
      console.log(resultArray)
      commit('conversations', {
        conversations: resultArray
      })
    })
    .catch(err => {
      console.log('This is error message')
      console.log(err)
    })
  },
  getConversation ({commit}, conversationId) {
    if (!conversationId) {
      console.log('No id')
      return
    }
    axios.get(`/api/messages/${conversationId}`)
    .then(messages => {
      console.log('front: ' + messages.length)
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
        router.replace(`/app/messages/new/${data}`)
      } else {
        router.replace(`/app/messages/${checkConversation.data._id}`)
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
      router.replace(`/app/messages/${newMessage.data.conversationId}`)
      return newMessage
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  },
  sendReply ({rootState, dispatch}, {message, conversationId}) {
    if (!rootState.AuthModule.idToken) {
      console.log('Not Authenticated')
      router.replace(`/players/${rootState.PlayerModule.player._id}`)
    }
    axios.post(`/api/messages/${conversationId}?token=${rootState.AuthModule.idToken}`, {message: message.body, sender: rootState.AuthModule.user._id})
    .then(newMessage => {
      console.log('created new conversation')
      console.log(newMessage)
      // dispatch('getConversation', conversationId)
      dispatch('incomingMessage', message)
      router.replace(`/app/messages/${newMessage.data.conversationId}`)
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
  },
  conversations (state) {
    return state.conversations
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
