import request from '@/utils/request'

export const LoginAPI = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
