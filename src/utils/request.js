import axios from 'axios'

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

export default service
