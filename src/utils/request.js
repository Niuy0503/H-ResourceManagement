import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// 通过axios创建axios实例
const service = axios.create({
  // 环境变量的作用
  // 1.正常公司中有几个环境
  // 开发dev
  // 测试test
  // 预发uat
  // 线上pro

  // 2.在项目里如何配置这几个环境
  // 通过.env 配置base api
  // 开发环境的接口前缀/api
  // 线上环境的接口前缀/prod-api

  baseURL: process.env.VUE_APP_BASE_API, // 基准地址
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error.message)
}
)
// 响应拦截器
service.interceptors.response.use(response => {
  // axios默认加了一层data
  const { message, data, success } = response.data
  //   要根据success的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    // 业务已经错误了 还能进then ? 不能 ！ 应该进catch
    Message.error(message) // 提示错误信息
    return Promise.reject(new Error(message))
  }
}, error => {
  Message.error(error.message)
  return Promise.reject(error) // 返回执行错误，让当前执行链跳出成功，进入catch
}
)

export default service
