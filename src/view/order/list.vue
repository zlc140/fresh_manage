 <template>
  <!-- 顶部表单 -->
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="订单编号">
        <el-input v-model="form.ordersId "></el-input>
      </el-form-item>
      <el-form-item label="订单状态"  >
        <el-select  v-model="form.States" >
           <el-option v-for="item in options"   :key="item.value" :label="item.label" :value="item.value">  </el-option> 
        </el-select>
      </el-form-item>
  <el-form-item label="下单时间" >
    <el-date-picker  type="datetime"  placeholder="选择开始日期时间" v-model="form.startTime"></el-date-picker>
    <el-date-picker  type="datetime"  placeholder="选择结束日期时间" v-model="form.endTime"> </el-date-picker>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="onSubmit('search')">查询</el-button>
  </el-form-item>
</el-form>
 
  <el-table  :data="getData" style="width: 98%">
    <!-- 子级 -->
    <el-table-column type="expand" prop="goodsList">
      <template scope="scope">
            <el-table    :data="scope.row.goodsList"  style="width: 90%">  
                <el-table-column   prop="goods.goodsTitle"  label="商品名称" min-width="200px"> </el-table-column>
                <el-table-column prop="goodsId"  label="商品编号" width="200px"> </el-table-column>
                <el-table-column  prop="goods.price.GOODS_MARKET_PRICE" label="商品单价" width="100px">
                   <template scope="scope">   
                      <span class="price">{{ scope.row.goods.price.GOODS_MARKET_PRICE | currency }}</span>
                  </template>
                   </el-table-column>
                <el-table-column  prop="number" label="商品数量" width="100px"> </el-table-column>
                <el-table-column  prop="price" label="小计" width="100px"> 
                   <template scope="scope">   
                    <span class="price">{{ scope.row.price | currency }}</span>
                </template>
                </el-table-column>
          </el-table>
      </template>
    </el-table-column>
    <!-- 父级 -->
    <el-table-column label="订单号" prop="ordersId">  </el-table-column>
    <el-table-column label="买家" prop="username">
       <template scope="scope">
            {{scope.row.member.username}}
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
  </el-table>
  <!-- 分页 -->
  <el-col :span="24" class="toolbar">
             <el-pagination layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="total" @current-change="handleCurrentChange">
            </el-pagination>        
             </el-col>
 
</div>
</template>


<script>
import {orderlist} from '@/service/getData'
export default {
  data(){
    return{ 
       form: {
          ordersId : '',
          States:'',
          startTime : '',
          endTime : '',
          
        },

        // 分页
        currentPage1:1,
            pageSize: 1,
            page: 1,
            total: 0,
            lists: [],
            sels: [],//列表选中列
        getData:[],
       
        options: [
          {
          value: '20',
          label: '待发货'
          }, {
            value: '30',
            label: '待收货'
          }, {
            value: '40',
            label: '已签收'
          }
        ],
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
                ordersId : this.form.ordersId,
                States:this.form.States,
                startTime : this.form.startTime,
                endTime : this.form.endTime,

            }
              orderlist(para).then((res) => {
                this.getData=res.data.content.content; 
                this.total = res.data.content.totalElements
              })
       },
      // 查询
      onSubmit(data){
        if(data=='search'){
          this.page = 1
          this.currentPage1 = 1
        }
         
        this. getorderlist()
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
.el-form-item {
    margin-bottom: 22px;
    float: left;
}
</style>
