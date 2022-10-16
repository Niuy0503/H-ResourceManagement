import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employees',
      component: () => import('@/views/employees'),
      meta: {
        title: '员工管理',
        icon: 'people'
      }
    },
    {
      path: '/employees/detail/:id',
      name: 'detail',
      hidden: true,
      component: () => import('@/views/employees/detail'),
      meta: {
        title: '员工详情'
      }
    },
    {
      path: '/employees/print/:id',
      name: 'print',
      hidden: true,
      component: () => import('@/views/employees/print'),
      meta: {
        title: '员工打印'
      }
    }
  ]
}
