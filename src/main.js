// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import store from './store'
import { setStore,getStore } from '@/config/storage'

import elementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import 'element-ui/lib/index.js'

Vue.config.productionTip = false

// 全局引入组件
// import coreImage from '@/components/uploadImg'
// Vue.component('core-image',coreImage)
Vue.use(elementUI)
/* eslint-disable no-new */

router.beforeEach((to,from,next) => {
   console.log(getStore('username'))
  if(getStore('username')) {//判断登录
     console.log(1)
    if(to.path === '/login' ) {
      next()
    }else {
      // console.log(store.state.addRouters.length)
      if(store.state.addRouters.length == 0){     
        store.dispatch('GenerateRoutes',getStore('route_list')).then(() => {
            router.addRoutes(store.state.addRouters)
            for(let route of store.state.addRouters){
              router.options.routes.push(route)
            }
            console.log(router)
            next(to.path);
        }).catch(err => {
            console.log(err)
        })
          next()
      }  
        next()
      }
    next()
  } 
    next()
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
