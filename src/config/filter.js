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
        let dates = new Date(parseInt(value))
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