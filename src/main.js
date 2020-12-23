import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

import TypeNav from '@/components/TypeNav'
Vue.config.productionTip = false
// 全局注册typenav组件
Vue.component(TypeNav.name,TypeNav)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
