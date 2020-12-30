import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import TypeNav from '@/components/TypeNav'
import Router from 'vue-router'
import './mock/mockServer'
import './plugin/awesome'
import Pagination from '@/components/pagination'
// 按需引入element-ui
import { Button, Message,Loading,MessageBox,Notification} from 'element-ui';
Vue.component(Button.name,Button)
Vue.component(Pagination.name,Pagination)
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;








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
  beforeCreate(){
    Vue.prototype.$bus = this  //配置全局事件总线
  },
  router,
  store,
  render: h => h(App),
}).$mount('#app')


//修改head全局事件总线,  修改push方法到router中