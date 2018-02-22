import axios from './../../authentication/axios-auth'
import router from './../../router'

const state = {
  posts: []
}

const mutations = {
  posts (state, posts) {
    state.posts = posts.posts
  }
}

const actions = {
  getPosts ({commit, rootState}) {
    if (!rootState.AuthModule.idToken) {
      console.log('Not Authenticated')
      router.replace(`/players/${rootState.AuthModule.user._id}`)
    }
    axios.get(`/api/news/?token=${rootState.AuthModule.idToken}`)
    .then(posts => {
      console.log(posts)
      const data = posts.data
      const resultArray = []
      for (let key in data) {
        resultArray.push(data[key])
      }
      console.log(resultArray)
      commit('posts', {
        posts: resultArray
      })
    })
    .catch(err => {
      console.log('This is error message')
      console.log(err)
    })
  },
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
  posts (state) {
    return state.posts
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
