// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import elementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
// import 'element-ui/lib/index.js'

Vue.config.productionTip = false

// 全局引入组件
// import coreImage from '@/components/uploadImg'
// Vue.component('core-image',coreImage)
Vue.use(elementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
