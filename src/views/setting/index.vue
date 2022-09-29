<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="first">
          <el-row :gutter="10">
            <el-button
              icon="el-icon-plus"
              type="primary"
              style="margin-left:10px;"
              size="small"
              @click="AddRole"
            >新增角色</el-button>
          </el-row>
          <!-- 表格 -->
          <el-table v-loading="loading" border="" :data="RoleList">
            <el-table-column type="index" label="序号" width="120" />
            <el-table-column prop="name" label="角色名称" width="240" />
            <el-table-column prop="description" label="描述" />
            <el-table-column label="操作" width="240">
              <template slot-scope="scope">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click="edit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页器 -->
          <!--  background 添加背景
           current-page 当前的页面
           page-size 每一页展示的条数
           page-sizes 每页显示个数选择器的选项设置
           total 总共多少条数据
           layout 布局
           current-change 改变当前页码的触发（current-page 值改变的时候触发）
           size-change 改变页面的数据条数的时候 触发（page-size 值改变的时候触发） -->
          <el-row type="flex" :gutter="10" justify="center" align="middle" style="height: 60px">
            <el-pagination
              v-if="total > 0"
              layout="prev,pager,next,sizes,total"
              :total="total"
              background
              :current-page.sync="page.page"
              :page-size.sync="page.pagesize"
              :page-sizes="[2, 3, 5, 6,50]"
              @current-change="getRoleList"
              @size-change="getRoleList"
            />
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="公司信息" name="second">公司信息
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form :model="CompanyInfo" label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="CompanyInfo.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="CompanyInfo.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="CompanyInfo.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="CompanyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <AddRole ref="addrole" :disvisible.sync="disvisible" @refreshList="getRoleList" />
  </div>
</template>

<script>
import { getRoleListAPI, deleteRoleAPI, getCompanyInfoAPI } from '@/api'
import { mapGetters } from 'vuex'
import AddRole from './components/AddRole.vue'
export default {
  name: 'Setting',
  components: {
    AddRole
  },
  data() {
    return {
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 2
      },
      RoleList: [],
      total: 0,
      loading: false,
      disvisible: false,
      CompanyInfo: {}
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      try {
        this.loading = true
        const { total, rows } = await getRoleListAPI(this.page)
        this.RoleList = rows
        this.total = total
        if (this.total > 0 && this.RoleList.length === 0) {
          this.page.page--
          this.getRoleList()
        }
        // console.log(this.RoleList)
      } catch (err) {
        console.log(err.message)
      } finally {
        this.loading = false
      }
    },
    AddRole() {
      this.disvisible = true
    },
    edit(row) {
      this.$refs.addrole.Formdata = { ...row }
      this.disvisible = true
    },
    async del(id) {
      // this.$confirm('删除选中的角色, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   this.$message({
      //     type: 'success',
      //     message: '删除成功!'
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消'
      //   })
      // })
      try {
        await this.$confirm('删除选中的角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteRoleAPI(id)
        this.getRoleList()
        this.$message.success('删除成功~')
      } catch (err) {
        this.$message.error('删除失败！')
        console.log(err)
      }
    },
    async getCompanyInfo() {
      this.CompanyInfo = await getCompanyInfoAPI(this.companyId)
    }
  }
}
</script>

<style>

</style>
