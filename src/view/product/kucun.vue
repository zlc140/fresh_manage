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
          <span>{{ scope.row.goodsTitle}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品编号" prop="goodsId ">
        <template scope="scope">
          <span>{{ scope.row.goodsId}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="库存数量" prop="stockNum">
        <template scope="scope">
          <span class="edit-box" @click="changNum(scope.$index, scope.row)"> {{ scope.row.goodsStock.stockNum}} <i class="el-icon-edit"></i></span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="所属分类" prop="classTitle">
        <template scope="scope">
          <span>{{ scope.row.goodsClass.classTitle}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="关键字" prop="classTitle">
        <template scope="scope">
          <span>{{ scope.row.goodsClass.keywords}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="商品单价" prop="GOODS_MARKET_PRICE">
        <template scope="scope">
          <span>{{ scope.row.price.GOODS_MARKET_PRICE | currency}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--添加分类-->
    <el-dialog title="修改库存" size="mini"  :rules="rules" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" :rules="rules" label-width="80px" ref="editForm">
        <el-form-item label="库存数量" prop="stockNum">
          <el-input type="number" v-model="editForm.stockNum" min="1" auto-complete="off"></el-input>
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
import { prolist,classlist, kucunedit} from '@/service/getData'
export default {
  data() {
    var kcNum = (rule, value, callback) => {
      let str = value + ''
      if (parseFloat(value) < 1) {
        callback(new Error('库存不少于1'))
      } else if (str.indexOf('.') + 1 > 1) {
        callback(new Error('库存应为整数'))
      } else {
        callback()
      }
    }
    return {
      form: {
        goodsId: '',//货号
        goodsTitle: '',//商品名称
        gclist: '',//菜单
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
    this.getList()
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
 

 

 
