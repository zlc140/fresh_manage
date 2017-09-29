<template>

        <div class="dialog-content"  >
            <div class="table">
                <el-table :data="datas"  style="width: 100%;" height="500">
                    <el-table-column type="expand" width="50">
                        <template scope="scope">
                            <div v-if="scope.row.order">
                            <el-table  border  :data="scope.row.order.goodsList"  style="width: 90%">  
                                    <el-table-column   prop="goods.goodsTitle"  label="商品名称" min-width="200px"> </el-table-column>
                                    <el-table-column prop="goodsId"  label="商品编号" width="200px"> </el-table-column>
                                    <el-table-column  prop="goods.price.GOODS_MARKET_PRICE" label="商品单价" width="100px">
                                    <template scope="scope">   
                                        <span class="price">{{ scope.row.goods.price.GOODS_MARKET_PRICE | currency }}</span>
                                    </template>
                                    </el-table-column>
                                    <el-table-column  prop="number" label="商品数量" width="100px"> 
                                        <template scope="scope">
                                            <span>× {{scope.row.number}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  prop="price" label="小计" width="100px"> 
                                    <template scope="scope">   
                                        <span class="price">{{ scope.row.price | currency }}</span>
                                    </template>
                                    </el-table-column>
                            </el-table>
                            <ul class="getAddr">
                                <li><span>订单号:</span> {{scope.row.order.ordersId}}<span>应付金额:</span><span class="price"> {{scope.row.order.price | currency}}</span></li>
                            </ul>
                            </div>
                            <div v-else>没有详情</div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="createTime" label="创建日期" width="180">
                        <template scope="scope">
                            {{scope.row.createTime | formatDate}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="description" label="描述" >
                    </el-table-column>
                    <el-table-column align="left" prop="money" label="金额" width="120">
                        <template scope="scope">
                            <span :class="scope.row.type == 300?'greens':'reds'">{{ scope.row.type==300?'+':'-' }} {{ scope.row.money | currency}}</span>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column align="center" prop="type" label="类型" width="180">
                        <template scope="scope">
                            <span>{{scope.row.type==300?'-':'+'}}</span>
                        </template>
                    </el-table-column> -->
                </el-table>
            </div>
        </div>
      
</template>

<script>
export default {
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        datas:{
            type:Array,
            default:[]
        }
    },
     
    mounted(){
    },
    methods: {
        closeMyself() {
            this.$emit('on-close')
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
