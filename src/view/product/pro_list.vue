<template>
  <div class="prolist">
      <!-- form表单 -->
 <el-form ref="form" :model="form" label-width="80px">
  <el-row :gutter="10" class="margin-top">
      <el-form-item label="商品状态">
            <el-select v-model="form.state">
              <el-option v-for="(item,index) in  options"   :key="index" :label="item.label" :value="item.value">  </el-option> 
            </el-select>
    </el-form-item>
  <el-form-item label="商品货号"><el-input v-model="form.goodsId"></el-input> </el-form-item>
    <el-col :span="6">
          <el-form-item label="一级分类">
            <el-select v-model="form.gclist"  >
               <el-option  v-for="(item,index) in  gcData"   :key="index"  :label="item.classTitle" :value="item.classId"  >  </el-option> 
            </el-select>
          </el-form-item>
            </el-col>
           <!-- <el-col :span="5">
          <el-form-item label="二级分类">
            <el-select v-model="form.gclistt">
              <el-option v-for="(item,index) in  gcDatatt"   :key="index"  :label="item.classTitle" :value="item.classId"></el-option>
            </el-select>
          </el-form-item>
          </el-col> -->
        <el-form-item label="商品名称"> <el-input v-model="form.goodstitle"></el-input></el-form-item>
        <el-button type="primary" @click="onSubmit('search')">查询</el-button> </el-form-item>
  </el-row> 
</el-form>
 <!-- 父级 -->
 <el-table  :data="getData" style="width: 98%">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column  label="商品货号" prop="goodsId" width="180px"> </el-table-column>
    <el-table-column label="商品名称" prop="goodsTitle" min-width="150px"> </el-table-column>
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
     <el-table-column label="关键字" prop="keywords" min-width="80px">
    </el-table-column>
     <el-table-column label="库存" prop="repositoryNum" width="60px">
    </el-table-column>
     </el-table-column>
     <el-table-column label="商品状态" prop="repositoryNum" width="100px">
       <template scope="scope">   
            <span>{{ scope.row.goodsShow | goods}}</span>
       </template>
    </el-table-column>
    <el-table-column label="商品审核状态" prop="state" width="120px">
      <template scope="scope">   
            <span>{{ scope.row.state | goodsstate}}</span>
       </template>
    </el-table-column>
     <el-table-column label="创建时间"  prop="createTime" width="110px">
       <template scope="scope">   
            <span class="createTime">{{ scope.row.createTime | formatDate }}</span>
       </template>
    </el-table-column>
     <el-table-column label="是否显示"  width="90px" >
        <template scope="scope">
            <el-switch v-model="scope.row.goodsShow" on-text="是"  off-text="否" ></el-switch>
        </template>
    </el-table-column>
    <el-table-column  label="操作" width="80"  >
      <template scope="scope">
        <div class="play_box">
         <a>查看详情</a>
        <a>  下架 </a>
        <a>编辑</a>
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
        this.getList()    
       // 分类数据
        let _this = this
        gclist().then((res) => {
          console.log(res.data)
          if(res.data.state == 200){
            let datas = res.data.content
           
            _this.gcData = []
             datas.forEach((child) => {
                  _this.gcData.push({
                    classId:child.classId,
                    classTitle:child.classTitle
                  })
                  if(child.childClass && child.childClass.length>0){
                    child.childClass.forEach((item) => [
                      _this.gcData.push({
                         classId:item.classId,
                        classTitle:'　　'+item.classTitle
                      })
                    ])
                  }
             })
          }
            //  this.gcData=res.data.content
         })  
    },
    methods:{
       
      getList(){ 
              let para={
                 pageNum: this.pageNum-1,
                 pageSize:this.pageSize,
                 state : this.form.state,
                 goodsId:this.form.goodsId,
                 goodstitle:this.form.goodstitle,
                 classId : this.form.gclist
                //  gclistt : this.form.gclistt,
              }
              // 表格数据
              prolist(para).then((res) => {
                console.log(res.data)
                if(res.data.state == 200){
                  this.getData=res.data.content.content; 
                  console.log(this.getData)
                  this.totalElements=res.data.content.totalElements;
                }
              })
       },
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
        this. getList()
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
.prolist .el-form-item {
    margin-bottom: 22px;
    float: left;
}
.prolist .play_box{
  width: 60px;
  padding: 10px 0;
  text-align: center;
  margin-left: -20px;
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

 
