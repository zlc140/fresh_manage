 <template>
  <!-- 顶部表单 -->
  <div class="adv">
  <el-table  :data="getData" style="width: 98%">
    <!-- 子级 -->
    <el-table-column type="expand" prop="goodsList">
      <template scope="scope">
            <el-table    :data="scope.row.goodsList"  style="width: 90%">  
                <el-table-column   prop="goods.goodsTitle"  label="商品名称" min-width="120px"> </el-table-column>
                <el-table-column prop="goodsPic" label="商品图片" width="150" >
                  <template scope="scope" >                 
                      <img :src="scope.row.goods.goodsPic[0].path" />                 
                  </template>
              </el-table-column>
                <el-table-column prop="goods.goodsSubTitle"  label="商品描述"> </el-table-column>
                <el-table-column prop="goodsId"  label="商品编号"> </el-table-column>
                <el-table-column  prop="goods.price.GOODS_MARKET_PRICE" label="商品单价">
                   <template scope="scope">   
                      <span class="price">{{ scope.row.goods.price.GOODS_MARKET_PRICE | currency }}</span>
                  </template>
                   </el-table-column>
                <el-table-column  prop="number" label="商品数量"> </el-table-column>
                <el-table-column  prop="price" label="小计"> 
                   <template scope="scope">   
                    <span class="price">{{ scope.row.price | currency }}</span>
                </template>
                </el-table-column>
          </el-table>
      </template>
    </el-table-column>
    <!-- 父级 -->
    <el-table-column label="订单号" prop="ordersId">  </el-table-column>
     <el-table-column label="店铺名称" prop="storeName">
       <template scope="scope">
            {{scope.row.store.storeName}}
         </template>
    </el-table-column>
    <el-table-column label="下单时间"  prop="createTime" min-width="100px">
      <template scope="scope">   
            <span>{{ scope.row.createTime | formatDate }}</span>
        </template>
    </el-table-column>
    <el-table-column label="订单总额" prop="price">
       <template scope="scope">   
            <span class="price">{{ scope.row.price | currency }}</span>
        </template>
    </el-table-column>
     <el-table-column label="订单状态" prop="orderState">
        <template scope="scope">   
            <span>{{ scope.row.orderState | filterState }}</span>
        </template>
    </el-table-column>
     <el-table-column label="买家" prop="name">
        <template scope="scope">   
            <span>{{ scope.row.orderDaddress.name}}</span>
        </template>
    </el-table-column>
     <el-table-column label="买家地址" prop="address">
        <template scope="scope">   
            <span>{{ scope.row.orderDaddress.address}}</span>
        </template>
    </el-table-column>
    <el-table-column label="买家电话" prop="phone">
        <template scope="scope">   
            <span>{{ scope.row.orderDaddress.phone}}</span>
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
import {findadvOrder} from '@/service/getData'
export default {
  data(){
    return{ 
        // 分页
        currentPage1:1,
        pageSize: 1,
        page: 1,
        total: 0,
        lists: [],
        sels: [],//列表选中列
        getData:[],
    }
  },
     mounted(){         
           this.getorderlist()
    },
    methods:{
        getorderlist(){
             let para = {
                page: this.page-1,
                pageSize:this.pageSize,
                storeId:'S20170901141042903'
            }
            para=JSON.stringify(para)
              findadvOrder(para).then((res) => {
                  if(res.data.state == 200){
                    this.getData=res.data.content.content
                    this.total = res.data.content.totalElements
                  }
              })
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
