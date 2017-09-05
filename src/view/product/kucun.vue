<template>
  <div class="kucun">
    <!-- form表单 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-row :gutter="10" class="margin-top">
        <el-form-item label="商品货号">
          <el-input v-model="form.goodsId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('search')">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <!-- 表格 -->
    <el-table :data="getData" style="width: 100%">
      <el-table-column label="商品名称" prop="goodsTitle ">
        <template scope="scope">
          <span>{{ scope.row.goods.goodsTitle}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品编号" prop="goodsId ">
        <template scope="scope">
          <span>{{ scope.row.goods.goodsId}}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存数量" prop="stockNum">
        <template scope="scope">
          <span @click="editd(scope.$index, scope.row)">{{ scope.row.stockNum}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属分类" prop="classTitle">
        <template scope="scope">
          <span>{{ scope.row.goods.goodsClass.classTitle}}</span>
        </template>
      </el-table-column>
      <el-table-column label="关键字" prop="classTitle">
        <template scope="scope">
          <span>{{ scope.row.goods.goodsClass.keywords}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品单价" prop="GOODS_MARKET_PRICE">
        <template scope="scope">
          <span>{{ scope.row.goods.price.GOODS_MARKET_PRICE}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--添加分类-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item label="库存数量" prop="stockNum">
          <el-input v-model="editForm.stockNum" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="clean">取消</el-button>
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
import { kucunlist, kucunedit} from '@/service/getData'
export default {
  data() {
    return {
      form: {
        goodsId: '',//货号
        goodsTitle: '',//商品名称
        gclist: '',//菜单
      },
      // 分页
      currentPage1: 1,
      pageSize: 2,
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
        goodsId: '',
        stockNum: ''
      },
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
        goodsId: this.form.goodsId,
      }
      // 表格数据
      kucunlist(para).then((res) => {  
        if (res.data.state == 200) {
          this.getData = res.data.content.content;
          this.totalElements = res.data.content.totalElements;
        }
      })
    },
    // 编辑
    editd(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row)
    },
    // 提交
    editSubmit() {
      let _this = this
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.editFormLoading = false;
          this.editFormVisible = false;
          let para = {
            goodsId: this.editForm.goods.goodsId,
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
<style>
.kucun .el-dialog--small {
  width: 15%;
}

.kucun .el-form-item {
  margin-bottom: 22px;
  width: 300px;
  float: left;
}
</style>

 
