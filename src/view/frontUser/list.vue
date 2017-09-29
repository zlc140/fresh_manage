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
       <!-- 子级 -->
      <el-table-column type="expand">
        <template scope="scope">
         <p prop="username" label="名称">单位名称: {{'　　　　　'+ scope.row.username}}</p>
         <p prop="workUnit" label="工作单位">工作单位: {{'　　　　　'+ scope.row.workUnit}}</p>
         <p prop="officeTel" label="办公室电话">办公室电话: {{ '　　　　'+scope.row.officeTel}}</p>
         <p prop="officeAddress" label="办公室地址">办公室地址: {{ '　　　　'+scope.row.officeAddress}}</p>
         <p prop="businessLicenseSN" label="营业执照编号">营业执照编号: {{'　　　'+ scope.row.businessLicenseSN}}</p>
         <p prop="organizationCode" label="组织机构">组织机构: {{'　　　　　'+ scope.row.organizationCode}}</p>
         <p prop="birthdate" label="用户出生日期">用户出生日期: {{'　　　'+ scope.row.birthdate}}</p>
         <p prop="updateTime" label="更新时间">更新时间:{{ scope.row.updateTime | formatDate }}</p>
         <p prop="createTime" label="创建时间"> 创建时间:{{ scope.row.createTime | formatDate}}</p>
        </template>
      </el-table-column>
      <!-- 父级 -->
      <el-table-column prop="memberId " label="用户编号" min-width="100px">
        <template scope="scope">
          <span>{{ scope.row.member.memberId}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="username  " label="用户名称">
        <template scope="scope">
          <span>{{ scope.row.member.username}}</span>
        </template>
      </el-table-column>
        <el-table-column prop="homePhone   " label="家庭电话">
        <template scope="scope">
          <span>{{ scope.row.homePhone }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phone  " label="个人电话">
        <template scope="scope">
          <span>{{ scope.row.member.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="真实姓名">
        <template scope="scope">
          <span>{{ scope.row.member.name}}</span>
        </template>
      </el-table-column>
       <el-table-column prop="nickName" label="用户昵称">
        <template scope="scope">
          <span>{{ scope.row.member.nickName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime  " label="上次修改时间">
        <template scope="scope">
          <span>{{ scope.row.member.updateTime | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime  " label="创建时间">
        <template scope="scope">
          <span>{{ scope.row.member.createTime | formatDate}}</span>
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
        businessLicensePicStr:{
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
        blood: '',
        name:'',
        officeAddress:'',
        businessLicenseSN:'',
        organizationCode:'',
        officeAddress:'',
        phone:''
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
      memberlist(para).then((res) => {
          _this.tableData=[]
          _this.totalElements=0
        _this.listLoading = false
        if (res.data.state == 200 && res.data.message != '暂无数据') {
          if(res.data.content.content){
              this.tableData = res.data.content.content;
              // console.log(this.tableData)
              this.tableData.forEach(function(child) {
              }, this);
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
      console.log('cccc',row)
      this.editFormVisible = true;
      this.FormData = {
        username: row.username,//用户名
        organizationCode:row.organizationCode,//组织机构
        businessLicenseSN:row.businessLicenseSN,//编号
        officeTel: row.officeTel,//用户办公室电话
        apartment: row.apartment,//用户住址
        homePhone: row.homePhone,//用户家庭电话
        portrait:row.portrait,//用户头像
        businessLicensePicStr:row.businessLicensePicStr,//营业执照图片
        birthdate: row.birthdate,//用户出生日期
        birthplace: row.birthplace,//用户出生地址
        userDetail: row.userDetail,//用户个人简介
        education: row.education,//用户学历
        graduatedFrom: row.graduatedFrom,// 用户毕业学校
        workUnit: row.workUnit,//用户工作单位
        blood: row.blood,//用户血型
        name:row.member.name,//真实姓名
        nickName:row.member.nickName,//昵称
        phone:row.member.phone,//个人电话
        roleList:row.member.roleList,
        officeAddress:row.officeAddress,//办公室地址
      }
      // console.log(this.FormData)
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
.list .el-table__expanded-cell p{
  font-size: 14px;
  display: inline-block;
  width: 800px;
  float: left;
}
</style>
