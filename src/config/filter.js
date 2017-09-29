import Vue from 'vue'
import tool from './format'
// 价格（保留两位小数）
Vue.filter('currency',(value) => {
    value = parseFloat(value)
    if(value != '' && value != null && value != 'undefind' ){
      let price
       if(value == 0){
         price = '0.00'
       }else{
        price  = value.toFixed(2)
       }
      return '￥'+price
    }else{
      return '￥0.00'
    }
  })
 
Vue.filter('formatDate',function(value) {
        if(value == 0 ||value == '0'|| value == '' || value =='undefined'){
          return null
        }
        return tool.formatDate.format((value),'yyyy-MM-dd hh:mm:ss')
     
})

Vue.filter('parseDate',function(value) {
  if(value != '' && value != null && value != 'undefind') {
      return tool.formatDate.parse((value),'yyyy-MM-dd')
  }else {
      return ''
  }
})

// 订单状态
Vue.filter('filterState',(value)=>{
  value = parseInt(value)
  if(value==20){
      return '待发货'
  }else if(value==30){
      return '待收货'
  }else{
      return '已签收'
  }
})
// 商品状态
Vue.filter('goods',function(value) {
  if(value==true){
    return '已上架'
  }else{
    return '已下架'
  }
})
 
// 商品审核状态
Vue.filter('goodsstate',function(value) {
  if(value=='GOODS_STATE_ON_CHECKING'){
    return '审核中'
  }else if(value=='GOODS_STATE_CHECK_ON'){
    return '审核通过'
  }else if(value=='GOODS_STATE_CHECK_OFF'){
    return '审核不通过'
  }else if(value=='GOODS_STATE_ON_CLOSE'){
    return '店铺倒闭'
  }
})   
// 店铺状态
Vue.filter('storestate',function(value) {
  if(value=='STORE_STATE_ON_CHECKING'){
    return '店铺审核中'
  }else if(value=='STORE_STATE_CHECK_ON'){
    return '店铺审核通过'
  }else if(value=='STORE_STATE_CHECK_OFF'){
    return '审核不通过'
  }else if(value=='STORE_STATE_ON_CLOSE'){
    return '店铺倒闭'
  }
})   
// 品牌状态
Vue.filter('brandstate',function(value) {
  if(value=='BRAND_STATE_ON_CHECKING'){
    return '品牌审核中'
  }else if(value=='BRAND_STATE_CHECK_ON'){
    return '品牌审核通过'
  }else if(value=='BRAND_STATE_CHECK_OFF'){
    return '品牌审核不通过'
  }else if(value='BRAND_STATE_ON_CLOSE'){
    return '品牌停用'
  }
})   
// 楼层类型
Vue.filter('floorType',function(value) {
  if(value=='FLOOR_IMAGES'){
    return '广告楼层'
  }else if(value=='FLOOR_GOODS'){
    return '商品楼层'
  } 
}) 
// 代金券状态
Vue.filter('voucherType',function(value) {
    if(value=='VOUCHER_STATE_ON_CHECKING'){
      return '待审核'
    }else if(value=='VOUCHER_STATE_CHECK_ON'){
      return '可使用'
    }else if(value=='VOUCHER_STATE_CHECK_OFF'){
      return '审核不通过'
    }else if(value='VOUCHER_STATE_OV_ERDUE'){
      return '代金券过期'
    }else if(value='VOUCHER_STATE_USED'){
      return '代金券已使用'
    }
  })   
// 账单状态
Vue.filter('filterBill',(value)=>{
  value = parseInt(value)
  if(value==0){
      return '未出账'
  }else if(value==100){
      return '未付款'
  }else if(value==200){
      return '已付款'
  }else if(value==300){
    return '账单关闭'
  }else if(value==400){
    return '账单完成'
  }
})