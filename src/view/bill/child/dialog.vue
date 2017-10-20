<template>

        <div class="dialog-content" v-loading="listLoading" >
            <div class="table" v-if="orderDetail != null">
            <ul class="getAddr">
                <li><span>订单号:</span> {{orderDetail.ordersId}}<span>应付金额:</span><span class="tip"> {{orderDetail.price | currency}}</span></li>
            </ul>
            <el-table  border  :data="orderDetail.goodsList"  style="width: 100%" >  
                    <el-table-column   prop="goods.goodsTitle"  label="商品名称" min-width="200px"> </el-table-column>
                    <el-table-column prop="goodsId"  label="商品编号" width="200px"> </el-table-column>
                    <el-table-column  prop="goods.price.GOODS_MARKET_PRICE" label="商品单价" width="100px">
                    <template scope="scope">   
                        <span class="price">{{ scope.row.goods.price.GOODS_MARKET_PRICE | currency }}</span>
                    </template>
                    </el-table-column>
                    <el-table-column  prop="number" label="购买数量" width="100px"> 
                        <template scope="scope">
                            <span>× {{scope.row.number}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="price" label="小计" width="100px"> 
                    <template scope="scope">   
                        <span class="price">{{ scope.row.price | currency }}</span>
                    </template>
                    </el-table-column>
                      <el-table-column prop="price" label="拒签数量" width="100px">
                        <template scope="scope">
                            <span class="price">{{ scope.row.rejection }}</span>
                        </template>
                        </el-table-column>
                        <el-table-column prop="price" label="拒签理由" width="100px">
                        <template scope="scope">
                            <span class="price">{{ scope.row.rejectreason?scope.row.rejectreason:'-' }}</span>
                        </template>
                    </el-table-column>
            </el-table>
           
            </div>
             <div v-else>没有详情</div>
        </div>
      
</template>

<script>
import {orderlist} from '@/service/getData'
export default {
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        datas:{
            type:String,
            default:''
        }
    },
     data(){
         return {
             orderDetail:null,
             listLoading:false
         }   
     },
    mounted(){
        this.getDetail()
    },
    methods: {
        closeMyself() {
            this.$emit('on-close')
        },
        getDetail(){
                this.listLoading = true
            	let prop = {
					ordersId:this.datas
				}
                let _this = this
                console.log(prop)
				orderlist(prop).then(res => {
                    console.log(res)
                      this.listLoading = false
                      _this.orderDetail = null
						if(res.data.state == 200){
								_this.orderDetail = res.data.content.content[0]
						}else{

                        }
				})
        }
    },
}
</script>

<style lang='scss' >
// .dialog-wrap{
//     position: fixed;
//     z-index: 998;
//     width: 100%;
//     height: 100%;
  
// .drop-enter-active {
//     transition: all .5s ease;
// }

// .drop-leave-active {
//     transition: all .3s ease;
// }

// .drop-enter {
//     transform: translateY(-500px);
// }

// .drop-leave-active {
//     transform: translateY(-500px);
// }



// .dialog-cover {
//     background: #000;
//     opacity: .3;
//     position: fixed;
//     z-index: 5;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
// }

// .dialog-content {
//     width: 960px;
//     min-height: 200px;
//     position: fixed;
//     max-height: 50%;
//     background: #fff;
//     top: 20%;
//     left: 50%;
//     margin-left: -25%;
//     z-index: 10;
//     box-sizing: border-box;
//     line-height: 1.6;
// }

// .dialog-close {
//     position: absolute;
//     z-index:998;
//     right:-10px;
//     top: -15px;
//     width: 25px;
//     height: 25px;
//     text-align: center;
//     background-color: #fff;
//     border-radius: 50%;
//     color: #ccc;
//     line-height: 25px;
// }
// .dialog-close:hover{
//     color: rgb(108, 169, 110);
// }
// .table .el-table th {
//     background-color: rgb(108, 169, 110);
// }

// .table .el-table__header-wrapper thead div {
//     background-color: rgb(108, 169, 110);
//     text-align: center;
// }

// .dialog-wrap table thead th {
//     text-align: center;
//     font-weight: 400;
//     font-size: 14px;
//     color: #fff;
// }
// .el-table{
//     border: none;
// }
// .el-table::after, .el-table::before{
//     background-color: transparent;
// }
// .el-table th>.cell {
//     color: #fff;
// }
// }
</style>
