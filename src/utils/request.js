import axios from 'axios'

const service = axios.create({
  baseURL: '/dev', // εΊεε°ε
  timeout: 5000
})

export default service
