
import VueRouter from 'vue-router'
import Vue from 'vue'
import routes from './routes'
//声明使用插件
Vue.use(VueRouter)

// 报录一个router对象

export default new VueRouter({
    mode:'history',
    routes
})