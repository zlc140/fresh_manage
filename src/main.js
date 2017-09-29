// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import { router } from './router'
import store from './store'
import { getStore } from '@/config/storage'
import filter from '@/config/filter'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/index.js'

Vue.config.productionTip = false

import axios from 'axios'
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  let str = error+''
  console.log(str.indexOf('403')>0)
  if(str.indexOf('403')>0){//登录失效
    window.location = '/login'
  }
   
  return Promise.reject(error);
});
// 全局引入组件
// import coreImage from '@/components/uploadImg'
// Vue.component('core-image',coreImage)
Vue.use(elementUI)
/* eslint-disable no-new */

// router.beforeEach((to, from, next) => {

//   if (getStore('username')) {//判断登录
//     if (to.path === '/login') {
//       next()
//     } else {
//       if (store.state.addRouters.length == 0) {
//         store.dispatch('GenerateRoutes', getStore('username')).then(() => {

//           if (JSON.stringify(store.state.addRouters).indexOf('\"' + to.name + '\"') > 0) {
//             next(to.path)
//           } else {
//             next('/view/proAdd')
//           }

//         }).catch(err => {
//           console.log(err)
//         })

//       } else {
        
//         if (JSON.stringify(store.state.addRouters).indexOf('\"' + to.name + '\"') < 0) {
//           next('/view/proAdd')
//         } else {
//           next()
//         }

//       }

//     }
//     next()
//   } else {
//     if (getStore('username') == null && to.path !== '/login') {
//       next({
//         path: '/login'
//       })
//     }
//     next()
//   }

// })



new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
