import Vue from 'vue'
import Vuex from 'vuex'
import home from '@/store/home'
import user from '@/store/user'
Vue.use(Vuex)

const mutations = {}
const actions = {}
const getters ={}
export default new Vuex.Store({
   modules:{
       home,user
   }
})