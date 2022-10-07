<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="title" :visible="showDialog" @close="close">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="addDeptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button v-loading="loading" type="primary" size="small" @click="submit">确定</el-button>
        <el-button size="small" @click="close">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addDepartments, getDepartmentsAPI, getEmployeeSimple, updateDepartments } from '@/api'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    currentNode: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const nameCheck = async(rule, value, callback) => {
      const { depts } = await getDepartmentsAPI()
      // 编辑模式下：存在的问题=>无法准确校验同级部门的数据
      // 先找到所有与自己处于同级的列表，然后再排除自己在判断
      let isRepeat = true
      if (this.formData.id) {
        // 找同级部门
        // depts==>找到真正的同级部门pid
        // 排除自己,再判断是否名字重复
        const deptsname1 = depts.filter(item => item.pid === this.currentNode.pid && item.id !== this.currentNode.id)
        isRepeat = deptsname1.some(ele => ele.name === value)
      } else {
        const deptsname = depts.filter(item => item.pid === this.currentNode.id)
        isRepeat = deptsname.some(ele => ele.name === value)
      }
      isRepeat ? callback(new Error(`该部门已经存在${value}部门`)) : callback()
      callback()
    }

    const codeCheck = async(rule, value, callback) => {
      const { depts } = await getDepartmentsAPI()
      let isRepeat = true
      if (this.formData.id) {
        isRepeat = depts.some(ele => ele.id !== this.formData.id && ele.code === value)
      } else {
        isRepeat = depts.some(ele => ele.code === value)
      }
      isRepeat ? callback(new Error(`模块下${value}已经存在~！`)) : callback()
    }

    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称1-50个字符', trigger: 'blur' },
          { validator: nameCheck, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码1-50个字符', trigger: 'blur' },
          { validator: codeCheck, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人必填' }
        ],
        introduce: [
          { required: true, message: '部门介绍必填', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍1-300个字符', trigger: 'blur' }
        ]
      },
      peoples: [],
      loading: false
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑模式' : '新增模式'
    }
  },
  methods: {
    close() {
      this.$emit('update:showDialog', false)
      this.$refs.addDeptForm.resetFields()
    },
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    async submit() {
      try {
        await this.$refs.addDeptForm.validate()
        this.loading = true
        if (this.formData.id) {
          await updateDepartments(this.formData)
        } else {
          await addDepartments({ ...this.formData, pid: this.currentNode.id })
        }
        this.$message.success(`${this.formData.id ? '编辑' : '新增'}成功!`)
        this.$parent.getDepartments()
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
