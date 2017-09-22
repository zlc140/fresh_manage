<template>
  <div class="prolist">
    <!-- form表单 -->
    <div class="search_pro toolbar">
      <el-form ref="form"  :model="form" label-width="80px">
        <el-row :gutter="10" class="margin-top">
            <el-form-item label="商品名称">
            <el-input v-model="form.goodsTitle"></el-input>
          </el-form-item>
           <el-form-item label="商品货号">
            <el-input v-model="form.goodsId"></el-input>
          </el-form-item>
          <el-form-item label="商品状态">
            <el-select v-model="form.state">
              <el-option v-for="(item,index) in  options" :key="index" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
            <el-form-item label="分类名称">
              <el-select v-model="form.gclist">
                <el-option v-for="(item,index) in  gcData" :key="index" :label="item.classTitle" :value="item.classId"> </el-option>
              </el-select>
            </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('search')">查询</el-button>
          </el-form-item>
            <el-form-item>
            <el-button  :plain="true" ><router-link to="/view/proAdd">发布商品</router-link></el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <!-- 表格 -->
    <el-table :data="getData" border style="width: 98%"  v-loading="listLoading">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="商品货号" prop="goodsId" width="180px"> </el-table-column>
      <el-table-column type="expand" prop="goodsPic" label="图片展示">
         <template scope="scope">
            <ul class="imgList ">
              <li v-for="item in scope.row.goodsPic" :key="item.index">
                  <img :src="item.path">
              </li>
            </ul>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="goodsTitle" min-width="120px"> 
         <template scope="scope">
          <span class="onlyOneRow">{{ scope.row.goodsTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属分类" prop="classTitle" width="110px">
        <template scope="scope">
          <span>{{ scope.row.goodsClass.classTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品单价" prop="price" width="100px;">
        <template scope="scope">
          <span class="edit-box" @click="edtiPrice(scope.row)">{{ scope.row.price.GOODS_MARKET_PRICE | currency }}<i class="el-icon-edit"></i></span>
        </template>
      </el-table-column>
      <el-table-column label="关键字" prop="keywords" width="110px">
      </el-table-column>
      
      </el-table-column>
      <el-table-column label="商品审核状态" prop="state" width="120px">
        <template scope="scope">
          <span>{{ scope.row.state | goodsstate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="上架时间" prop="soldInTime" width="110px">
        <template scope="scope">
          <span class="createTime">{{ scope.row.soldInTime | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下架时间" prop="soldOutTime" width="110px">
        <template scope="scope">
          <span class="createTime">{{ scope.row.soldOutTime | formatDate }}</span>
        </template>  
      </el-table-column>
      <el-table-column label="是否显示" width="90px">
        <template scope="scope">
          {{scope.row.goodsShow == true?'显示':'不显示'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" fixed="right">
        <template scope="scope">
          <div class="play_box">
            <el-button type="text">查看详情</el-button>
            <el-button type="text" @click="editPro(scope.row.goodsId)">编辑</el-button>
            <el-button type="text" @click="deleteRow(scope.row.goodsId)">删除</el-button>
          </div>
        </template>
      </el-table-column>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="totalElements" @current-change="handleCurrentChange"> </el-pagination>
    </el-col>
    <el-dialog title="快速改价" size="mini" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="编辑价格" prop="marketPrice">
          <el-input type="number" v-model="editForm.marketPrice" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="editSubmit">提交</el-button>
      </div>
    </el-dialog>
       
  </div>
</template>

<script>
import dialogTem from './add'
import { prolist, classlist, delGoods,editgoods } from '@/service/getData'
export default {
  data() {
    return {
      listLoading:false,
      checked: true,
      form: {
        state: '', //商品状态
        goodsId: '',//货号
        goodsTitle: '',//商品名称
        gclist: '',//一级分类
      },
      editFormVisible:false,
      editForm:{
          goodsId:'',
          marketPrice:0,
      },
      // 分页
      currentPage1: 1,
      pageSize: 3,
      pageNum: 1,
      totalElements: 0,
      lists: [],
      sels: [],//列表选中列
      // 商品状态
      options: [
        {
          value: 'GOODS_STATE_ON_CHECKING',
          label: '审核中'
        }, {
          value: 'GOODS_STATE_CHECK_ON',
          label: '审核通过'
        },{
           value: 'GOODS_STATE_CHECK_OFF',
           label: '审核不通过'
        },{
          value: 'GOODS_STATE_ON_CLOSE',
          label: '店铺倒闭'
        }
      ],
      // 表格数据
      getData: [],
      // 分类数据
      gcData:[]
    }
  },
   components: {
    dialogTem
  },
  mounted() {
    this.getList()
    // 分类数据
    let _this = this
    classlist().then((res) => {
      if (res.data.state == 200 ) {
        let datas = res.data.content
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
           _this.gcData.push({
              classId: '',
              classTitle: '全部分类'
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
        state: this.form.state,
        goodsId: this.form.goodsId,
        goodsTitle: this.form.goodsTitle,
        classId: this.form.gclist,
      }
      this.listLoading = true
      // 表格数据
      prolist(para).then((res) => {
        this.listLoading = false
        if (res.data.state == 200 &&　res.data.message !='暂无数据') {
          this.getData = res.data.content.content;
          this.totalElements = res.data.content.totalElements;
        }
      }).catch(() => {
        this.listLoading = false
      })
    },
    // 编辑
    editPro(val){
        this.$router.push({
          path:'/view/proAdd',
          query:{
            id:val
          }
        })
    },
    // 是否删除
    deleteRow(id) {
      let _this = this
      let para = {
        goodsId:id
      }
      this.$confirm('是否确定删除该商品').then((res) => {
           delGoods(para).then((res) => {
            if(res.data.state == 200){
              _this.getList()
            }
          })
      }).catch(() => {

      })
     
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
    // 快速改价
    edtiPrice(row){
      this.editFormVisible = true
      this.editForm = {
        goodsId:row.goodsId,
        marketPrice:row.price.GOODS_MARKET_PRICE
      }
    },
    editSubmit(){
      let _this = this
      let para = Object.assign({},this.editForm)
      para.price = JSON.stringify(para.price)

      editgoods(para).then((res) => {
         this.editFormVisible = false
        if(res.data.state == 200) {
          _this.getList()
        }
      })

    }
  }
}
</script>
<style>
/* .prolist .el-button+.el-button {
    margin-left: 495px;
} */
</style>

 
