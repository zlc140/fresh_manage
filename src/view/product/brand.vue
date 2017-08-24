<template>
  <div class="brand">
    <!-- form -->
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="品牌名称">
        <el-input v-model="form.brandTitle" placeholder="品牌名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('search')">查询</el-button>
      </el-form-item>
      <div class="add">
      <el-form-item>
        <el-button type="primary" @click="addOne">新增</el-button>
      </el-form-item>
      </div>
    </el-form>
    <!-- 表格 -->
    <template>
      <el-checkbox v-model="checked">全选</el-checkbox>
</template>
  <el-table :data="getData" style="width: 100%">
     <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column  prop="brandTitle"  label="品牌名称"></el-table-column>
    <el-table-column  prop="brandId"  label="店铺编号"></el-table-column>
    <el-table-column prop="pics"  label="品牌LOGO">

    </el-table-column>
    <el-table-column prop="state"  label="状态">
       <template scope="scope">
  <span>
    {{ scope.row.state | brandstate }}</span>
</template>
    </el-table-column>
     <el-table-column  label="操作" width="120"  >
      <template scope="scope">
  <a> 编辑 </a>
  <a>删除</a>
</template>
    </el-table-column>
  </el-table>
  <!-- 新增 -->
  <div>
   <el-dialog title="添加分类" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm"  label-width="80px" ref="addForm">
        <el-form-item label="分类名称" prop="classTitle">
          <el-input v-model="addForm.brandTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="brandPics">
          
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="clean">取消</el-button>
        <el-button type="primary">提交</el-button>
      </div>
    </el-dialog>
    </div>
  <!-- 分页 -->
  <el-col :span="24" class="toolbar">
      <el-pagination layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="totalElements" @current-change="handleCurrentChange"> </el-pagination>        
  </el-col>
 
  </div>
</template>

<script>
import { brandlist } from '@/service/getData'
export default {
  data() {
    return {
      form: {
        brandTitle: '',//品牌名称
        brandPics: [''],//图片
        brandId: 12,
        state: ''
      },
      // 新增
       addFormVisible: true,
       addLoading: false,
       addForm:{
         brandTitle: '',//品牌名称
         brandPics: [''],//图片
       },
       // 分页
      currentPage1:1,
      pageSize: 2,
      pageNum: 1,
      totalElements: 0,
      lists: [],
      sels: [],//列表选中列
      getData: [],
      checked: true
    }
  },
  mounted() {
    this.getbrandlist()
  },
  methods: {
    getbrandlist() {
       let para={
            pageNum: this.pageNum-1,
            pageSize:this.pageSize,
            brandTitle:this.form.brandTitle
      }
      brandlist(para).then((res) => {
        this.getData = res.data.content.content;
         this.totalElements=res.data.content.totalElements;
      })
    },
      // 新增
    addOne() {
        this.addFormVisible = true;
        this.addForm= {
          brandTitle: '',//品牌名称
          brandPics: [''],//图片
      }
    },
      // 取消
    clean() {
      if (this.addFormVisible == true) {
        this.addFormVisible = false
      }
    },
    // 查询
    onSubmit(data){
      if(data=='search'){
            this.page = 1
            this.currentPage1 = 1
      }    
           this.getbrandlist()
    },
    // 点击分页
     handleCurrentChange(val){
      this.pageNum = val
      this.getbrandlist()
    },
  }
}
</script>

<style>
.brand .el-table tr {
  background-color: #fff;
  height: 80px;
}
.brand .add{
  float: right;
}
.brand .el-form-item__content {
    line-height: 36px;
    position: relative;
    font-size: 14px;
    width: 300px;
}
.brand .el-dialog--small {
    width: 50%;
    height: 440px;
}
.brand .el-dialog__footer {
    padding: 160px 20px 15px;
    text-align: right;
    box-sizing: border-box;
}
</style>
