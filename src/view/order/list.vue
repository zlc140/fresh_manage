 <template>
  <!-- 顶部表单 -->
  <div>
    <div class="search_pro">
      <el-form ref="form" class="" :model="form" label-width="80px">
        <el-form-item label="订单编号">
          <el-input v-model="form.ordersId "></el-input>
        </el-form-item>
        <el-form-item label="买家名称">
          <el-input v-model="form.username "></el-input>
        </el-form-item>
          <el-form-item label="店铺名称" v-if="seachMove">
            <el-input v-model="form.storeName "></el-input>
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
    <el-table border :data="getData" v-loading="listLoading" style="width: 98%" @select="handleSelOne" @selection-change="handleSelectionChange">
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
            
            <el-table-column prop="number" label="购买数量" width="100px"> </el-table-column>
            <el-table-column prop="price" label="小计" width="100px">
              <template scope="scope">
                <span class="price">{{ scope.row.price | currency }}</span>
              </template>
            </el-table-column>
             <el-table-column prop="" label="拒签数量" width="100px">
              <template scope="scope">
                <span class="price">{{ scope.row.rejection }}</span>
              </template>
            </el-table-column>
             <el-table-column prop="" label="拒签理由" width="100px">
              <template scope="scope">
                <span class="price">{{ scope.row.rejectreason?scope.row.rejectreason:'-' }}</span>
              </template>
            </el-table-column>
          </el-table>
          <img :src="scope.row.qrcodeImg" style="width:100px;"/>
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
      <el-table-column label="店铺" prop="">
        <template scope="scope">
          {{scope.row.store.storeName}}
        </template>
      </el-table-column>
      <el-table-column label="买家" prop="username">
        <template scope="scope">
          {{scope.row.username}}
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
            <a @click="createPdf(scope.row)">打印</a>
            <el-button type="text" @click="handle( scope.row)" v-if="scope.row.orderState == 20">发货</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-col :span="24" class="toolbar">
      <el-button :plain="true" class="fl" @click="allPrint">批量打印</el-button>
      <el-pagination layout="total,prev,pager,next" :current-page.sync="currentPage1" :page-size='pageSize' :total="total" @current-change="handleCurrentChange">
      </el-pagination>
    </el-col>
    <!-- 打印的内容start -->
    <div ref="print_box" class="print_box" >
       <div class="print" v-for="(row,index) in printT" 
       style="page-break-before:always;width:94mm;margin:0 atuo;font-size:14px;padding:5px;color:#333;height:170mm;background:#f0f0f0;position:relative;" 
       :key="index" >
       <p style="height:10mm;margin:0;margin-top:5px;"><img :src="erWeiMa" style="width:20mm;margin-right:10px;"/><span style="float:right;">2017-06-05</span></p>
       <div style="height:94mm;overflow:hidden;margin:0;">
            <img :src="row.qrcodeImg" 
                style="width:50mm;height:50mm;margin-left:22mm;padding:0;margin-bottom:0;margin-top:-5px;"/>
            <p style="height:16px;margin:0;font-size:14px;margin-top:-10px;text-align:center;">{{row.ordersId}}</p>
            <table style="width:94mm;margin:0;font-size:14px;color:#333;word-break:break-all;word-wrap:break-word" border="0" cellpadding="0" cellspacing="10">
              <tr>　<td width="25%" >商　　家：</td>　<td colspan="3">{{row.store.storeName}}</td>　</tr>
              <tr>　<td width="25%">收 货 人 ：</td>　<td width="20%">{{row.orderDaddress.name}}</td><td width="25%">联系电话:</td> <td width="30%">{{row.orderDaddress.phone}}</td>　</tr>
              <tr> <td>收货地址：</td>　<td   colspan="3"> {{row.orderDaddress.address}}</td> </tr>
            </table>
            <p style="margin:15px 10px 5px;font-size:14px;">收货人签名：<span style="display:inline-block;width:30mm;border-bottom:1px solid #ccc;height:0;margin-left:10px;margin-bottom:-5px;"></span></p>
        </div>
        <div style="height:60mm;overflow:hidden;padding-top:10mm;" >
        <table style="width:100%;color:#333;font-size:14px;word-break:break-all;word-wrap:break-word;line-height:" border="0" cellpadding="0" cellspacing="10">
            <tr>　<td width="25%">商　　家：</td>　<td colspan="2">{{row.store.storeName}}</td>　<td align="right">2017-06-09</td></tr>
            <tr> <td >订单编号：</td> <td colspan="3">{{row.ordersId}}</td> </tr>
            <tr>　<td width="25%">收 货 人 ：</td>　<td width="20%">{{row.orderDaddress.name}}</td><td width="25%">联系电话:</td> <td width="30%">{{row.orderDaddress.phone}}</td>　</tr>
            <tr> <td>收货地址：</td>　<td   colspan="3"> {{row.orderDaddress.address}}</td> </tr>
        </table>
         </div> 
     </div>
    </div>
    <!-- 打印的内容end -->
  </div>
