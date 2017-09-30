<template>
  <div class="prolist">
    <!-- form表单 -->
    <div class="toolbar">
    <el-radio-group v-model="radio" @change="handle">
      <el-radio-button label="add">新增商品待审核</el-radio-button>
      <el-radio-button label="edit">编辑商品待审核</el-radio-button>
    </el-radio-group>
    </div>
    <!-- 表格 -->
    <el-table :data="getData" border style="width: 98%" v-loading="listLoading" >
      <!-- <el-table-column type="selection" width="55">
      </el-table-column> -->
      <el-table-column label="商品货号" prop="goods.goodsId" width="180px"> </el-table-column>
      <el-table-column type="expand" prop="goodsPic" label="图片展示">
         <template scope="scope">
            <ul class="imgList ">
              <li v-for="item in scope.row.goods.goodsPic" :key="item.index">
                  <img :src="item.path">
              </li>
            </ul>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="goods.goodsTitle" min-width="120px"> 
         <template scope="scope">
          <span class="onlyOneRow">{{ scope.row.goods.goodsTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属分类" prop="goodsClass" width="110px">
        <template scope="scope">
          <span>{{ scope.row.goods.goodsClass.classTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品单价" align="center" prop="price" width="120px;">
        <template scope="scope">
          <span>{{ scope.row.goods.price.GOODS_MARKET_PRICE | currency }}</span>
        </template>
      </el-table-column>
      <el-table-column label="关键字" prop="goods.keywords" width="110px">
      </el-table-column>
      </el-table-column>
      <el-table-column label="商品审核状态"  width="120px">
        <template scope="scope">
          <span>编辑后待审核</span>
        </template>
      </el-table-column>
      <el-table-column label="上架时间" prop="soldInTime" width="110px">
        <template scope="scope">
          <span class="createTime">{{ scope.row.goods.soldInTime | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下架时间" prop="soldOutTime" width="110px">
        <template scope="scope">
          <span class="createTime">{{ scope.row.goods.soldOutTime | formatDate }}</span>
        </template>  
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template scope="scope">
          <div class="play_box">
            <el-button type="text" @click="check(scope.row,true)">审核通过</el-button>
            <el-button type="text" @click="check(scope.row,false)">不予通过</el-button>
          </div>
        </template>
      </el-table-column>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="totalElements" @current-change="handleCurrentChange"> </el-pagination>
    </el-col>

  </div>
</template>

<script>
 
import { prolist,checkPro,checkEdit,checkAdd } from '@/service/getData'
export default {
  data() {
    return {
      radio:'add',
      checked: true,
      // 分页
      listLoading:false,
      currentPage1: 1,
      pageSize: 10,
      pageNum: 1,
      totalElements: 0,
      // 表格数据
      getData: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {

    getList() {
      let para = {
        pageNum: this.pageNum - 1,
        pageSize: this.pageSize
      }
      this.listLoading = true
      // 表格数据
      if(this.radio == 'add'){
        para.state = 'GOODS_STATE_ON_CHECKING'
        this.getData = []
        let _this = this
        prolist(para).then((res) => {
          console.log(res)
          this.listLoading = false
          if (res.data.state == 200 &&　res.data.content.content) {
              res.data.content.content.forEach(v=>{
                let prop = { goods:v }
                _this.getData.push(prop)
              })
            this.totalElements = res.data.content.totalElements;
          }
        })
      }else{
        para.state = 'MODIFY_GOODS_STATE_ON_CHECKING'
        this.getData = []
          checkPro(para).then((res) => {
              console.log(res)
               this.listLoading = false
              if (res.data.state == 200 &&　res.data.message !='暂无数据') {
                this.getData = res.data.content.content;
                this.totalElements = res.data.content.totalElements;
              }
          })
      }
    },
    check(row,bol){
        let para = {
          result:bol?'success':'failure'
        }
        let _this = this
        if(this.radio == 'add'){
          para.goodsId = row.goods.goodsId
          console.log(para)
            checkAdd(para).then(res => {
              if(res.data.state == 200){
                this.$message('审核成功')
                _this.getList()
              }else{
                 this.$message(res.data.messages)
              }
              
            })
        }else{
          para.modifyGoodsId = row.modifyAttrId
          checkEdit(para).then(res => {
             if(res.data.state == 200){
                this.$message('审核成功')
                _this.getList()
              }else{
                 this.$message(res.data.messages)
              }
            })
        }
        
    },
   
    //  点击分页
    handleCurrentChange(val) {
      this.pageNum = val
      this.getList()
    },
    handle(){
     this.getList()
    }
  }
}
</script>
<style>
.prolist .pro_o .el-form-item {
  margin-bottom: 22px;
  float: left;
}


.prolist .pro_o .section {
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -webkit-flex-grow: 1;
  -ms-flex-grow: 1;
  max-width: calc(100% - 260px);
  padding: 55px 20px 10px;
}

.prolist .pro_o .el-button--primary {
  color: #fff;
  background-color: #20a0ff;
  border-color: #20a0ff;
  margin-left: 40px;
}

.prolist .el-col-5 {
  width: 15%;
}
.prolist .el-dialog--small {
  height: 500px;
}
.prolist .el-col-6 {
    width: 15%;
}
</style>

 
