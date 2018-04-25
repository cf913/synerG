import axios from './../../authentication/axios-auth'
import router from './../../router'

const state = {
  posts: [],
  signals: []
}

const mutations = {
  posts (state, posts) {
    state.posts = posts.posts
  },
  signals (state, signals) {
    state.signals = signals.signals
  }
}

const actions = {
  getPosts ({commit, rootState}) {
    if (!rootState.AuthModule.idToken) {
      console.log('Not Authenticated')
      router.replace(`/players/${rootState.AuthModule.user._id}`)
      return
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
  newPost ({rootState, dispatch}, post) {
    if (!rootState.AuthModule.idToken) {
      console.log('Not Authenticated')
      router.replace(`/`)
      return
    }
    axios.post(`/api/news/?token=${rootState.AuthModule.idToken}`, {post: post, author: rootState.AuthModule.user})
    .then(newPost => {
      console.log('created new post')
      console.log(newPost)
      dispatch('getPosts')
      router.replace(`/`)
      return newPost
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  },
  getSignals ({commit, rootState}, query) {
    if (!rootState.AuthModule.idToken) {
      console.log('Not Authenticated')
      router.replace(`/players/${rootState.AuthModule.user._id}`)
      return
    }
    axios.post(`/api/news/signals?token=${rootState.AuthModule.idToken}`, query)
    .then(signals => {
      console.log(signals)
      const data = signals.data
      const resultArray = []
      for (let key in data) {
        resultArray.push(data[key])
      }
      console.log(resultArray)
      commit('signals', {
        signals: resultArray
      })
    })
    .catch(err => {
      console.log('This is error message')
      console.log(err)
    })
  },
  newPlayerSignal ({rootState, dispatch}, signal) {
    if (!rootState.AuthModule.idToken) {
      console.log('Not Authenticated')
      router.replace(`/`)
      return
    }
    axios.post(`/api/news/signals/player/new?token=${rootState.AuthModule.idToken}`, {signal: signal, player: rootState.AuthModule.user})
    .then(newSignal => {
      console.log('created new signal')
      console.log(newSignal)
      dispatch('getSignals')
      router.replace(`/app/signals`)
      return newSignal
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  },
  newTeamSignal ({rootState, dispatch}, {signal, team}) {
    if (!rootState.AuthModule.idToken) {
      console.log('Not Authenticated')
      router.replace(`/`)
      return
    }
    console.log(signal)
    console.log(team)
    axios.post(`/api/news/signals/team/new?token=${rootState.AuthModule.idToken}`, {signal: signal, team: team})
    .then(newSignal => {
      console.log('created new signal')
      console.log(newSignal)
      dispatch('getSignals')
      router.replace(`/app/signals`)
      return newSignal
    })
    .catch(err => {
      console.log('edit err: ' + err)
    })
  }
}

const getters = {
  posts (state) {
    return state.posts
  },
  signals (state) {
    return state.signals
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
