import axios from 'axios'

var BASE_URL = ''
// 用户订单
export const orderlist = (prop) => {
    return axios({
        methods:'post',
        url:BASE_URL+'/order/findAllOrders',
        params:prop
    })
}


// 商品分类--start--

// export const goodsClassList = (prop) => {
//     return axios({
//         methods:'post',
//         url:BASE_URL+'/gc/findShowGcList'
//     }).then((res) => {
//         if(res.data.state == 200){
//             return res.data.content
//         }
//         return []
//     }).catch(() => {
//         console.log('error')
//     })
// }
export const prolist = (prop) => {
    return axios({
        methods:'post',
        url:BASE_URL+'/goods/findGoods',
        params:prop
    })
}
export const gclist = (prop) => {
    return axios({
        methods:'post',
        url:BASE_URL+'/gc/findShowGcList',
        params:prop
    })
}