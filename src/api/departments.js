import request from '@/utils/request'

export function getDepartmentsAPI() {
  return request({
    url: '/company/department'
  })
}
//  新增部门接口
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
