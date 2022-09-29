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

export function updateRoleAPI(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}

export function deleteRoleAPI(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

export function getCompanyInfoAPI(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
