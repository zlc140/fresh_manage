<template>
  <div class="brand">
    <!-- form -->
    <el-form :inline="true" :model="form" class="demo-form-inline" v-if="!addFormVisible">
      <el-form-item label="品牌名称">
        <el-input v-model="form.brandTitle" placeholder="品牌名称"></el-input>
      </el-form-item>
       <el-form-item label="所属店铺" v-if="seachMove">
            <el-select v-model="form.storeId" v-on:change="changeStore()" placeholder="请选择店铺">
              <el-option v-for="(item,index) in  storeData" :key="index" :value="item.storeId" :label="item.storeName"> </el-option>
            </el-select>
          </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('search')">查询</el-button>
      </el-form-item>
      <el-form-item class="add">
        <el-button type="primary" :plain="true" @click="handle('add')">新增品牌</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="getData" border style="width: 98%" v-if="!addFormVisible"  v-loading="listLoading" >
       <el-table-column prop="brandPic" type="expand" label="品牌LOGO" width="150" >
        <template scope="scope" >
          <div class="logo_box" v-if="scope.row.brandPic"> 
            <ul class="imgList ">
              <li >
                  <img :src="scope.row.brandPic[0].path">
              </li>
            </ul>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column type="selection" width="55">
      </el-table-column> -->
      <el-table-column prop="brandTitle" label="品牌名称"></el-table-column>
      <el-table-column  label="所属店铺">
        <template scope="scope">
          <span class="price">{{ scope.row.store?scope.row.store.storeName:'' }}</span>
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
              <el-button type="text" @click="closeBrand(scope.row)">关闭品牌</el-button>
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
        :seachMove="seachMove"              
        @close="close"
    ></dialog-tem>
  <!-- 分页 -->
  <el-col :span="24" class="toolbar"  v-if="!addFormVisible">
      <el-pagination layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="totalElements" @current-change="handleCurrentChange"> </el-pagination>        
  </el-col>
 
  </div>
</template>

<script>
import { getStore } from '@/config/storage'
import dialogTem from './prochild/branddia'
import { brandlist, branddelete,selectStore,getMyStore,closeBrand } from '@/service/getData'
export default {
  data() {
    return {
      picShow: false,
      form: {
        brandTitle: '',//品牌名称
        storeId: '',
        state: '',
        
      },
      listLoading:false,
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
      checked: true,
      seachMove:true,
      storeData:[]
    }
  },
  components: {
    dialogTem
  },
  mounted() {
     
    this.picShow = true
     if(getStore('roleName') &&　getStore('roleName').roleCode.indexOf('SELLER')>0){
      this.seachMove = false
      this.getThisStore()
    }else{
       this.getStore()//店铺列表
       this.getbrandlist()//商品列表
    }
  },
  methods: {

    getbrandlist() {
      this.listLoading = true
      let _this = this
      let para = {
        pageNum: this.pageNum - 1,
        pageSize: this.pageSize,
        brandTitle: this.form.brandTitle,
        storeId: this.form.storeId,
      }
      brandlist(para).then((res) => {
        console.log('brand',para)
        _this.listLoading = false
        if(res.data.state == 200){
            _this.getData = res.data.content.content;
             _this.totalElements = res.data.content.totalElements;      
        }
      }).catch(() => {
         _this.listLoading = false
      })
    },
      // 得到店铺
     getStore() {
      let para = {
        state: 'STORE_STATE_CHECK_ON'
      }
      selectStore(para).then((res) => {
        if (res.data.state == 200) {
          this.storeData = res.data.content.content;
          this.storeData.push({
            storeId:'',
            storeName:'全部'
          })
        }

      })
     },
      getThisStore() {
        console.log(0)
        let _this = this
          getMyStore().then(res => {
            console.log('myStore',res)
            if(res.data.state == 200){
                _this.form.storeId = res.data.content.storeId
                _this.getbrandlist()
            }else{
              this.$message('您的店铺还没有审核，请确认是否完善资料！')
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
        if(this.seachMove == true){
          this.FormData.storeId = this.form.storeId
        }
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

   closeBrand(row){
      let prop ={
        brandId:row.brandId
      }
      this.$confirm('品牌关闭后将删除品牌下的商品，确认关闭吗？').then(() => {
        closeBrand(prop).then(res => {
          if(res.data.state == 200){
            this.getbrandlist()
          }
          this.$message(res.data.messages)
          console.log('del',res)
        })
      }).catch(() => {
        console.log('取消')
      })
   }


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
