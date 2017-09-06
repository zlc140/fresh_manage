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
        return tool.formatDate.format((value),'yyyy-MM-dd')
     
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
