import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import TypeNav from '@/components/TypeNav'
import '@/plugin/awesome'
import '@/mock/MockServer'
import Router from 'vue-router'
// 按需引入element-ui样式
import {Tag} from 'element-ui'
// 全局定义注册
Vue.use(Tag)
// 解决编程式路由跳转重复的出现导航重复的问题
const originalReplace = Router.prototype.replace;
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};
Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)
new Vue({
  beforeCreate(){
      Vue.prototype.$bus = this    //设置全局事件总线 用于search页面向header页面通信
  },
  router,
  store,
  render: h => h(App),
}).$mount('#app')
