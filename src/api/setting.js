import request from '@/utils/request'

export const getRoleListAPI = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}

export function addRoleAPI(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
