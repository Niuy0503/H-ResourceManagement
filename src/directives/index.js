export const imageError = {
  inserted(el, binding, vnode) {
    // 什么时候换图片地址
    console.log(el)
    // 当前指令的相关信息
    console.log(binding)
    // vnode虚拟节点
    console.log(vnode)
    el.onerror = function() {
      el.src = binding.value
    }
  }
}
