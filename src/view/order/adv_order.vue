 <template>
  <!-- 顶部表单 -->
  <div class="adv">
      <div class="search_pro">
            <el-form ref="form" class="" :model="form" label-width="80px">
            <el-form-item label="订单编号">
                <el-input v-model="form.ordersId "></el-input>
            </el-form-item> 
            <el-form-item label="店铺名称" v-if="seachMove">
            <el-input v-model="form.storeName "></el-input>
          </el-form-item>      
            <el-form-item label="下单时间" >
                <el-date-picker  type="date"  placeholder="选择开始日期时间" v-model="form.startTime"></el-date-picker>
                <el-date-picker  type="date"  placeholder="选择结束日期时间" v-model="form.endTime"  > </el-date-picker>
            </el-form-item>     
            <el-form-item>
                <el-button type="primary" @click="onSubmit('search')">查询</el-button>
            </el-form-item>
            </el-form>
        </div>
  <el-table  :data="getData" border style="width: 98%"  v-loading="listLoading">
    <!-- 子级 -->
    <el-table-column type="expand"  prop="goodsList">
      <template scope="scope">
           <el-table border :data="scope.row.goodsList" style="width: 90%">

            <el-table-column prop="goods.goodsTitle" label="商品名称" min-width="200px"> </el-table-column>
            <el-table-column prop="goodsId" label="商品编号" width="200px"> </el-table-column>
            <el-table-column prop="goods.price.GOODS_MARKET_PRICE" label="商品单价" width="100px">
              <template scope="scope">
                <span class="price">{{ scope.row.goods.price.GOODS_MARKET_PRICE | currency }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="商品数量" width="100px"> </el-table-column>
            <el-table-column prop="price" label="小计" width="100px">
              <template scope="scope">
                <span class="price">{{ scope.row.price | currency }}</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- <img :src="scope.row.qrcodeImg" style="width:100px;"/> -->
          <ul class="getAddr">
            <li>
              <span>收货人:</span> {{scope.row.orderDaddress.name}}</li>
            <li>
              <span>电话:</span> {{scope.row.orderDaddress.phone}}</li>
            <li>
              <span>收货地址:</span> {{scope.row.orderDaddress.address}}</li>
          </ul>
      </template>
    </el-table-column>
    <!-- 父级 -->
    <el-table-column label="订单号" prop="ordersId">  </el-table-column>
     <!-- <el-table-column label="店铺名称" prop="storeName">
       <template scope="scope">
            {{scope.row.store.storeName}}
         </template>
    </el-table-column> -->
   
    <el-table-column label="店铺" prop="">
        <template scope="scope">
          {{scope.row.store.storeName}}
        </template>
      </el-table-column>
       <el-table-column label="买家" prop="username">
        <template scope="scope">   
            <span>{{ scope.row.username}}</span>
        </template>
    </el-table-column>
     <el-table-column label="收货人" prop="">
        <template scope="scope">   
            <span>{{ scope.row.orderDaddress?scope.row.orderDaddress.name:'-'}}</span>
        </template>
    </el-table-column>
     <el-table-column label="收货人地址" prop="">
        <template scope="scope">   
            <span>{{ scope.row.orderDaddress?scope.row.orderDaddress.address:''}}</span>
        </template>
    </el-table-column>
    <el-table-column label="收货人电话" prop="">
        <template scope="scope">   
            <span>{{ scope.row.orderDaddress?scope.row.orderDaddress.phone:''}}</span>
        </template>
    </el-table-column>
    <el-table-column label="订单总额" prop="price">
       <template scope="scope">   
            <span class="price">{{ scope.row.price | currency }}</span>
        </template>
    </el-table-column>
     <el-table-column label="下单时间"  prop="createTime" min-width="100px">
      <template scope="scope">   
            <span>{{ scope.row.createTime | formatDate }}</span>
        </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-col :span="24" class="toolbar">
        <el-pagination layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="total" @current-change="handleCurrentChange">
        </el-pagination>        
    </el-col>
 
</div>
</template>


<script>
import { getStore } from '@/config/storage'
import {findadvOrder,findStoreadvOrder} from '@/service/getData'
export default {
  data(){
    return{ 
        listLoading:false,
         form: {
          ordersId : '',
          storeName:'',
          startTime : '',
          endTime : '',        
        },
        // 分页
        currentPage1:1,
        pageSize: 10,
        page: 1,
        total: 0,
        lists: [],
        sels: [],//列表选中列
        getData:[],
        seachMove:true
    }
  },
     mounted(){         
           
            if(getStore('roleName') &&　getStore('roleName').roleCode.indexOf('SELLER')>0){
                this.seachMove = false//商家所属订单
            } 
            console.log('this.seachMove',this.seachMove)
            this.getorderlist()
    },
    methods:{
        getorderlist(){
            this.listLoading = true
             let para = {
                page: this.page-1,
                pageSize:this.pageSize,
                // storeId:'S20170901141042903',   
                startTime:this.form.startTime,
                endTime:this.form.endTime,
                ordersId:this.form.ordersId
            }
            if(para.startTime==''){
               para.startTime=''
            }else{
                para.startTime=para.startTime.getTime()
            }
            if(para.endTime==''){
              para.endTime==''
            }else{
              para.endTime=para.endTime.getTime()
            }
            if(para.startTime!='' && para.endTime!='' && para.endTime<para.startTime){
                this.$message('结束时间应该大于开始时间')
                return false
            }
        //   if(this.seachMove == true){
               
              findadvOrder(para).then((res) => {
                  this.listLoading = false
                  if(res.data.state == 200){
                      console.log(res.data)
                    this.getData=res.data.content.content
                    this.total = res.data.content.totalElements
                  }else{
                      this.getData = []
                      this.total = 0
                      this.$message(res.data.messages)
                  }
              })
            // }else{
            //     findStoreadvOrder(para).then((res) => {
            //       if(res.data.state == 200){
            //           console.log(res.data)
            //         this.getData=res.data.content.content
            //         this.total = res.data.content.totalElements
            //       }
            //   })
            // }
       },
          // 查询
      onSubmit(data){
        if(data=='search'){
          this.page = 1
          this.currentPage1 = 1
        }       
        this.getorderlist()
      },
      //  点击分页
        handleCurrentChange(val) {
            this.page = val
            this.getorderlist()
        },
    }
}
</script>

<style>
.adv .el-form-item {
    margin-bottom: 22px;
    float: left;
}
.adv img{
  width: 50px;
  height: 50px;
  display: inline-block;
}
</style>
