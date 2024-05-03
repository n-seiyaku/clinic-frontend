import axios from '../axios'

const handleLogin = (email, password) => {
  return axios.post('/api/users', { email, password })
}

export { handleLogin }
