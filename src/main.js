import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import TypeNav from '@/components/TypeNav'
import Router from 'vue-router'

const routerPush = Router.prototype.push
const routerReplace = Router.prototype.replace
Router.prototype.push = function push(location) {
  if(typeof(location)=="string"){
    var Separator = "&";
    if(location.indexOf('?')==-1) { Separator='?'; }
    location = location + Separator + "random=" + Math.random();
  } // if这段也可以没有
  return routerPush.call(this, location).catch(error=> error);
}
Router.prototype.replace = function replace(location) {
  if(typeof(location)=="string"){
    var Separator = "&";
    if(location.indexOf('?')==-1) { Separator='?'; }
    location = location + Separator + "random=" + Math.random();
  } // if这段也可以没有
  return routerReplace.call(this, location).catch(error=> error);
}
 
Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
