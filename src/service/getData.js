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
export const addgoods = (prop) => {
    return axios({
        methods:'post',
        url:BASE_URL+'/goods/save',
        params:prop
    })
}
export const prolist = (prop) => {
    return axios({
        methods:'post',
        url:BASE_URL+'/goods/findGoods',
        params:prop
    })
}
export const editgoods = (prop) => {
    return axios({
        methods:'post',
        url:BASE_URL+'/goods/edit',
        params:prop
    })
}
export const findgoods = (prop) => {
    return axios({
        methods:'post',
        url:BASE_URL+'/goods/findById',
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
export const classlist = ( ) => {
    return axios({
        methods:'post',
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
// 店铺
export const selectStore = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/store/selectStore'
    })
}
export const deleteStore = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/store/delete'
    })
}
export const updateStore = (para) => {
    return axios({
        method:'post',
        params:para,
        url:BASE_URL+'/store/update'
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
        url:BASE_URL+'/floor/findAll'
    })
}