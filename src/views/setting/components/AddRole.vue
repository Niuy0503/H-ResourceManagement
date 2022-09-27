<template>
  <el-dialog
    title="新增角色"
    width="45%"
    :visible.sync="disvisible"
    :before-close="close"
  >
    <el-form
      ref="roleDialogForm"
      label-width="80px"
      :model="Formdata"
    >
      <el-form-item
        prop="name"
        label="角色"
        :rules="[{
          required: true, trigger: 'blur',message: '角色名不能为空！'
        }]"
      >
        <el-input v-model="Formdata.name" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="Formdata.description" type="textarea" row="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button v-loading="loading" type="primary" @click="submit">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addRoleAPI } from '@/api'
export default {
  name: 'AddRole',
  props: {
    disvisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      Formdata: {
        name: '',
        description: ''
      },
      loading: false
    }
  },
  methods: {
    close() {
      this.$emit('update:disvisible', false)
      this.$refs.roleDialogForm.resetFields()
    },
    async submit() {
      try {
        await this.$refs.roleDialogForm.validate()
        this.loading = true
        await addRoleAPI(this.Formdata)
        this.$emit('refreshList')
        this.$message.success('新增成功~')
        this.close()
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
