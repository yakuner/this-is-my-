import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

export default new VueRouter({
    mode:'history',
    routes,
    // 始终保持页面滚动条处于最上面
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
      }
})