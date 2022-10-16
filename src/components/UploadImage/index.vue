<template>
  <div>
    <el-upload
      v-loading="loading"
      class="UploadImage"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-change="onChange"
      :http-request="onRequest"
      :before-upload="beforeUpload"
      :limit="1"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 预览图片弹出层 -->
    <el-dialog
      title="图片预览"
      :visible.sync="previewImgDialogVisible"
    >
      <img style="width: 100%" :src="previewImgUrl">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDhJzZVVW0Meqz226BJ9siOuTu9CmOsLuP',
  SecretKey: 'TqGZXTJ1Z9dBg8eAiHpO0hHnLoEUXP3c'
})
export default {
  name: 'UploadImage',
  props: {
    defaultUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      fileList: [
        // { name: 'default', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      ],
      previewImgDialogVisible: false,
      previewImgUrl: ''
    }
  },
  watch: {
    defaultUrl() {
      this.fileList.push({
        name: 'default', url: this.defaultUrl
      })
    }
  },
  methods: {
    onPreview(file) {
      this.previewImgUrl = file.url
      this.previewImgDialogVisible = true
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },

    onChange(file, fileList) {
      this.fileList = fileList
    },
    onRequest({ file }) {
      this.loading = true
      cos.putObject({
        Bucket: 'hmmm1015-1314348627', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, // 上传文件对象
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        if (err) return this.$message.error('图片上传失败！')
        this.$emit('Onsuccess', {
          imgurl: 'https://' + data.Location
        })
        this.loading = false
        // console.log(err || data)
      })
    },
    beforeUpload(file) {
      // 图片的文件类型
      const types = ['image/jpeg', 'image/gif', 'image/png']
      const ishas = types.includes(file.type)
      if (!ishas) {
        this.$message.error('只能上传' + types.join('、') + '类型的文件')
        return false
      }
      // 图片的大小
      const maxSize = 1 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过1M')
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.UploadImage {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
