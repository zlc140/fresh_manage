<template>
  <div class="ckStore">
     <!-- 表格 -->
    <el-table :data="storeData" style="width: 100%">
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
      <el-table-column prop="memberId " label="店主编号">
        <template scope="scope">
          <span>{{ scope.row.member.memberId }}</span>
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
          <span>{{ scope.row.regTime | formatDate }}</span>
        </template>
      </el-table-column>
     <el-table-column  label="操作" width="120"  >
      <template scope="scope">
         <div class="play_box">
          <el-button size="small" type="text"  @click="handle('pass',scope.row)">审核通过</el-button>
          <el-button size="small" type="text" @click="handle('npass',scope.row)">审核不通过</el-button>
          </div>
      </template>
    </el-table-column>
    </el-table>
     <!-- 分页 -->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="totalElements" @current-change="handleCurrentChange"> </el-pagination>
    </el-col>
  </div>
</template>

<script>
import { selectStore, updateStore } from '@/service/getData'
export default {
  data() {
    return {
      form: {
        storeName: '',
        storeId: '',
        state: ''
      },
      // 分页
      currentPage1: 1,
      pageSize: 10,
      pageNum: 1,
      totalElements: 0,
      lists: [],
      sels: [],//列表选中列
      //  列表数据
      storeData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      let para = {
        pageNum: this.pageNum - 1,
        pageSize: this.pageSize,
        state:'STORE_STATE_ON_CHECKING'
      }
      selectStore(para).then((res) => {
        this.storeData = res.data.content.content
        this.totalElements = res.data.content.totalElements
      })
    },
     handle(a,row){
      if (a == 'pass') {
        let para = {        
          storeId: row.storeId,
          state:'STORE_STATE_CHECK_ON'
        }
        console.log(para)
        updateStore(para).then((res)=>{
          console.log(res.data)
          this.getList()
         })
      } else if(a=='npass') {
       let para = {     
          storeId: row.storeId,
          state:'STORE_STATE_CHECK_OFF'
        }
         updateStore(para).then((res)=>{
          this.getList()
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
