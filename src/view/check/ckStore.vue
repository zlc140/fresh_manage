<template>
  <div class="ckStore">
     <!-- 表格 -->
    <el-table :data="storeData" border style="width: 100%"  v-loading="listLoading" >
      <el-table-column prop="storeName" label="店铺名称"> </el-table-column>
       <el-table-column type="expand" prop="businessLicense" label="图片展示">
              <template scope="scope">
                     <img :src="scope.row.businessLicense.path" />
              </template>
        </el-table-column>
      <el-table-column prop="storeId " label="店铺编号">
        <template scope="scope">
          <span>{{ scope.row.storeId }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="memberId " label="店主">
        <template scope="scope">
          <span>{{ scope.row.member.username }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state " label="店铺状态">
        <template scope="scope">
          <span>{{ scope.row.state | storestate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="businessLicenseNo" label="公司执照编号"></el-table-column>
      <el-table-column prop="regTime" label="公司成立时间">
        <template scope="scope">
          <span>{{ scope.row.regTime | formatDate2 }}</span>
        </template>
      </el-table-column>
     <el-table-column  label="操作" width="120"  >
      <template scope="scope">
         <div class="play_box">
          <el-button size="small" type="text"  @click="putRole(scope.row)">审核通过</el-button>
          <el-button size="small" type="text" @click="handle('npass',scope.row)">审核不通过</el-button>
          </div>
      </template>
    </el-table-column>
    </el-table>
    <!-- 弹出权限 -->
      <el-dialog title="设置商家角色" size="mini" v-model="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="80px" :rules="rules" ref="ruleForm">
          <el-form-item label="添加角色" required prop="settlementDate">
              <el-select v-model="editForm.roleId">
                <el-option v-for="(item,index) in  roleLists" :key="index" :label="item.name" :value="item.id"> </el-option>
              </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click.native="addSubmit">提交</el-button>
        </div>
    </el-dialog>
     <!-- 分页 -->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="totalElements" @current-change="handleCurrentChange"> </el-pagination>
    </el-col>
  </div>
</template>

<script>
import { selectStore, updateStore,rolelist,memberadd } from '@/service/getData'
export default {
  data() {
    return {
      form: {
        storeName: '',
        storeId: '',
        state: ''
      },
      // 分页
      listLoading:false,
      currentPage1: 1,
      pageSize: 15,
      pageNum: 1,
      totalElements: 0,
      lists: [],
      sels: [],//列表选中列
      //  列表数据
      storeData: [],
      editForm:{
          roleId:'',
          username:''
      },
      rules:{
          roleId:[
            {required:true,message:'商家角色不能为空',trigger:'blur'}
          ]
      },
      roleLists:[],
      editFormVisible:false
     
    }
  },
  mounted() {
    this.getList()
    this. getRoles()
  },
  methods: {
    
     getRoles() {
      rolelist().then((res) => {
        console.log('role',res)
        if (res.data.state == 200) {
          this.roleLists = res.data.content.filter(v => v.roleCode.indexOf('SELLER')>0)
        }
      })
    },
    addSubmit(){
      this.$refs.ruleForm.validate((valid) => {
      if(valid) {
      console.log(this.editForm)
      let _this = this
      let para = {
        username:this.editForm.username,
        roleId:this.editForm.defaultRole+this.editForm.roleId,
      } 
      console.log(para)
        if(this.editForm.roleId !=''){
          memberadd(para).then(res => {
            console.log('addRole',res)
            if(res.data.state == 200){
                _this.handle('pass',_this.editForm)
            }else{
              this.editFormVisible = false
              this.$message(res.data.messages)
            }
          })
        }else{
          this.$message('请选择角色')
        }
         }
      })
    },
    putRole(row){
      console.log('edit',row)
      let defaultRole = ''
      if(row.member.roleList && row.member.roleList.length>0){
        row.member.roleList.forEach(v => {
          if(defaultRole.indexOf(v.id) < 0){
            defaultRole += v.id+','
          }
        })
      }
      this.editForm = {
        username:row.member.username,
        roleId:'',
        storeId:row.storeId,
        defaultRole:defaultRole
      }
        this.editFormVisible = true
    },
    getList() {
      this.listLoading = true
      let para = {
        pageNum: this.pageNum - 1,
        pageSize: this.pageSize,
        state:'STORE_STATE_ON_CHECKING'
      }
      selectStore(para).then((res) => {
        console.log('store',res)
         this.listLoading = false
         if(res.data.state == 200){
            this.storeData = res.data.content.content
            this.totalElements = res.data.content.totalElements
        }else{
          this.$message(res.data.messages)
        }
      })
    },
     handle(a,row){
        this.listLoading = true
      if (a == 'pass') {
        let para = {        
          storeId: row.storeId,
          state:'STORE_STATE_CHECK_ON'
        }
        console.log(para)
        updateStore(para).then((res)=>{
           this.listLoading = false
            this.editFormVisible = false
          console.log(res.data)
          if(res.data.state == 200){
            this.$message('审核成功')
            this.getList()
          }else{
            this.$message(res.data.messages)
          }
         
         })
      } else if(a=='npass') {
       let para = {     
          storeId: row.storeId,
          state:'STORE_STATE_CHECK_OFF'
        }
         updateStore(para).then((res)=>{
           this.listLoading = false
          if(res.data.state == 200){
            this.$message('审核成功')
            this.getList()
          }else{
            this.$message(res.data.messages)
          }
         })
      }
    },
    close(val) {
      this.getList()
      this.addFormVisible = val
    }, 
    //  点击分页
    handleCurrentChange(val) {
      this.pageNum = val
      this.getList()
    },
  }
}
</script>

<style>

</style>
