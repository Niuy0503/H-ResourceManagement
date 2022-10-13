<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane lazy label="登录账户设置">

            <!-- 放置表单 -->
            <el-form ref="form" label-width="120px" :model="accountInfo" :rules="rules" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="accountInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input v-model="accountInfo.password" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="UpdateEmployees">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane lazy label="个人详情">
            <UserInfo />
          </el-tab-pane>
          <el-tab-pane lazy label="岗位信息">
            <JobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailByIdAPI, saveUserDetailByIdAPI } from '@/api'
import UserInfo from './cpns/user-info.vue'
import JobInfo from './cpns/job-info.vue'
import Cookie from 'js-cookie'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      accountInfo: {},
      activeName: Cookie.get('tabActive') || 'job',
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, message: '密码不能小于6位！', trigger: 'blur' }

        ]
      }
    }
  },
  created() {
    this.loadEmployeesInfo()
  },
  methods: {
    async loadEmployeesInfo() {
      const data = await getUserDetailByIdAPI(this.$route.params.id)
      this.accountInfo = data
    },
    async UpdateEmployees() {
      // async和await 错误必须用try catch 捕获
      try {
        await this.$refs.form.validate()
        await saveUserDetailByIdAPI(this.accountInfo)
        this.$message.success('更新成功')
      } catch (error) {
        console.log(error)
      }
    },
    tabClick() {
      Cookie.set('tabActive', this.activeName)
    }
  }
}
</script>

<style>

</style>
