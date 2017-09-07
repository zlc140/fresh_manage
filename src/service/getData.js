import axios from 'axios'

var BASE_URL = ''
// 用户订单
export const orderlist = (prop) => {
    return axios({
        method:'post',
        url:BASE_URL+'/order/findAllOrders',
        params:prop
    })
}
// 预计配送订单
export const findadvOrder = (prop) => {
    return axios({
        method:'post',
        url:BASE_URL+'/order/findOrdersByStoreAndOrderStart',
        params:prop
    })
}
// 发货
export const shipments = (prop) => {
    return axios({
        method:'post',
        url:BASE_URL+'/order/shipments',
        params:prop
    })
}
// 商家对退货订单进行审核
export const returnCheck = (prop) => {
    return axios({
        method:'post',
        url:BASE_URL+'/order/returnCheckOrder',
        params:prop
    })
}

// 商品
export const addgoods = (prop) => {
    return axios({
        method:'post',
        data:prop,
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        transformRequest: [function (data) {
            // Do whatever you want to transform the data
            let ret = ''
            for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            ret = ret.substring(0,ret.length-1)
            return ret
        }],
        url:BASE_URL+'/goods/save',
    })
}
export const prolist = (prop) => {
    return axios({
        method:'post',
        url:BASE_URL+'/goods/findGoods',
        params:prop
    })
}
// 编辑待审核列表
export const checkPro = (prop) => {
    return axios({
        method:'post',
        url:BASE_URL+'/attrGoods/findAttrGoods',
        params:prop
    })
}
export const delGoods = (prop) => {
    return axios({
        method:'post',
        url:BASE_URL+'/goods/deleteByGoodsId',
        params:prop
    })
}
export const checkAdd = (prop) => {
    return axios({
        method:'post',
        url:BASE_URL+'/goods/checkAdd',
        params:prop
    })
}
export const editgoods = (prop) => {
    return axios({
        method:'post',
        data:prop,
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        transformRequest: [function (data) {
            // Do whatever you want to transform the data
            let ret = ''
            for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            ret = ret.substring(0,ret.length-1)
            return ret
        }],
        url:BASE_URL+'/goods/edit',
       
    })
}

export const checkEdit = (prop) => {
    return axios({
        method:'post',
        url:BASE_URL+'/goods/checkEdit',
        params:prop
    })
}
export const findgoods = (prop) => {
    return axios({
        method:'post',
        url:BASE_URL+'/goods/findById',
        params:prop
    })
}
// 得到某个商品的库存
export const findSku = (prop) => {
    return axios({
        method:'post',
        url:BASE_URL+'/goodsStock/findByGoods',
        params:prop
    })
}
// 商品分类
export const gclist = ( ) => {
    return axios({
        method:'post',
        url:BASE_URL+'/gc/findGcList',
        
    })
}
export const classlist = () => {
    return axios({
        method:'post',
        url:BASE_URL+'/gc/findShowGcList',
        
    })
}
export const addClass = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/gc/save'
    })
}
export const editData = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/gc/update'
    })
}
export const removeClass = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/gc/delete'
    })
}
// 品牌列表
export const brandlist = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/brand/findBrands'
    })
}
export const addbrand = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/brand/save'
    })
}
export const brandupdate = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/brand/update'
    })
}
export const branddelete = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/brand/delete'
    })
}
export const addbrandlist = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/brand/findByGcAndStore'
    })
}
/////////---------------- banner start --------------//////////
export const brandList = () => {
    return axios({
        method:'post',
        url:BASE_URL+'/adv/find'
    })
}
export const removeBrand = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/adv/delete'
    })
}
export const editBrand = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/adv/update'
    })
}
export const addBrand = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/adv/save'
    })
}
// 代金券
export const voucherlist = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/voucher/findVouchers'
    })
}
export const addvoucher = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/voucher/add'
    })
}
export const editvoucher = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/voucher/edit'
    })
}
export const delvoucher = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/voucher/delete'
    })
}
export const checkvoucher = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/voucher/check'
    })
}
// 得到的店铺
export const selectStore = (para) => {
     // 店铺审核通过的参数
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/store/selectStore'
    })
}
export const updateStore = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/store/update'
    })
}
 
export const deleteStore = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/store/delete'
    })
}

export const saveStore = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/store/save'
    })
}
/////////---------------- end --------------//////////
// 库存
export const kucunlist=(para)=>{
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/goodsStock/findByCondition'
    })
}
export const kucunedit=(para)=>{
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/goodsStock/update'
    })
}
// 首页楼层
export const floorList = () => {
    return axios({
        method:'post',
        url:BASE_URL+'/floor/find'
    })
}

export const delFloor = (prop) => {
    return axios({
        method:'post',
        url:BASE_URL+'/floor/delete',
        params:prop
    })
}
export const saveFloor = (prop) => {
    return axios({
        method:'post',
        data:prop,
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        transformRequest: [function (data) {
            // Do whatever you want to transform the data
            let ret = ''
            for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            ret = ret.substring(0,ret.length-1)
            return ret
        }],
        url:BASE_URL+'/floor/save'
    })
}
export const editFloor = (prop) => {
    return axios({
        method:'post',
        data:prop,
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        transformRequest: [function (data) {
            // Do whatever you want to transform the data
            let ret = ''
            for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            ret = ret.substring(0,ret.length-1)
            return ret
        }],
        url:BASE_URL+'/floor/update'
    })
}