import Vue from 'vue'
import Router from 'vue-router'

import {Login} from './component'


import main from '../components/main'
// 商品
import {proList,classList,brand,proAdd,review} from './component'
// 前台用户
import {userList,newuser,reply,feedback} from './component'
// 订单管理
import {orderList,advorder,bill,orderDetail} from './component'
// 库存管理
import {kucunList,kucunDetail,returnPro,sendPro} from './component'
// 内容管理
import {essayClass,essayManage,floor,banner,nav} from './component'
// 系统管理
import {transport,manageList} from './component'
// 报表统计
import {baobiao} from './component'

Vue.use(Router)
export const router = new Router({
  mode:'history',
  routes: [
    {  path:'', redirect:'/login' },
    {  path:'/login', name:'登录', component:Login }
     
  ]
})

export const routerList = [
    {
      path:'/view',
      name:'商品模块',
      component:main,
      children:[
        {path:'prolist',component:proList,name:'商品列表'},
        {path:'classlist',component:classList,name:'商品分类列表'},
        {path:'brand',component:brand,name:'商品品牌列表'},
        {path:'proAdd',component:proAdd,name:'新增商品'},
        {path:'review',component:review,name:'商品评论'}
      ]
    },
    {
      path:'/user',
      name:'前台用户管理',
      component:main,
      children:[
        {path:'userlist',component:userList,name:'用户管理'},
        {path:'newuser',component:newuser,name:'新增用户'},
        {path:'reply',component:reply,name:'回复用户'},
        {path:'feedback',component:feedback,name:'用户回馈列表'},
      ]
    },
     {
      path:'/order',
      name:'用户订单管理',
      component:main,
      children:[
        {path:'orderlist',component:orderList,name:'订单管理'},
        {path:'advorder',component:advorder,name:'预订单管理'},
        {path:'bill',component:bill,name:'账单管理'},
        {path:'orderdetail',component:orderDetail,name:'订单详情'}
      ]
    },
     {
      path:'/kucun',
      name:'商品库存管理',
      component:main,
      children:[
        {path:'kucunlist',component:kucunList,name:'库存管理'},
        {path:'kucundetail',component:kucunDetail,name:'库存明细'},
        {path:'sendPro',component:sendPro,name:'发货备货管理'},
        {path:'returnPro',component:returnPro,name:'退货管理'}
      ]
    },
     {
      path:'/content',
      name:'内容管理',
      component:main,
      children:[
          {path:'banner',component:banner,name:'首页banner管理'},
          {path:'nav',component:nav,name:'头部导航管理'},
          {path:'floor',component:floor,name:'首页楼层管理'},
          {path:'essayclass',component:essayClass,name:'文章分类管理'},
          {path:'essaymanage',component:essayManage,name:'文章管理'},
       
      ]
    },
     {
      path:'/manage',
      name:'系统管理',
      component:main,
      children:[
          {path:'managelist',component:manageList,name:'后台用户管理'},
          {path:'transport',component:transport,name:'物流管理'}
         
       
      ]
    },
    {
      path:'/view',
      name:'统计报表',
      component:main,
      children:[
          {path:'baobiao',component:baobiao,name:'报表展示'},
      ]
    }
    ]

