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

// 商品
export const prolist = (prop) => {
    return axios({
        methods:'post',
        url:BASE_URL+'/goods/findGoods',
        params:prop
    })
}

// 商品分类
export const gclist = ( ) => {
    return axios({
        methods:'post',
        url:BASE_URL+'/gc/findGcList',
        
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
/////////---------------- end --------------//////////

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