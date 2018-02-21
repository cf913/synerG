import Axios from 'axios'
import router from '@/router'

// const host = `https://synerg-tchung95.c9users.io/`
const host = `http://localhost:3000`
// const host = `https://b1g-synerg.herokuapp.com/`

export default {
  user: { authenticated: false },

  authenticate (context, credentials, redirect) {
    Axios.post(`${host}/auth/jwt/login`, credentials)
        .then(data => {
          console.log(data)
          context.$cookie.set('token', data.token, '1D')
          context.$cookie.set('user_id', data.user._id, '1D')
          // context.validLogin = true
          this.user.authenticated = true

          if (redirect) router.push(redirect)
        }).catch(err => {
          console.log(err)
          // context.snackbar = true
          // context.message = data.message
        })
  },

  signup (context, credentials, redirect) {
    Axios.post(`${host}/auth/jwt/register`, credentials)
        .then(() => {
          // context.validSignUp = true

          this.authenticate(context, credentials, redirect)
        }).catch(({response: {data}}) => {
          context.snackbar = true
          context.message = data.message
        })
  },

  signout (context, redirect) {
    context.$cookie.delete('token')
    context.$cookie.delete('user_id')
    this.user.authenticated = false

    if (redirect) router.push(redirect)
  },

  checkAuthentication () {
    const token = document.cookie
    this.user.authenticated = !!token
  },

  getAuthenticationHeader (context) {
    return `Bearer ${context.$cookie.get('token')}`
  }
}