</template>


<script>
import logo from '@/assets/logo_s.png'
import { getStore } from '@/config/storage'
import { orderlist, shipments,getErWeiMa,delOrder,orderMylist } from '@/service/getData'
export default {
  data() {
    return {
      erWeiMa:logo,
      printT:[],
      form: {
        ordersId: '',
        orderState: '',
        startTime: '',
        endTime: '',
        username: '',
        storeName:''
      },
      // 分页
      currentPage1: 1,
      listLoading:false,
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
      seachMove:true
    }
  },
  mounted() {
     if(getStore('roleName') &&　getStore('roleName').roleCode.indexOf('SELLER')>0){
        this.seachMove = false//商家所属订单
      } 
    this.getorderlist()//全部订单列表
    
  },
  methods: {
    getorderlist() {
      this.listLoading = true
      let para = {
        page: this.page - 1,
        pageSize: this.pageSize,
        ordersId: this.form.ordersId,
        orderState: this.form.orderState,
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        username: this.form.username.trim(),
        storeName:this.form.storeName.trim()
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
      // this.getData = []
      // this.total = 0
      // if(this.seachMove == true){
        orderlist(para).then((res) => {
          console.log(res)
          this.listLoading = false
          if (res.data.state == 200) {
            this.getData = res.data.content.content;
            this.total = res.data.content.totalElements
          }else{
            this.$message(res.data.messages)
             this.getData = []
             this.total = 0

          }
        })
      // }else{
      //   orderMylist(para).then((res) => {
      //     this.listLoading = false
      //       if (res.data.state == 200) {
      //         this.getData = res.data.content.content;
      //         this.total = res.data.content.totalElements
      //       }
      //   })
      // }
    },
    //  发货
    handle(row) {
      let para = {
        ordersId: row.ordersId
      }
      shipments(para).then((res) => {
        if (res.data.state == '200') {
          
          this.getorderlist()
        }
        this.$message({
            message: res.data.messages
          })
      })
    },
    //  删除
    handleDel(row) {
      let _this = this
      let prop = {
        orderId : []
      }
      prop.orderId.push(row.ordersId)
      prop.orderId = prop.orderId.join(',')
      delOrder(prop).then(res => {
        if(res.data.state == 200){
          this.$message('删除成功')
          _this.getorderlist()
        }else{
           this.$message(res.data.messages)
        }
      })
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
    handleSelectionChange(val){
       this.printT = []
       this.printT = val
    },
    handleSelOne(val,row){
    //   if(!row.downUrl){
    //     let prop = {
    //         orderId:row.ordersId
    //       }
    //        getErWeiMa(prop).then((res) => {
    //         if(res.state == 200){
    //           row.downUrl = res.content.downUrl
    //         }
    //       })
    //   }
      // console.log(row)
    },
    // 单条打印
    createPdf (val){
      let _this = this
      _this.printT = []
      _this.printT.push(val)
      // 获得订单二维码
          // let prop = {
          //   orderId:val.ordersId
          // }
          // getErWeiMa(prop).then((res) => {
          //   console.log(res)
          //   if(res.state == 200){
          //     val.downUrl = res.content.downUrl
          //     _this.printT = []
          //     _this.printT.push(val)
              
          //   }
          // })
          // 调用打印机
          setTimeout(function(){
                  _this.Printing()
          },500)
    },
    // 批量打印
    allPrint(){
      if(this.printT.length>0){
      console.log(this.printT)
         this.Printing()
      }
    },
    Printing(){
        this.$nextTick(function(){
          var newWindow = window.open('/print')
          var docStr = this.$refs['print_box'].innerHTML
          newWindow.document.write(docStr)
          newWindow.print();
          newWindow.close();  
        }) 
    }
  }
}
</script>

 
<style lang="scss">
.print_box{
  display: none;
}
 
</style>