
<template>
  <div>
    <el-table border :data="getData" style="width: 98%">
      <!-- 表格-->
        <el-table-column label="用户名" prop="username ">
        <template scope="scope">
          <span>{{ scope.row.member.username}}</span>
        </template>
      </el-table-column>
      <el-table-column label="代金券编号" prop="voucherId"> </el-table-column>
      <el-table-column label=" 代金券金额" prop="money">
         <template scope="scope">
            {{scope.row.money | currency}}
          </template>
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
                <el-button type="text" @click="check('pass',scope.row)">审核通过</el-button>
                 <el-button type="text" @click="check('npass',scope.row)">审核不通过</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total,prev,pager,next" :current-page="currentPage1" :page-size='pageSize' :total="total" @current-change="handleCurrentChange">
      </el-pagination>
    </el-col>
  </div>
</template>

<script>
import { voucherlist, checkvoucher} from '@/service/getData'
export default {
  data() {
    return {
      // 分页
      currentPage1: 1,
      pageSize: 15,
      pageNum : 1,
      total: 0,
      lists: [],
      sels: [],//列表选中列
      getData: [],    
    }
  },
  mounted() {
    this.getorderlist()
  },
  methods: {
    getorderlist() {
      let para = {
        pageNum: this.pageNum - 1,
        pageSize: this.pageSize,
         state:'VOUCHER_STATE_ON_CHECKING'
      }
      voucherlist(para).then((res) => {    
            this.getData = res.data.content.content
            this.total = res.data.content.totalElements
      })
    },
    // 审核
    check(a,row){
      if (a == 'pass') {
        let para = {        
          voucherId : row.voucherId ,
          result :'success',
        }
        checkvoucher(para).then((res)=>{
          if(res.data.state == 200){
              this.$message('审核通过')
              this.getorderlist()
          }else{
            this.$message(res.data.messages)
          }
         
         })
      } else if(a=='npass') {
       let para = {     
          voucherId : row.voucherId ,
          result:'failure',
        }
         checkvoucher(para).then((res)=>{
          if(res.data.state == 200){
              this.$message('审核通过')
              this.getorderlist()
          }else{
            this.$message(res.data.messages)
          }
         })
      }
    },
    //  点击分页
    handleCurrentChange(val) {
      this.pageNum = val
      this.getorderlist()
    },
  }
}
</script>

<style>
  
</style>

   

