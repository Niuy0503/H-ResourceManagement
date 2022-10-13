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

/**
 * 保存用户信息
 * @param {Object}
 * @return {Promise}
 */

export function saveUserDetailByIdAPI(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}
