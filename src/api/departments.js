import request from '@/utils/request'

export function getDepartmentsAPI() {
  return request({
    url: '/company/department'
  })
}
