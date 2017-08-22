<template>
  <div class="prolist">
      <!-- form表单 -->
 <el-form ref="form" :model="form" label-width="80px">
  <el-row :gutter="10" class="margin-top">
      <el-form-item label="商品状态">
            <el-select v-model="form.state">
              <el-option v-for="(item,index) in options"   :key="index" :label="item.label" :value="item.value">  </el-option> 
            </el-select>
    </el-form-item>
  <el-form-item label="商品货号"><el-input v-model="form.goodsId"></el-input> </el-form-item>
    <el-col :span="5">
          <el-form-item label="一级分类">
            <el-select v-model="form.gclist">
               <el-option  v-for="(item,index) in  gcData"  :key="index" :label="item.classTitle" :value="item.classId">  </el-option> 
            </el-select>
          </el-form-item>
            </el-col>
                <el-col :span="5">
          <el-form-item label="二级分类">
            <el-select v-model="form.gclistt">
              <el-option v-for="(item,index) in gcDatatt"   :key="index" :label="item.classTitle" :value="item.classId"></el-option>
            </el-select>
          </el-form-item>
   </el-col>
        <el-form-item label="商品名称"> <el-input v-model="form.goodstitle"></el-input></el-form-item>
        <el-button type="primary" @click="onSubmit('search')">查询</el-button> </el-form-item>
  </el-row> 
</el-form>
 <!-- 父级 -->
  <!-- <el-checkbox v-model="checked">全选</el-checkbox> -->
 <el-table  :data="getData" style="width: 98%">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column  label="商品货号" prop="goodsId" min-width="120px"> </el-table-column>
    <el-table-column label="商品名称" prop="goodsTitle" min-width="100px"> </el-table-column>
     <el-table-column label="所属分类" prop="classTitle" min-width="120px">
        <template scope="scope">   
              <span>{{ scope.row.goodsClass.classTitle }}</span> 
        </template> 
    </el-table-column>
     <el-table-column label="商品单价" prop="goodsId" min-width="100px;"> 
       <template scope="scope">   
              <span>{{ scope.row.price.GOODS_MARKET_PRICE | currency }}</span> 
        </template> 
    </el-table-column>
    <!-- <el-table-column label="商品详情" prop="goodsSubTitle" min-width="120px">
    </el-table-column> -->
     <!-- <el-table-column label="关键字" prop="keywords" min-width="80px">
    </el-table-column> -->
     <el-table-column label="库存" prop="repositoryNum" min-width="60px">
    </el-table-column>
     </el-table-column>
     <el-table-column label="商品状态" prop="repositoryNum" min-width="100px">
       <template scope="scope">   
            <span>{{ scope.row.goodsShow | goods}}</span>
       </template>
    </el-table-column>
    <el-table-column label="商品审核状态" prop="state" min-width="120px">
      <template scope="scope">   
            <span>{{ scope.row.state | goodsstate}}</span>
       </template>
    </el-table-column>
     <el-table-column label="创建时间"  prop="createTime" min-width="100px">
       <template scope="scope">   
            <span class="createTime">{{ scope.row.createTime | formatDate }}</span>
       </template>
    </el-table-column>
     <el-table-column label="是否显示"  min-width="100px" >
        <template scope="scope">
            <el-switch v-model="scope.row.del" on-color="#13ce66" off-color="#ff4949"></el-switch>
        </template>
    </el-table-column>
    <el-table-column  label="操作"  min-width="80"  >
      <template scope="scope">
        <div class="play_box">
         <el-button type="text" size="small">查看详情</el-button>
        <el-button  @click.native.prevent="deleteRow(scope.$index, getData)"   type="text"   size="small">  下架
        </el-button>
        <el-button type="text" size="small">编辑</el-button>
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
import {prolist,gclist} from '@/service/getData'
export default {
  data(){
    return{ 
      checked :true,
      form: {
         state : '', //商品状态
         goodsId : '',//货号
         goodstitle : '',//商品名称
         gclist : '',//一级菜单
         gclistt : '',//二级菜单
        },
        // 分页
        currentPage1:1,
        pageSize: 1,
        pageNum: 1,
        totalElements: 0,
        lists: [],
        sels: [],//列表选中列
        // 商品状态
         options: [
          {
          value: true,
          label: '已上架'
          }, {
            value: false,
            label: '已下架'
          }
        ],
        // 表格数据
        getData:[],
        // 一级数据
         gcData:[],
         //二级数据
         gcDatatt:[],
    }
  },
     mounted(){ 
       this.getorderlist()      
    },
    methods:{
      // 是否删除
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
         // 查询
      onSubmit(data){
        if(data=='search'){
          this.page = 1
          this.currentPage1 = 1
        }
         
        this. getorderlist()
      },
      getorderlist(){ 
              let para={
                 pageNum: this.pageNum-1,
                 pageSize:this.pageSize,
                 state : this.form.state,
                 goodsId:this.form.goodsId,
                 goodstitle:this.form.goodstitle,
                 gclist : this.form.gclist,
                 gclistt : this.form.gclistt,
              }
              // 表格数据
              prolist(para).then((res) => {
                this.getData=res.data.content.content; 
                this.totalElements=res.data.content.totalElements;
              })
              // 二级联动数据
                gclist(para).then((res) => {
                 this.gcData=res.data.content
                 res.data.content.forEach(function(child) {
                   this.gcDatatt=child.childClass

                 },this);
              })
       },
        //  点击分页
        handleCurrentChange(val) {
            this.pageNum = val
            this.getorderlist()
        },
    }
}
</script>
<style>
.prolist .el-form-item {
    margin-bottom: 22px;
    float: left;
}
.prolist .section {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -webkit-flex-grow: 1;
    -ms-flex-grow: 1;
    max-width: calc(100% - 260px);
    padding: 55px 20px 10px;
}
.prolist .el-button--primary {
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
    margin-left: 40px;
}
.prolist .el-col-5 {
    width: 15%;
}
</style>

 
