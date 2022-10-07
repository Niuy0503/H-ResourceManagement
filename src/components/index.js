// import PageTools from './PageTools/index.vue'
// const components = [PageTools]

// 实现组件的自动注册
// require.context()
const fn = require.context('./', true, /\.vue$/)
console.log(fn.keys())
console.log(fn('./PageTools/index.vue')) // 根据路径查找模块

const components = fn.keys().map(ele => {
  return fn(ele)
})
export default {
  install: function(Vue) {
    //  注册全局的通用栏组件对象
    components.forEach(ele => {
      Vue.component(ele.default.name, ele.default)
    })
  }
}
