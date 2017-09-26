import axios from 'axios'

const BASE_URL = '/fresh-front'
const BASE_GOODS = '/fresh-goods'
const BASE_ORDER = '/fresh-order'
const BASE_V = '/fresh-voucher'
const BASE_BILL = '/fresh-bills'
const BASE_CEN = '/user-center'
const BASE_mer = '/fresh-member'
// 用户订单
export const orderlist = (prop) => {
    return axios({
        method:'post',
        url:BASE_ORDER+'/order/findAllOrders',
        params:prop
    })
}

// 用户管理
export const memberlist = (prop) => {
    return axios({
        method:'post',
        url:BASE_mer+'/memberInfo/find',
        params:prop
    })
}
export const memberadd = (prop) => {
    return axios({
        method:'post',
        url:BASE_mer+'/memberInfo/save',
        params:prop
    })
}
// 权限管理
export const permissionlist = (prop) => {
    return axios({
        method:'post',
        url:BASE_mer+'/permission/find',
        params:prop
    })
}
export const permissionadd = (prop) => {
    return axios({
        method:'post',
        url:BASE_mer+'/permission/save',
        params:prop
    })
}
export const permissionedit = (prop) => {
    return axios({
        method:'post',
        url:BASE_mer+'/permission/update',
        params:prop
    })
}
export const permissiondel = (prop) => {
    return axios({
        method:'post',
        url:BASE_mer+'/permission/delete',
        params:prop
    })
}
// 角色管理
export const rolelist = (prop) => {
    return axios({
        method:'post',
        url:BASE_mer+'/role/find',
        params:prop
    })
}
export const roleadd = (prop) => {
    return axios({
        method:'post',
        url:BASE_mer+'/role/save',
        params:prop
    })
}
export const roleedit = (prop) => {
    return axios({
        method:'post',
        url:BASE_mer+'/role/update',
        params:prop
    })
}
export const roledel = (prop) => {
    return axios({
        method:'post',
        url:BASE_mer+'/role/delete',
        params:prop
    })
}

// 预计配送订单
export const findadvOrder = (prop) => {
    return axios({
        method:'post',
        url:BASE_ORDER+'/order/findOrdersByStoreAndOrderStart',
        params:prop
    })
}
// 发货
export const shipments = (prop) => {
    return axios({
        method:'post',
        url:BASE_ORDER+'/order/shipments',
        params:prop
    })
}
// 商家对退货订单进行审核
export const returnCheck = (prop) => {
    return axios({
        method:'post',
        url:BASE_ORDER+'/order/returnCheckOrder',
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
        url:BASE_GOODS+'/goods/save',
    })
}
export const prolist = (prop) => {
    return axios({
        method:'post',
        url:BASE_GOODS+'/goods/findGoods',
        params:prop
    })
}
// 编辑待审核列表
export const checkPro = (prop) => {
    return axios({
        method:'post',
        url:BASE_GOODS+'/attrGoods/findAttrGoods',
        params:prop
    })
}
export const delGoods = (prop) => {
    return axios({
        method:'post',
        url:BASE_GOODS+'/goods/deleteByGoodsId',
        params:prop
    })
}
export const checkAdd = (prop) => {
    return axios({
        method:'post',
        url:BASE_GOODS+'/goods/checkAdd',
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
        url:BASE_GOODS+'/goods/edit',
       
    })
}

export const checkEdit = (prop) => {
    return axios({
        method:'post',
        url:BASE_GOODS+'/goods/checkEdit',
        params:prop
    })
}
export const findgoods = (prop) => {
    return axios({
        method:'post',
        url:BASE_GOODS+'/goods/findById',
        params:prop
    })
}
// 得到某个商品的库存
export const findSku = (prop) => {
    return axios({
        method:'post',
        url:BASE_GOODS+'/goodsStock/findByGoods',
        params:prop
    })
}
// 商品分类
export const gclist = ( ) => {
    return axios({
        method:'post',
        url:BASE_GOODS+'/gc/findGcList',
        
    })
}
export const classlist = () => {
    return axios({
        method:'post',
        url:BASE_GOODS+'/gc/findShowGcList',
        
    })
}
export const addClass = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_GOODS+'/gc/save'
    })
}
export const editData = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_GOODS+'/gc/update'
    })
}
export const removeClass = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_GOODS+'/gc/delete'
    })
}
// 品牌列表
export const brandlist = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_GOODS+'/brand/findBrands'
    })
}
export const addbrand = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_GOODS+'/brand/save'
    })
}
export const brandupdate = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_GOODS+'/brand/update'
    })
}
export const branddelete = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_GOODS+'/brand/delete'
    })
}
export const addbrandlist = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_GOODS+'/brand/findByGcAndStore'
    })
}
/////////---------------- banner start --------------//////////
export const bannerList = () => {
    return axios({
        method:'post',
        url:BASE_URL+'/adv/find'
    })
}
export const removeBanner = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/adv/delete'
    })
}
export const editBanner = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/adv/update'
    })
}
export const addBanner = (para) => {
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
        url:BASE_V+'/voucher/findVouchers'
    })
}
export const addvoucher = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_V+'/voucher/add'
    })
}
export const editvoucher = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_V+'/voucher/edit'
    })
}
export const delvoucher = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_V+'/voucher/delete'
    })
}
export const checkvoucher = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_V+'/voucher/check'
    })
}
// 得到的店铺
export const selectStore = (para) => {
     // 店铺审核通过的参数
    return axios({
        method:'post',
        params:para,
        url:BASE_GOODS+'/store/selectStore'
    })
}
export const updateStore = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_GOODS+'/store/update'
    })
}
 
export const deleteStore = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_GOODS+'/store/delete'
    })
}

export const saveStore = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_GOODS+'/store/save'
    })
}
/////////---------------- end --------------//////////
// 库存
export const kucunlist=(para)=>{
    return axios({
        method:'post',
        params:para,
        url:BASE_GOODS+'/goodsStock/findByCondition'
    })
}
export const kucunedit=(para)=>{
    return axios({
        method:'post',
        params:para,
        url:BASE_GOODS+'/goodsStock/update'
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

// 得到二维码
export const getErWeiMa = (para)  => {
    return axios({
        url:BASE_ORDER+'/order/MatrixToImage',
        method:'post',
        params:para
    }).then(res => {
        return res.data
    })
}