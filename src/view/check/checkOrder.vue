 <template>
  <!-- 顶部表单 -->
  <div>
    <el-table border :data="getData" style="width: 98%" @select="handleSelOne" @selection-change="handleSelectionChange">
      <!-- 子级 -->
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column type="expand" prop="goodsList">
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
      <el-table-column label="订单号" prop="ordersId"> </el-table-column>
      <el-table-column label="卖家" prop="username">
        <template scope="scope">
          {{scope.row.member.username}}
        </template>
      </el-table-column>
      <el-table-column label="下单时间" prop="createTime" min-width="100px">
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
      <el-table-column label="操作">
        <template scope="scope">
          <div>
            
            <el-button type="text" @click="handle( scope.row)" v-if="scope.row.orderState == 20">发货</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="total" @current-change="handleCurrentChange">
      </el-pagination>
    </el-col>
    
    <!-- 打印的内容end -->
  </div>
</template>


<script>
 
import { orderlist,delOrder } from '@/service/getData'
export default {
  data() {
    return {
      // 分页
      currentPage1: 1,
      pageSize: 5,
      page: 1,
      total: 0,
      lists: [],
      sels: [],//列表选中列
      getData: [],
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
        },
        {
          value: '',
          label: '全部'
        }
      ],
    }
  },
  mounted() {
    this.getorderlist()
  },
  methods: {
    getorderlist() {
      let para = {
        page: this.page - 1,
        pageSize: this.pageSize,
        sellerState:1
      }
       
    //   this.getData = []
    //   this.total = 0
      orderlist(para).then((res) => {
        console.log(res)
        if (res.data.content.orderState != '20') {
          this.show = false
        } else {
          this.show = true
        }
        if (res.data.state == 200) {
          this.getData = res.data.content.content;
          this.total = res.data.content.totalElements
        }
      })
    },
    //  发货
    handle(row) {
      let para = {
        ordersId: row.ordersId
      }
      shipments(para).then((res) => {
        if (res.data.state == '200') {
          this.$message({
            message: '发货成功',
            type: 'success'
          })
          this.getorderlist()
        }
      })
    },
    
    //  点击分页
    handleCurrentChange(val) {
      this.page = val
      this.getorderlist()
    },
    handleSelectionChange(val){
       this.printT = []
       this.printT = val
       
    },
    handleSelOne(val,row){
      if(!row.downUrl){
        let prop = {
            orderId:row.ordersId
          }
           getErWeiMa(prop).then((res) => {
            if(res.state == 200){
              row.downUrl = res.content.downUrl
            }
          })
      }
      // console.log(row)
    }
      
  }
}
</script>

 
<style lang="scss">
.print_box{
  display: none;
}
 
</style>