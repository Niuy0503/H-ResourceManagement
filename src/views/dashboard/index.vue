<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <UploadExcel :on-success="success" :before-upload="beforeUpload" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadExcel from '@/components/UploadExcel/index.vue'

export default {
  name: 'Dashboard',
  components: {
    UploadExcel
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    success(data) {
      console.log(data)
      // 具体业务逻辑
    },
    beforeUpload(file) {
      console.log(file)
      if (file.size > 102400) {
        this.$message.error('太大了')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
