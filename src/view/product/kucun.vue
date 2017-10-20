<template>
  <div class="kucun">
    <!-- form表单 -->
    <div class="search_pro">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="10" class="margin-top">
          <el-form-item label="商品名称">
            <el-input v-model="form.goodsTitle"></el-input>
          </el-form-item>
          <el-form-item label="商品编号">
            <el-input v-model="form.goodsId"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('search')">查询</el-button>
          </el-form-item>
           
        </el-row>
      </el-form>
    </div>
    <!-- 表格 -->
    <el-table border  :data="getData" style="width: 100%"  v-loading="listLoading">
      <el-table-column label="商品名称" prop="goodsTitle ">
        <template scope="scope">
          <span class="onlyOneRow">{{ scope.row.goodsTitle}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品编号" prop="goodsId ">
        <template scope="scope">
          <span>{{ scope.row.goodsId}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="库存数量" prop="stockNum"　width="140">
        <template scope="scope">
          <span class="edit-box" @click="changNum(scope.$index, scope.row)"> {{ scope.row.goodsStock.stockNum}} <i class="el-icon-edit"></i></span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="所属分类" prop="classTitle" width="160">
        <template scope="scope">
          <span>{{ scope.row.goodsClass.classTitle}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="关键字" prop="classTitle">
        <template scope="scope">
          <span>{{ scope.row.goodsClass.keywords}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="商品单价" prop="GOODS_MARKET_PRICE" >
        <template scope="scope">
          <span>{{ scope.row.price.GOODS_MARKET_PRICE | currency}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--添加分类-->
    <el-dialog title="修改库存" size="mini"  :rules="rules" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" :rules="rules" label-width="80px" ref="editForm">
        <el-form-item label="库存数量" prop="stockNum">
          <el-input type="number" v-model="editForm.stockNum" min="1" step="1" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="editSubmit">提交</el-button>
      </div>
    </el-dialog>
      <!-- 分页 -->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="totalElements" @current-change="handleCurrentChange"> </el-pagination>
    </el-col>
  </div>
</template>

<script>
 import { getStore } from '@/config/storage'
import { prolist,classlist, kucunedit,getMyStore} from '@/service/getData'
export default {
  data() {
     var kcNum = (rule, value, callback) => {
      let par = /^(?!^0*(\.0{1,2})?$)^\d{1,13}(\.\d{1,2})?$/
      let str = value + ''
      if(parseFloat(value) == NaN ){
         callback(new Error('库存格式不正确'))
      }else if (parseFloat(value) < 1) {
        callback(new Error('库存不少于1'))
      } else if (str.indexOf('.') + 1 > 1) {
        callback(new Error('库存应为整数'))
        console.log(parseInt(value))
      } else if (!par.test(value)) {
        callback(new Error('库存格式不正确'))
      }else {
        callback()
      }
    }
    return {
      form: {
        goodsId: '',//货号
        goodsTitle: '',//商品名称
        gclist: '',//菜单
        storeId:''
      },
      // 分页
      listLoading:false,
      currentPage1: 1,
      pageSize:10,
      pageNum: 1,
      totalElements: 0,
      lists: [],
      sels: [],//列表选中列
      // 表格数据
      getData: [],
      // 分类数据
      gcData: [],
      //编辑界面
      editFormVisible: false,
      editFormLoading: false,
      editForm: {
        stockId: '',
        stockNum: ''
      },
      rules:{
        stockNum:[
         { validator: kcNum, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    if(getStore('roleName') &&　getStore('roleName').roleCode.indexOf('SELLER')>0){
      this.seachMove = false
      this.getThisStore()
    }else{
      this.getList()
    }
    
  },
  methods: {
    getList() {
      this.listLoading = true
      let para = {
        pageNum: this.pageNum - 1,
        pageSize: this.pageSize,
        goodsId: this.form.goodsId,
        gclist:this.form.gclist,
        goodsTitle:this.form.goodsTitle
      }
      if(this.form.storeId != ''){
        para.storeId = this.form.storeId
      }
      // 表格数据
      prolist(para).then((res) => {  
        this.listLoading = false
        if (res.data.state == 200) {
          this.getData = res.data.content.content;
          this.totalElements = res.data.content.totalElements;
        }
      }).catch(() => {
        this.listLoading = false
      })
    },
    // 编辑
    changNum(index, row) {
      this.editFormVisible = true;
      this.editForm = {
          stockId: row.goodsStock.stockId,
          stockNum: row.goodsStock.stockNum
      }
    },
     getThisStore() {
        console.log(0)
        let _this = this
          getMyStore().then(res => {
            console.log('myStore',res)
            if(res.data.state == 200){
                _this.form.storeId = res.data.content.storeId
                _this.getList()
            }else{
              this.$message('您的店铺还没有审核，请确认是否完善资料！')
            }
          })
     },
    // 提交
    editSubmit() {
      let _this = this
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.editFormLoading = false;
          this.editFormVisible = false;
          let para = {
            stockId: this.editForm.stockId,
            stockNum: this.editForm.stockNum,
          }
          kucunedit(para).then((res) => {
            this.editFormLoading = true;
            _this.getList()
            this.$refs['editForm'].resetFields()
          })
        }
      });
    },
    // 取消
    clean() {
      if (this.editFormVisible == true) {
        this.editFormVisible = false
        this.$refs['editForm'].resetFields()
      }
    },
    // 查询
    onSubmit(data) {
      if (data == 'search') {
        this.page = 1
        this.currentPage1 = 1
      }
      this.getList()
    },
    //  点击分页
    handleCurrentChange(val) {
      this.pageNum = val
      this.getList()
    },
  }
}
</script>
 

 

 
