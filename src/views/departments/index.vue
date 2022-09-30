<template>
  <div class="departments-container">
    <el-card>
      <treeTools :tree-node="company" :is-root="false" />
    </el-card>
    <!-- 树形结构 -->
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
      <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
      <treeTools slot-scope="{data}" :tree-node="data" @adddepts="adddepts" />
    </el-tree>
    <adddepartments :show-dialog.sync="showDialog" :current-node="currentNode" />
  </div>
</template>

<script>
import { getDepartmentsAPI } from '@/api'
import { tranListToTreeData } from '@/utils'
import treeTools from './cpns/tree-tools.vue'
import adddepartments from './cpns/adddepartments.vue'
export default {
  name: 'Departments',
  components: {
    treeTools,
    adddepartments
  },
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      isRoot: false,
      departs: [],
      company: {},
      showDialog: false,
      currentNode: {}
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const result = await getDepartmentsAPI()
      this.departs = tranListToTreeData(result.depts, '')
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      console.log(result)
    },
    adddepts(node) {
      this.showDialog = true
      this.currentNode = node
    }
  }
}
</script>

<style scoped lang="scss">
.departments-container {
  width: 900px;
  margin: 20px auto;
}
</style>
