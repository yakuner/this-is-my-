import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import { message} from 'element-ui';
// Vue.prototype.$message = message

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
