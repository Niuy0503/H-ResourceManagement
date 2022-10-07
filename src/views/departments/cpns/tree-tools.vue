<template>

  <el-row type="flex" justify="space-between" align="middle" style="width:100%;height: 100%;">
    <el-col>
      <!-- 左侧内容 -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="6">
      <el-row type="flex" justify="end">
        <el-col style="margin-right:6px">{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 放置下拉菜单 -->
          <el-dropdown @command="Command">
            <!-- 内容 -->
            <span>操作
              <i class="el-icon-arrow-down" />
            </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <!-- 右侧内容 -->
    </el-col>
  </el-row>

</template>

<script>
import { delDepartments } from '@/api'
export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: { // isRoot 来控制 编辑部门 和 删除部门 的 显示 隐藏
      type: Boolean,
      default: true // 默认显示
    }
  },
  methods: {
    Command(type) {
      if (type === 'add') {
        // 新增功能
        this.$emit('adddepts', this.treeNode)
      } else if (type === 'edit') {
        // 编辑功能
        this.$emit('editDept', this.treeNode)
      } else {
        // 删除功能
        this.$confirm('是否确认删除该部门', '提示', {
          type: 'warning'
        }).then(async res => {
          return delDepartments(this.treeNode.id)
        }).then(res => {
          this.$$message.success('删除成功!')
          this.$emit('refreshList')
        })
      }
    }
  }
}
</script>

<style>
.el-card__body {
   padding-right: 0px !important;
}
</style>
