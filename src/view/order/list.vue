 <template>
  <!-- 顶部表单 -->
  <div>
    <div class="search_pro">
      <el-form ref="form" class="" :model="form" label-width="80px">
        <el-form-item label="订单编号">
          <el-input v-model="form.ordersId "></el-input>
        </el-form-item>
        <el-form-item label="卖家">
          <el-input v-model="form.username "></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="form.orderState">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下单时间">
          <el-date-picker type="date" placeholder="选择开始日期时间" v-model="form.startTime"></el-date-picker>
          <el-date-picker type="date" placeholder="选择结束日期时间" v-model="form.endTime"> </el-date-picker>
        </el-form-item>

          <el-button type="primary" @click="onSubmit('search')">查询</el-button>
         
      </el-form>
    </div>
    <el-table border :data="getData" style="width: 98%">
      <!-- 子级 -->
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
            <el-button type="text" @click="handleDel( scope.row)">删除</el-button>
            <el-button type="text" v-if="show" @click="handle( scope.row)">发货</el-button>
          </div>
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
import { orderlist, shipments } from '@/service/getData'
export default {
  data() {
    return {
      show: true,
      form: {
        ordersId: '',
        orderState: '',
        startTime: '',
        endTime: '',
        username: ''
      },
      // 分页
      currentPage1: 1,
      pageSize: 10,
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
        ordersId: this.form.ordersId,
        orderState: this.form.orderState,
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        username: this.form.username
      }
      if (para.startTime == '') {
        para.startTime = ''
      } else {
        para.startTime = para.startTime.getTime()
      }
      if (para.endTime == '') {
        para.endTime == ''
      } else {
        para.endTime = para.endTime.getTime()
      }
      this.getData = []
      this.total = 0
      orderlist(para).then((res) => {
        console.log(para.orderState)
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
    //  删除
    handleDel(row) {
      alert(row.ordersId)
    },
    // 查询
    onSubmit(data) {
      if (data == 'search') {
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

 
<style lang="scss">
.getAddr {
  padding: 20px;
  line-height: 30px;
  li {
    span {
      display: inline-block;
      width: 60px;
      text-align: right;
      padding-right: 20px;
    }
  }
}
</style>