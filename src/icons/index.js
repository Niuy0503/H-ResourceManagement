import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
// require.context 方法 可以实现批量导入文件
// require.context(directory, useSubdirectories, regExp)
// directory: 要查找的文件路径
// useSubdirectories: 是否查找子目录
// regExp: 要匹配文件的正则
// 返回一个方法

// 返回的方法具有一个 keys 属性
// keys 函数 返回一个数组
// console.log(req('./dashboard.svg'))
// console.log(req.keys())

const requireAll = requireContext => requireContext.keys().map(requireContext)

requireAll(req)
