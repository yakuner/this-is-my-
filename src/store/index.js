import Vuex from 'vuex'
import Vue from 'vue'
import modules from './modules'
//声明使用插件
Vue.use(Vuex)

export default new Vuex.Store({
    modules
})
