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

// 编辑部门接口
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}

// 删除部门接口
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
