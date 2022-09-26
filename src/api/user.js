import request from '@/utils/request'

export const getUserInfoAPI = () => {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

export const getUserDetailByIdAPI = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}
