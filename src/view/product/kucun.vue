<template>
  <div class="kucun">
    <!-- form表单 -->
    <div class="search_pro">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="10" class="margin-top">
          <el-form-item label="商品货号">
            <el-input v-model="form.goodsId"></el-input>
          </el-form-item>
            <el-form-item label="分类名称">
              <el-select v-model="form.gclist">
                <el-option v-for="(item,index) in  gcData" :key="index" :label="item.classTitle" :value="item.classId"> </el-option>
              </el-select>
            </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="form.goodstitle"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('search')">查询</el-button>
          </el-form-item>
           
        </el-row>
      </el-form>
    </div>
    <!-- 表格 -->
    <el-table border  :data="getData" style="width: 100%">
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
          <span>{{ scope.row.price.GOODS_MARKET_PRICE}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--添加分类-->
    <el-dialog title="修改库存" size="mini" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item label="库存数量" prop="stockNum">
          <el-input type="number" v-model="editForm.stockNum" auto-complete="off"></el-input>
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
    return {
      form: {
        goodsId: '',//货号
        goodsTitle: '',//商品名称
        gclist: '',//菜单
      },
      // 分页
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
    }
  },
  mounted() {
    this.getList()
     let _this = this
    classlist().then((res) => {
      if (res.data.state == 200 ) {
        let datas = res.data.content
        // console.log(datas)
        console.log('t',datas)
        _this.gcData = []
        if(datas){
          datas.forEach((child) => {
            _this.gcData.push({
              classId: child.classId,
              classTitle: child.classTitle
            })
            if (child.childClass && child.childClass.length > 0) {
              child.childClass.forEach((item) => [
                _this.gcData.push({
                  classId: item.classId,
                  classTitle: '　　' + item.classTitle
                })
              ])
            }
          })
        }
      }
    })
  },
  methods: {
    getList() {
      let para = {
        pageNum: this.pageNum - 1,
        pageSize: this.pageSize,
        goodsId: this.form.goodsId,
        gclist:this.form.gclist
      }
      // 表格数据
      prolist(para).then((res) => {  
        if (res.data.state == 200) {
          this.getData = res.data.content.content;
          this.totalElements = res.data.content.totalElements;
        }
      })
    },
    // 编辑
    changNum(index, row) {
      console.log(row)
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
<style>
.edit-box{
  cursor: pointer;
}
/* .kucun .el-dialog--small {
  width: 15%;
}

.kucun .el-form-item {
  margin-bottom: 22px;
  width: 300px;
  float: left;
} */
</style>

 
