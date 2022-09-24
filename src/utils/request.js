import axios from 'axios'

const service = axios.create({
  baseURL: '/dev', // 基准地址
  timeout: 5000
})

export default service
