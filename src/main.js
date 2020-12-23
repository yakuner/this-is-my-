import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
Vue.config.productionTip = false
// 全局注册typenav组件
Vue.component(TypeNav.name,TypeNav)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
