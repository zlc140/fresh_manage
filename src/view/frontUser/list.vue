<template>
  <div class="list">
    <!-- form表单 -->
    <div class="search_pro" v-if="!editFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="10" class="margin-top">
           <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('search')">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <!-- table -->
    <el-table :data="tableData" border v-loading="listLoading" v-if="!editFormVisible">
      <el-table-column prop="id " label="用户编号">
        <template scope="scope">
          <span>{{ scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="username " label="用户名">
        <template scope="scope">
          <span>{{ scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="workUnit " label="工作单位">
        <template scope="scope">
          <span>{{ scope.row.workUnit}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="officeTel " label="办公室电话">
        <template scope="scope">
          <span>{{ scope.row.officeTel}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="homePhone  " label="家庭电话">
         <template scope="scope">
            <span>{{ scope.row.homePhone }}</span>
          </template>
      </el-table-column>
      <el-table-column prop="updateTime  " label="上次修改时间">
        <template scope="scope">
          <span>{{ scope.row.updateTime | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime  " label="创建时间">
        <template scope="scope">
          <span>{{ scope.row.createTime | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template scope="scope">
          <el-button type="text" @click="editSubmit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-col :span="24" class="toolbar" v-if="!editFormVisible">
      <el-pagination layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="totalElements" @current-change="handleCurrentChange"> </el-pagination>
    </el-col>
    <!--弹出界面-->
    <dialog-tem :title="title" v-if="editFormVisible" :FormData="FormData" :type="type" @close="close"></dialog-tem>
  </div>
</template>

<script>
import dialogTem from './child/dialog'
import { memberlist } from '@/service/getData'
export default {
  data() {
    return {
      form: {
        username: '',
        id: '',
      },
      listLoading: false,
      tableData: [],
      // 分页
      currentPage1: 1,
      pageSize: 10,
      page: 1,
      totalElements: 0,
      lists: [],
      sels: [],//列表选中列
      // 编辑
      title: '编辑',
      type: 'edit',
      listLoading: false,
      editFormVisible: false,
      FormData: {
        username: '',
        officeTel: '',
        portrait:{
            path:''
          },
        apartment: '',
        homePhone: '',
        birthdate: '',
        birthplace: '',
        userDetail: '',
        education: '',
        graduatedFrom: '',
        workUnit: '',
        blood: ''
      },
    }
  },
  components: {
    dialogTem
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      let _this = this
      let para = {
        page: this.page - 1,
        pageSize: this.pageSize,
        username: this.form.username,      
      }
      this.tableData=[]
      this.totalElements = 0;
      memberlist(para).then((res) => {
        _this.listLoading = false
        if (res.data.state == 200 && res.data.message != '暂无数据') {
          if(res.data.content.content){
              this.tableData = res.data.content.content;
              this.totalElements = res.data.content.totalElements;
          }else{
            this.tableData = []
            this.tableData.push( res.data.content)
            this.totalElements = 1;
          }       
        }
      }).catch(() => {
        _this.listLoading = false
      })
    },
    // 查询
    onSubmit(data) {
      if (data == 'search') {
        this.page = 1
        this.currentPage1 = 1
      }
      this.getList()
    },
    //编辑
    editSubmit: function(row) {
      this.editFormVisible = true;
      this.FormData = {
        username: row.username,//用户名
        officeTel: row.officeTel,//用户办公室电话
        // apartment: row.apartment,//用户住址
        homePhone: row.homePhone,//用户家庭电话
        portrait:row.portrait,//用户头像
        birthdate: row.birthdate,//用户出生日期
        birthplace: row.birthplace,//用户出生地址
        userDetail: row.userDetail,//用户个人简介
        education: row.education,//用户学历
        graduatedFrom: row.graduatedFrom,// 用户毕业学校
        workUnit: row.workUnit,//用户工作单位
        blood: row.blood,//用户血型
      }
      // console.log(this.FormData.portrait.path)
    },
    // 分页
    handleCurrentChange(val) {
      this.page = val
      this.getList()
    },
    close(val) {
      this.getList()
      this.editFormVisible = val
    },
  }
}
</script>

<style>
.list img {
  width: 60px;
  max-height: 60px;
  display: inline-block
}
</style>
