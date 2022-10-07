<template>
  <div>
    <PageTools>
      <template #before>
        <span>共25条记录</span>
      </template>
      <template #after>
        <el-button size="small" type="warning">导入</el-button>
        <el-button size="small" type="danger">导出</el-button>
      </template>
    </PageTools>
  </div>
</template>

<script>
import PageTools from '@/components/PageTools/index.vue'
export default {
  name: 'Employees',
  components: {
    PageTools
  }
}
</script>

<style>

</style>
