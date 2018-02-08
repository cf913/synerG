import axios from './../../authentication/axios-auth'
import router from './../../router'

const state = {
  // recipients: {},
  // recipients_loading: true
}

const mutations = {
  // recipient (state, recipientData) {
  //   state.recipient = recipientData.player
  //   state.recipient_loading = recipientData.loading
  // }
}

const actions = {
  // loadRecipient ({commit}, id) {
  //   if (!id) {
  //     console.log('No id')
  //     return
  //   }
  //   axios.get(`/api/players/${id}`)
  //   .then(({data}) => {
  //     commit('recipient', {
  //       loading: false,
  //       recipient: data
  //     })
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // },
  checkConversation (rootState, data) {
    if (!rootState.getters.idToken) {
      console.log('Not Authenticated')
      router.replace(`/players/${rootState.getters.player.steamId}`)
    }
    // use checkConversation and if conversation returns empty run new Conversation otherwise getConverdation
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
