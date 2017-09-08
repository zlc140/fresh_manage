 <template>
  <div class="voucher">
    <!-- form -->
    <el-form :inline="true" :model="form" class="demo-form-inline" v-if="!addFormVisible">
       <el-form-item label="用户名">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="代金券编号">
        <el-input v-model="form.voucherId"></el-input>
      </el-form-item>
       <el-form-item label="代金券状态">
            <el-select v-model="form.state">
              <el-option v-for="(item,index) in  options" :key="index" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('search')">查询</el-button>
      </el-form-item>
      <el-form-item class="add">
        <el-button type="primary" :plain="true" @click="handle('add')">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="getData" style="width: 98%" v-if="!addFormVisible">
      <!-- 表格-->
        <el-table-column label="用户名" prop="username ">
        <template scope="scope">
          <span>{{ scope.row.member.username}}</span>
        </template>
      </el-table-column>
      <el-table-column label="代金券编号" prop="voucherId"> </el-table-column>
      <el-table-column label=" 代金券金额" prop="money">
      </el-table-column>
      <el-table-column label="代金券描述" prop="description" min-width="100px">
      </el-table-column>
      <el-table-column label=" 代金券生效时间" prop="effectiveTime">
        <template scope="scope">
          <span>{{ scope.row.effectiveTime | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="代金券使用期限" prop="indate ">
        <template scope="scope">
          <span>{{ scope.row.indate | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="代金券状态" prop="state">
        <template scope="scope">
          <span>{{ scope.row.state | voucherType}}</span>
        </template>
      </el-table-column>
       <el-table-column  label="操作" width="120"  >
          <template scope="scope">
            <div class="play_box">
                <el-button type="text" @click="handle( scope.row)">编辑</el-button>
                <el-button type="text" @click="handleDel(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-col :span="24" class="toolbar" v-if="!addFormVisible">
      <el-pagination layout="total,prev,pager,next" :current-page="currentPage1" :page-size='pageSize' :total="total" @current-change="handleCurrentChange">
      </el-pagination>
    </el-col>
     <!--弹出界面 新增or编辑-->
    <dialog-tem :title="title" v-if="addFormVisible" :FormData="FormData" :type="type" @close="close"></dialog-tem>
  </div>
</template>
<script>
import dialogTem from './child/dialog'
import { voucherlist, addvoucher, editvoucher,delvoucher } from '@/service/getData'
export default {
  data() {
    return {
      // form
      form: {
        voucherId: '',
        state:'',
        userName:''
      },
      // 分页
      currentPage1: 1,
      pageSize: 3,
      pageNum : 1,
      total: 0,
      lists: [],
      sels: [],//列表选中列
      getData: [],
      // 新增编辑
      title: '新增',
      type: 'add',
      length: 1,
      listLoading: false,
      addFormVisible: false,//新增界面是否显示
      FormData: {
        money: '',
        memberId: '',
        description: '',//品牌名称
        effectiveTime: '',
        indate: ''
      },
       // 代金券状态
      options: [
        {
          value: 'VOUCHER_STATE_ON_CHECKING',
          label: '待审核'
        }, {
          value: 'VOUCHER_STATE_CHECK_ON',
          label: '审核通过'
        }, {
          value: 'VOUCHER_STATE_CHECK_OFF',
          label: '审核不通过'
        }, {
          value: 'VOUCHER_STATE_OV_ERDUE',
          label: '代金券过期'
        },{
           value: 'VOUCHER_STATE_USED',
          label: '代金券已使用'
        }
      ],
    }
  },
  components: {
    dialogTem
  },
  mounted() {
    this.getorderlist()
  },
  methods: {
    getorderlist() {
      let _this = this
      let para = {
        pageNum: this.pageNum - 1,
        pageSize: this.pageSize,
        voucherId:this.form.voucherId,
        state:this.form.state,
        userName:this.form.userName
      }
      _this.getData=[]
      _this.total =0
      voucherlist(para).then((res) => {    
          if(res.data.state == 200){
            _this.getData = res.data.content.content
            _this.total = res.data.content.totalElements
          }
      })
    },
    //   弹框
    handle: function(row) {
      this.addFormVisible = true;
      if (row == 'add') {
        this.type = 'add'
        this.title = '新增'
        this.FormData = {
          money: '',
          memberId: 'M20170808155929199',
          description: '',//品牌名称
          effectiveTime: '',
          indate: '',
          userName:''
        };
      } else {
        this.type = 'edit'
        this.title = '编辑'
        this.FormData = {
             voucherId :row.voucherId ,
             money :row.money ,
             memberId :row.memberId ,
             description :row.description ,
             effectiveTime :row.effectiveTime ,
             indate :row.indate,
             userName:row.member.username 
        };
      }
    },
    // 删除
    handleDel(row){
        this.listLoding = true;
        let para = { voucherId : row.voucherId}
        delvoucher(para).then((res)=>{
             if (res.data.state == '200') {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
           this.getorderlist()
        }
        })
    },
     // 查询
    onSubmit(data) {
      if (data == 'search') {
        this.pageNum = 1
        this.currentPage1 = 1
      }
      this.getorderlist()
    },
    //  点击分页
    handleCurrentChange(val) {
      this.pageNum = val
      console.log(val)
      this.getorderlist()
    },
    close(val) {
      this.getorderlist()
      this.addFormVisible = val
    },
  }
}
</script>

<style>
.voucher .add{
  float: right;
  margin-right: 39px
}
</style>
