 
 <template>
  <div class="list">
    <!-- form表单 -->
    <div class="toolbar">
      <el-radio-group v-model="radio" @change="handle">
        <el-radio-button label="zh">待审核</el-radio-button>
        <el-radio-button label="Yes">审核通过</el-radio-button>
        <el-radio-button label="No">审核不通过</el-radio-button>
      </el-radio-group>
    </div>
     <!-- 审核通过&审核不通过 -->
      <el-table :data="tableData" border v-loading="listLoading" v-if="Yshow">
      <!-- 子级 -->
      <el-table-column type="expand">
         <template scope="scope">
          <div class="member_detail">
              <p><span>用户角色：</span>{{ scope.row.rolesName?scope.row.rolesName:''}} </p>
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
              <li v-if="scope.row.businessLicensePic && scope.row.businessLicensePic.path"> <img :src="scope.row.businessLicensePic.path"/>  <span>营业执照照片</span> </li>
              <li v-if="scope.row.organizationCodePic && scope.row.organizationCodePic.path"> <img :src="scope.row.organizationCodePic.path"/> <span>组织机构代码图片</span></li>
              <li v-if="scope.row.portrait &&　scope.row.portrait.path"> <img :src="scope.row.portrait.path"/> <span>头像</span></li>
              <li v-if="scope.row.member.idCardPic && scope.row.member.idCardPic.path"> <img :src="scope.row.member.idCardPic.path"/> <span>身份证图片</span></li>
            </ul>
         </div>
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
    </el-table>
    <!-- 待审核 -->
    <el-table :data="tableData" border v-loading="listLoading" v-if="show">
      <!-- 子级 -->
      <el-table-column type="expand">
        <template scope="scope">
          <div class="member_detail">
              <p><span>用户角色：</span>{{ scope.row.rolesName?scope.row.rolesName:''}} </p>
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
              <li v-if="scope.row.businessLicensePic && scope.row.businessLicensePic.path"> <img :src="scope.row.businessLicensePic.path"/>  <span>营业执照照片</span> </li>
              <li v-if="scope.row.organizationCodePic && scope.row.organizationCodePic.path"> <img :src="scope.row.organizationCodePic.path"/> <span>组织机构代码图片</span></li>
              <li v-if="scope.row.portrait &&　scope.row.portrait.path"> <img :src="scope.row.portrait.path"/> <span>头像</span></li>
              <li v-if="scope.row.member.idCardPic && scope.row.member.idCardPic.path"> <img :src="scope.row.member.idCardPic.path"/> <span>身份证图片</span></li>
            </ul>
         </div>
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
          <div class="play_box">
            <el-button type="text" @click="checkY(scope.row)">审核通过</el-button>
            <el-button type="text" @click="checkN(scope.row)">审核不通过</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹框 -->
    <el-dialog title="" size="mini" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="rules">
        <el-form-item label="多久付账" prop="settlementInterval" required>
          <el-input type="text" v-model="addForm.settlementInterval" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="出账日期" required prop="settlementDate">
            <el-select v-model="addForm.settlementDate">
              <el-option v-for="(item,index) in  options" :key="index" :label="item.id" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="addSubmit">提交</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' 

:total="totalElements" @current-change="handleCurrentChange"> </el-pagination>
    </el-col>
  </div>
</template>

<script>
import { memberState, checkMember, adduser } from '@/service/getData'
export default {
  data() {
     var nospace = (rule, value, callback) => {
      if (value.trim() == '') {
        callback(new Error('不能输入一串空字符'))
      } else {
        callback()
      }
    };
    return {
      radio: 'zh',
      show:true,
      Yshow:false,
      form: {
        username: '',
        id: '',
      },
       // 出账日期
      options: [
        { id: '1',value: '1'}, {id: '2',value: '2'},{ id: '3',value: '3'},{id: '4',value: '4'},{id:'5',value: '5'},
        { id: '6',value: '6'}, {id: '7',value: '7'},{id: '8',value: '8'},{id: '9',value: '9'},{id:'10',value: '10' },{id: 

'11',value: '11'}, { id: '12',value: '12'
        },{id: '13',value: '13'},{ id: '14',value: '14'},{id:'15',value: '15'}, {id: '16',value: '16'}, { id: '17',value: 

'17'},
        { id: '18',value: '18'},{id: '19',value: '19'},{id:'20',value: '20'},{id: '21',value: '21'},{ id: '22',value: 

'22'},{id:'23',value: '23'}, 
        {id: '24',value: '24'}, { id: '25',value: '25'},{ id: '26',value: '26'},{id: '27',value: '27'},

{id:'28',value:'28'}
      ],
      // 弹框
      editFormVisible: false,
      addForm: {
        settlementInterval: '',
        settlementDate: '',
        userName: '',
      },
       rules: {
        settlementInterval: [
          { validator: nospace, trigger: 'blur' }
        ],
        settlementDate: [
          { validator: nospace, trigger: 'blur' }
        ],
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      listLoading: false,
      tableData: [],
      // 分页
      currentPage1: 1,
      pageSize: 10,
      page: 1,
      totalElements: 0,
      lists: [],
      type: 'edit',
      listLoading: false,

    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      let para = {
        page: this.page - 1,
        pageSize: this.pageSize,
      }
      if (this.radio == 'zh') {
        this.show=true
        this.Yshow=false,
        para.state = 'USER_STATE_CHECK_ING'
      } else if (this.radio == 'Yes') {
         this.show=false,
         this.Yshow=true,
        para.state = 'USER_STATE_CHECK_NO'
      } else {     
         this.show=false,
         this.Yshow=true,
        para.state = 'USER_STATE_CHECK_OFF'
      }
      this.tableData = []
      let _this = this
      memberState(para).then((res) => {
        console.log('member',res)
        _this.listLoading = false
        if (res.data.state == 200 && res.data.message != '暂无数据') {
          if (res.data.content.content) {
            _this.tableData = res.data.content.content;
            console.log(_this.tableData)
            _this.totalElements = res.data.content.totalElements;
          } else {
            _this.tableData = []
            _this.tableData.push(res.data.content)
            _this.totalElements = 1;
          }
        }
      }).catch(() => {
        _this.listLoading = false
      })
    },
    // form表单按钮审核通过&审核不通过
    handle() {
      this.getList()
    },
    // 审核不通过
    checkN(row) {
      let para = {
        username: row.username,
        state: 'USER_STATE_CHECK_OFF'
      }
      checkMember(para).then((res) => {
        if (res.data.state == 200) {
          this.$message('审核成功！')
          this.getList()
        }
      })
    },
    // 审核通过
    checkY(row) {
      this.editFormVisible = true
      this.addForm = {
        settlementInterval: '',
        settlementDate: '',
        userName: row.username,
      }
    },
    // 提交
    addSubmit() {
      let para = {
        userName: this.addForm.userName,
        settlementInterval: this.addForm.settlementInterval,
        settlementDate: this.addForm.settlementDate
      }
      console.log(para)
      if(para.settlementInterval==''){
          this.$message('出账后多久付账不能为空')
          return false
      }
      if(para.settlementDate==''){
         this.$message('出账日期')
          return false
      }
      adduser(para).then((res) => {
        if (res.data.state == 200) {
          let prop = {
            username: para.userName,
            state: 'USER_STATE_CHECK_NO'
          }
          checkMember(prop).then((res) => {
            if (res.data.state == 200) {
              this.$message('审核成功！')
              this.getList()
              this.editFormVisible = false
            }
          })
        }
      })
    },
    // 分页
    handleCurrentChange(val) {
      this.page = val
      this.getList()
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

.list .add {
  margin-bottom: 10px;
  float: right;
}

.list img {
  width: 60px;
  max-height: 60px;
  display: inline-block
}

.list .el-table__expanded-cell p {
  font-size: 14px;
  display: inline-block;
  width: 800px;
  float: left;
}

.list .el-dialog__body {
  padding: 10px 20px;
  color: #48576a;
  font-size: 14px;
}

.list .el-dialog__footer {
  padding: -5px 20px 15px;
  text-align: right;
  box-sizing: border-box;
}
.list .el-dialog {
    position: absolute;
    left: 50%;
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    margin-bottom: 50px;
    width: 450px;
}
.list .el-input {
    position: relative;
    font-size: 14px;
    width: 300px;
}
</style>
