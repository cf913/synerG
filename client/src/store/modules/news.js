import axios from './../../authentication/axios-auth'
import router from './../../router'

const state = {
}

const mutations = {
}

const actions = {
  newPost (rootState, post) {
    if (!rootState.getters.idToken) {
      console.log('Not Authenticated')
      router.replace(`/`)
    }
    axios.post(`/api/news/?token=${rootState.getters.idToken}`, {post: post, author: rootState.getters.user})
    .then(newPost => {
      console.log('created new post')
      console.log(newPost)
      router.replace(`/`)
      return newPost
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
