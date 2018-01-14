import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://synerg-tchung95.c9users.io/'
})

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance
