 
 <template>
  <div class="list">
    <!-- form表单 -->
     
    <el-table :data="tableData" border v-loading="listLoading" >
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
          <div class="play_box">
          <el-button type="text" @click="checkUser(scope.row,true)">审核通过</el-button>
          <el-button type="text" @click="checkUser(scope.row,false)">审核不通过</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-col :span="24" class="toolbar" >
      <el-pagination layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="totalElements" @current-change="handleCurrentChange"> </el-pagination>
    </el-col>
  </div>
</template>

<script>
import { memberState,checkMember } from '@/service/getData'
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
      let _this = this
      let para = {
        page: this.page - 1,
        pageSize: this.pageSize,
        state: 'USER_STATE_CHECK_ING',   //审核中   
      }
      this.tableData=[]
      this.totalElements = 0;
      memberState(para).then((res) => {
        _this.listLoading = false
        console.log(res)
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
    
    // 分页
    handleCurrentChange(val) {
      this.page = val
      this.getList()
    },
    checkUser(row,ck){
      let _this = this
      
      let prop = {
        username:row.username,
        state:' USER_STATE_CHECK_NO'
      }
      if(ck == true){
        prop.state = ' USER_STATE_CHECK_NO'
      }else{
         prop.state = ' USER_STATE_CHECK_OFF'
      }
      checkMember(prop).then(res => {
        if(res.data.state == 200){
           this.$message('审核成功！')
           _this.getList()
        }
        
      })
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
