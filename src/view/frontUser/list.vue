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
          <div class="member_detail">
              <p><span>用户真实姓名：</span>{{ scope.row.member.name?scope.row.member.name:''}} </p>
              <p ><span>工作单位:</span>{{ scope.row.workUnit}}</p>
              <p ><span>办公室电话:</span>{{ scope.row.officeTel}}</p>
              <p ><span>办公室地址: </span>{{ scope.row.officeAddress}}</p>
              <p ><span>营业执照编号:</span>{{ scope.row.businessLicenseSN}}</p>
              <p ><span>组织机构:</span>{{ scope.row.organizationCode}}</p>
              <p ><span>更新时间:</span>{{ scope.row.updateTime | formatDate }}</p>
              <p> <span>创建时间:</span>{{ scope.row.createTime | formatDate}}</p>
         </div>
         <div class="Pic_box">
            <ul class="List ">
              <li v-if="scope.row.businessLicensePic && scope.row.businessLicensePic.path">
                 <img :src="scope.row.businessLicensePic.path"/>  
                 <span>营业执照照片</span> 
                 <span class="doing"><i class="el-icon-view" @click="bigMove(scope.row.businessLicensePic.path)"></i></span> 
                 </li>
              <li v-if="scope.row.organizationCodePic && scope.row.organizationCodePic.path">
                 <img :src="scope.row.organizationCodePic.path"/> 
                 <span>组织机构代码图片</span>
                  <span class="doing"><i class="el-icon-view" @click="bigMove(scope.row.organizationCodePic.path)"></i></span>
                 </li>
              <li v-if="scope.row.portrait &&　scope.row.portrait.path"> 
                <img :src="scope.row.portrait.path"/> <span>头像</span>
                <span class="doing"><i class="el-icon-view" @click="bigMove(scope.row.portrait.path)"></i></span>
                </li>
              <!-- <li v-if="scope.row.member.idCardPic && scope.row.member.idCardPic.path"> 
                <img :src="scope.row.member.idCardPic.path"/> <span>身份证图片</span>
                <span class="doing"><i class="el-icon-view" @click="bigMove(scope.row.member.idCardPic.path)"></i></span>
                </li> -->
            </ul>
         </div>
        </template>
      </el-table-column>
      <!-- 父级 -->
      <el-table-column prop="memberId " label="用户编号" min-width="130px">
        <template scope="scope">
          <span>{{ scope.row.member.memberId}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="username  " label="用户名称">
        <template scope="scope">
          <span>{{ scope.row.member.username}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phone  " label="个人电话" width="120">
        <template scope="scope">
          <span>{{ scope.row.member.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rolesName" label="用户角色" min-width="120">
        <template scope="scope">
          <span>{{ scope.row.rolesName?scope.row.rolesName:''}}</span>
        </template>
      </el-table-column>
       <!-- <el-table-column prop="nickName" label="用户昵称">
        <template scope="scope">
          <span>{{ scope.row.member.nickName}}</span>
        </template>
      </el-table-column> -->
       <el-table-column prop="email  " label="邮箱地址" min-width="120">
        <template scope="scope">
          <span>{{ scope.row.member.email?scope.row.member.email:''}}</span>
        </template>
      </el-table-column>
       <el-table-column prop="state" label="状态">
        <template scope="scope">
          <span>{{ scope.row.state | userstate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime  " label="上次修改时间" width= "160">
        <template scope="scope">
          <span>{{ scope.row.member.updateTime | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime  " label="创建时间" width= "160">
        <template scope="scope">
          <span>{{ scope.row.member.createTime | formatDate}}</span>
        </template>
      </el-table-column>
     <el-table-column label="操作" width="120" align="center" fixed="right">
        <template scope="scope">
          <div class="play_box">
            <el-button type="text" @click="editSubmit(scope.row)">编辑</el-button>
            <el-button type="text" @click="shSubmit(scope.row)" v-show="scope.row.state=='USER_STATE_CHECK_NO'?1:0">设定</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-col :span="24" class="toolbar" v-if="!editFormVisible">
      <el-pagination layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="totalElements" @current-change="handleCurrentChange"> </el-pagination>
    </el-col>
   <!-- 编辑 -->
    <dialog-tem :title="title" v-if="editFormVisible" :FormData="FormData" :type="type" @close="close"></dialog-tem>
 <!--大图查看弹出-->
     <el-dialog class="dialogImgBox" v-model="bigImgShow"   :close-on-click-modal="true">
             <div class="content imgBox">
                 <img :src="bigImg" ref="getImg" />
            </div>
      </el-dialog>
      <!-- 设定弹框 -->
      <el-dialog title="" size="mini" v-model="shFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px">
        <el-form-item label="还款日期" required prop="settlementInterval">
          <el-select v-model="addForm.settlementInterval">
            <el-option v-for="(item,index) in  options" :key="index" :label="item.value" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结账日期" required prop="settlementDate">
          <el-select v-model="addForm.settlementDate">
            <el-option v-for="(item,index) in  options" :key="index" :label="item.value" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="Submit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dialogTem from './child/dialog'
import { memberlist,sdlist,submit } from '@/service/getData'
export default {
  data() {
    return {
      bigImgShow:false,
      bigImg:'',
      form: {
        username: '',
        id: '',
      },
       // 弹框
      shFormVisible: false,
      addForm: {
        settlementInterval: '',
        settlementDate: '',
        userName: '',
      },
      // 出账日期
      options:[],
      rowData:null,
      rolesName:'',
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
      state:'',
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
     for (var i=1;i<=27;i++){
        this.options.push({value:i});
    }
  },
  methods: {
    bigMove(val){
      if(val != '')　{
      this.bigImg = val
      this.bigImgShow = true
      }

    },
    getList() {
      this.listLoading = true
      let _this = this
      let para = {
        page: this.page - 1,
        pageSize: this.pageSize,
        username: this.form.username,      
      }
      
      memberlist(para).then((res) => {
        console.log('TEST',res.data)
        _this.tableData=[]
        _this.totalElements=0
        _this.listLoading = false
        if (res.data.state == 200 && res.data.message != '暂无数据') {
          if(res.data.content.content){
              this.tableData = res.data.content.content;
              // console.log(this.tableData)
              this.totalElements = res.data.content.totalElements;
          }else{
            this.tableData = []
            this.tableData.push( res.data.content)
            this.totalElements = 1;
          }
           this.tableData.forEach(function(child) {
             child.rolesName = ''
             if(child.member.roleList && child.member.roleList.length>0){
               child.member.roleList.forEach((v,index)=> {
                
                 if(  child.rolesName.indexOf(v.name+',') < 0){
                    child.rolesName += v.name + ','
                 } 
               })
               
             }
          child.rolesName = child.rolesName.substr(0,child.rolesName.length-1) 
          // console.log(child.rolesName)
            }, this);   
           
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
     
        this.getContent(row.username)
     
    },
     // 设定
    shSubmit(row) {
     
      let para = {
        memberId: row.member.memberId
      }
      sdlist(para).then((res) => {
        console.log('res' ,res)
         this.shFormVisible = true
         if(res.data.state == 200){
            this.addForm.settlementDate = res.data.content.settlementDate,
            this.addForm.settlementInterval = res.data.content.settlementInterval,
            this.addForm.userName = res.data.content.member.username
          } 
      })
    },
    // 设定提交
    Submit() {
      let para = {
        userName: this.addForm.userName,
        settlementInterval: this.addForm.settlementInterval,
        settlementDate: this.addForm.settlementDate
      }
      if (para.settlementInterval == '') {
        this.$message('请选择还款日期')
        return false
      }
      if (para.settlementDate == '') {
        this.$message('请选择结账日期')
        return false
      }
      submit(para).then((res) => {
        if(res.data.state == 200){
              this.$message('修改成功')
          }else{
            this.$message(res.data.messages)
          }
        this.shFormVisible = false
      })
    },
     getContent(username) {
      let _this = this
      let para = {
        username: username,      
      }
      memberlist(para).then((res) => {
          
        if (res.data.state == 200 && res.data.message != '暂无数据') {
           console.log('edit',res.data)
            let row = res.data.content
            
             _this.FormData = {
                memberId:row.member.memberId,
                username: row.username,//用户名
                name:row.member.name?row.member.name:'',//真实姓名
                nickName:row.member.nickName?row.member.nickName:'',//昵称
                phone:row.member.phone,//个人电话
                eMail:row.member.email?row.member.email:'',
                idCardNo:row.member.idCardNo?row.member.idCardNo:'',
                idCardPicStr:{ path:row.member.idCardPic.path?row.member.idCardPic.path:''},
                organizationCode:row.organizationCode?row.organizationCode:'',//组织机构
                organizationCodePicStr:{
                  path:row.organizationCodePic.path?row.organizationCodePic.path:''
                },
                state:row.state?row.state:'',
                businessLicenseSN:row.businessLicenseSN?row.businessLicenseSN:'',//编号
                businessLicensePicStr:{
                  path:row.businessLicensePic.path?row.businessLicensePic.path:'' 
                },//营业执照图片
                portrait:{
                  path:row.portrait?row.portrait.path:''
                },//用户头像
                workUnit: row.workUnit?row.workUnit:'',//用户工作单位
                officeAddress:row.officeAddress?row.officeAddress:'',//办公室地址
                officeTel: row.officeTel?row.officeTel:'',//用户办公室电话
                roleList:row.member.roleList,//用户角色
              }
              console.log('either', this.FormData )
              _this.editFormVisible = true;
          }
      }).catch(() => {
        _this.listLoading = false
      })
    },
    // 分页
    handleCurrentChange(val) {
      this.page = val
      this.getList()
    },
    close(val) {
      this.editFormVisible = val
      this.getList()
      
    },
  }
}
</script>

 
