import axios from 'axios'

const instance = axios.create({
  // baseURL: 'https://synerg-tchung95.c9users.io/'
  baseURL: 'http://localhost:3000'
  // baseURL: 'https://b1g-synerg.herokuapp.com/'
})

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance
