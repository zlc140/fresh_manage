import Vue from 'vue'
import Router from 'vue-router'

import {Login} from './component'


import main from '../components/main'
// 首页管理
import {floor,banner} from './component'
// 前台用户
import {userList,newuser,role} from './component'
// 订单管理
import {orderList,advorder} from './component'
// 商品
import {proList,classList,brand,proAdd,review,kucunList} from './component'
// 商铺管理
import { storeList }  from './component'
// 审核
import { checkBrand,checkPro,checkUser,checkStore,checkCoupon  } from './component'
// 优惠券
import { couponList,history }  from './component'
// 账单
import {bill } from './component'
// 财务
import {finance} from './component'
// 系统管理
import {manageList} from './component'
// 报表统计
import {baobiao} from './component'

Vue.use(Router)
export const router = new Router({
  mode:'history',
  routes: [
    { path:'/', redirect:'/login'},
    {  path:'/login', name:'登录', component:Login },
    {
      path:'/content',
      name:'首页管理',
      component:main,
      children:[
          {path:'banner',component:banner,name:'banner管理'},
          {path:'floor',component:floor,name:'楼层管理'}
      ]
    },
    {
      path:'/User',
      name:'用户模块',
      component:main,
      children:[
        {path:'userlist',component:userList,name:'用户管理'},
        {path:'newuser',component:newuser,name:'权限管理'},
        {path:'role',component:role,name:'角色管理'},
        // {path:'feedback',component:feedback,name:'用户回馈列表'},
      ]
    },
    {
      path:'/Order',
      name:'订单模块',
      component:main,
      children:[
        {path:'orderlist',component:orderList,name:'订单管理'},
        {path:'advorder',component:advorder,name:'预计配货'}
      ]
    },
    {
      path:'/view',
      name:'商品模块',
      component:main,
      children:[
        {path:'proAdd',component:proAdd,name:'发布商品'},
        {path:'prolist',component:proList,name:'商品列表'},
        {path:'kucunlist',component:kucunList,name:'库存管理'},
        {path:'classlist',component:classList,name:'商品分类'},
        {path:'brand',component:brand,name:'品牌列表'},
        // {path:'review',component:review,name:'商品评论'}
      ]
    },
    
    {
      path:'/bill',
      name:'账单模块',
      component:main,
      children:[
          {path:'orderBill',component:bill,name:'账单查询'}
      ]
    },
    {
      path:'/shop',
      name:'商铺模块',
      component:main,
      children:[
          {path:'storeManage',component:storeList,name:'商铺管理'}
      ]
    },
    {
      path:'/check',
      name:'审核',
      component:main,
      children:[
          {path:'checkBrand',component:checkBrand,name:'品牌审核'},
          {path:'checkPro',component:checkPro,name:'商品审核'},
          {path:'checkUser',component:checkUser,name:'用户审核'},
          {path:'checkStore',component:checkStore,name:'店铺审核'},
          {path:'checkCoupon',component:checkCoupon,name:'代金券审核'},
      ]
    },
    {
      path:'/coupon',
      name:'优惠活动',
      component:main,
      children:[
          {path:'couponList',component:couponList,name:'管理代金券'},
          {path:'history',component:history,name:'操作日志'},
      ]
    },
    {
      path:'/finance',
      name:'财务模块',
      component:main,
      children:[
          {path:'finance',component:finance,name:'财务管理'}
      ]
    },
    {
      path:'/tabel',
      name:'报表模块',
      component:main,
      children:[
          {path:'baobiao',component:baobiao,name:'报表管理'}
      ]
    },
    {
      path:'/Manage',
      name:'系统设置',
      component:main,
      children:[
          {path:'managelist',component:manageList,name:'基本设定'}
      ]
    },
    ]
})
  
