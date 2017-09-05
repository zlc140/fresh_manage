<template>
  <div class="brand">
    <!-- form -->
    <el-form :inline="true" :model="form" class="demo-form-inline toolbar" v-if="!addFormVisible">
      <el-form-item label="品牌名称">
        <el-input v-model="form.brandTitle" placeholder="品牌名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('search')">查询</el-button>
      </el-form-item>
      <el-form-item class="add">
        <el-button type="primary" :plain="true" @click="handle('add')">新增品牌</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="getData" border style="width: 100%" v-if="!addFormVisible">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="brandTitle" label="品牌名称"></el-table-column>
      <el-table-column prop="storeId" label="店铺名称">
        <template scope="scope">
          <span class="price">{{ scope.row.store.storeName }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="storeId" label="所属分类">
        <template scope="scope">
          <span class="price">{{ scope.row.store.storeName }}</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="brandPic" type="expand" label="品牌LOGO" width="150" >
        <template scope="scope" >
          <div class="logo_box" v-if="scope.row.brandPic"> 
            <img :src="scope.row.brandPic[0].path" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="品牌审核状态">
        <template scope="scope">
          <span>
            {{ scope.row.state | brandstate }}</span>
        </template>
            </el-table-column>
        <el-table-column  label="操作" width="120"  >
          <template scope="scope">
            <div class="play_box">
                <el-button type="text" @click="handle( scope.row)">编辑</el-button>
                <el-button type="text" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
  </el-table>
   <!--弹出界面 新增or编辑-->
    <dialog-tem
        :title="title"
        v-if="addFormVisible"
        :FormData="FormData"
        :type="type"              
        @close="close"
    ></dialog-tem>
  <!-- 分页 -->
  <el-col :span="24" class="toolbar"  v-if="!addFormVisible">
      <el-pagination layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="totalElements" @current-change="handleCurrentChange"> </el-pagination>        
  </el-col>
 
  </div>
</template>

<script>

import dialogTem from './prochild/branddia'
import { brandlist, addbrand, branddelete, brandupdate } from '@/service/getData'
export default {
  data() {
    return {
      picShow: false,
      form: {
        brandTitle: '',//品牌名称
        pics: {
          path: ''
        },//图
        storeId: '',
        state: '',
        brandId: ''
      },
      // 新增编辑
      title: '新增',
      type: 'add',
      length: 1,
      listLoading: false,
      addFormVisible: false,//新增界面是否显示
      FormData: {
        storeId: '',
        brandId: '',
        brandTitle: '',//品牌名称
        pics: {
          path: ''
        },
      },
      // 删除
      listLoding: false,
      // 分页
      currentPage1: 1,
      pageSize: 10,
      pageNum: 1,
      totalElements: 0,
      lists: [],
      sels: [],//列表选中列
      getData: [],
      checked: true
    }
  },
  components: {
    dialogTem
  },
  mounted() {
    this.getbrandlist()
    this.picShow = true
  },
  methods: {

    getbrandlist() {
      let _this = this
      let para = {
        pageNum: this.pageNum - 1,
        pageSize: this.pageSize,
        brandTitle: this.form.brandTitle,
        storeId: this.form.storeId,
        brandId: this.form.brandId
      }
      brandlist(para).then((res) => {
        console.log(res.data)
        if(res.data.state == 200){
          if(res.data.content.content){
            _this.getData = res.data.content.content;
          }            
            _this.totalElements = res.data.content.totalElements;
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
          storeId: '',
          brandTitle: '',//品牌名称
          pics:[],
          
        };
      } else {
        this.type = 'edit'
        this.title = '编辑'
        this.FormData = {
          storeId: row.store.storeId,
          brandTitle: row.brandTitle,
          brandId: row.brandId,
          pics: row.brandPic
        };
      }

    },
    close(val) {
      this.getbrandlist()
      this.addFormVisible = val
    },
    // 删除
    handleDel(index, row) {
      let _this = this
      this.$confirm('确认删除该记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoding = true;
        let para = { brandId: row.brandId }
        branddelete(para).then((res) => {
          this.listLoding = false;
          if (res.data.state == '200') {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            _this.getbrandlist()
          } else if (res.data == '') {
            this.$message('登录超时，请重新登录')
          } else {
            this.$message('系统出错')
          }
        }).catch((res) => {
          console.log(res.data)
        })
      })
    },

    // 查询
    onSubmit(data) {
      if (data == 'search') {
        this.page = 1
        this.currentPage1 = 1
      }
      this.getbrandlist()
    },
    // 点击分页
    handleCurrentChange(val) {
      this.pageNum = val
      this.getbrandlist()
    },

    // Success() {
    //   this.getbrandlist()
    // },

  }
}
</script>

<style>

.brand .add {
  float: right;
}

/* .brand .el-form-item__content {
  line-height: 36px;
  position: relative;
  font-size: 14px;
  width: 300px;
} */

/* .brand .el-dialog--small {
  width: 50%;
  height: 440px;
} */

.brand .addlogo {
  width: 100px;
}
/* .logo_box{
  width:100px;
  max-height: 100px;
  overflow: hidden;
}
 .logo_box img{
   width:100%;
   height: auto;margin-top: 50%;
   transform: translateY(-50%);
 } */
</style>
