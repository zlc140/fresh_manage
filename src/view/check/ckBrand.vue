<template>
  <div class="ckbrand">
   <!-- 表格 -->
    <el-table :data="getData" style="width: 100%">
      <el-table-column prop="brandTitle" label="品牌名称"></el-table-column>
      <el-table-column prop="storeId" label="店铺编号">
        <template scope="scope">
          <span class="price">{{ scope.row.store.storeId }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="brandPic" label="品牌LOGO" width="150">
        <template scope="scope">
          <img :src="scope.row.brandPic[0].path" />
        </template>
      </el-table-column>
      <el-table-column prop="state" label="品牌审核状态">
        <template scope="scope">
          <span>{{ scope.row.state | brandstate }}</span>
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
import { brandlist,brandupdate } from '@/service/getData'
export default {
  data() {
    return {
      form: {
        brandTitle: '',//品牌名称
        pics: {
          path: ''
        },//图
        storeId: '',
        state: '',
        brandId: ''
      },
      // 分页
      currentPage1: 1,
      pageSize: 15,
      pageNum: 1,
      totalElements: 0,
      lists: [],
      sels: [],//列表选中列
      //  列表数据
      getData: [],
    }
  },
  mounted() {
    this.getbrandlist()
  },
  methods: {
    getbrandlist() {
      let _this = this
      let para = {
        pageNum: this.pageNum - 1,
        pageSize: this.pageSize,
        state:'BRAND_STATE_ON_CHECKING'
      }
      brandlist(para).then((res) => { 
        _this.getData = res.data.content.content;
        _this.totalElements = res.data.content.totalElements;
      })
    },
    handle(a,row){
      if (a == 'pass') {
        let para = {        
          brandId: row.brandId,
          state:'BRAND_STATE_CHECK_ON'
        }
        brandupdate(para).then((res)=>{
          this.getbrandlist()
         })
      } else if(a=='npass') {
       let para = {     
          brandId: row.brandId,
          state:'BRAND_STATE_CHECK_OFF'
        }
         brandupdate(para).then((res)=>{
          this.getbrandlist()
         })
      }
    },
     close(val) {
      this.getbrandlist()
      this.stateVisible = val
    },
     // 点击分页
    handleCurrentChange(val) {
      this.pageNum = val
      this.getbrandlist()
    },
  }
}
</script>

<style>
 

/* .ckbrand .add {
  float: right;
}

.ckbrand .el-form-item__content {
  line-height: 36px;
  position: relative;
  font-size: 14px;
  width: 300px;
}

.ckbrand .el-dialog--small {
  width: 50%;
  height: 440px;
}

.ckbrand .addlogo {
  width: 100px;
}
*/
.ckbrand img {
  width: 60px;
  height: 60px;
  display: inline-block
}  
</style>
