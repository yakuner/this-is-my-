// home组件主页相关的状态设置
import {reqCotagroyList} from '@/api'
const state = {
    CategoryList: [],
    xxx: 111
}
const mutations = {
    RESOVE_CONGROY_LIST(state, CategoryList) {
        state.CategoryList = CategoryList
    }
}
const actions = {
    // 设计异步请求数据逻辑
    async getCategoryList({commit}){
        // 发送ajax请求获取数据,
        const result = await reqCotagroyList()
        result.code === 200 ? commit('RESOVE_CONGROY_LIST',result.data.splice(0,15)) : alert('位置错误')
        // 判断响应码,是200将数据推送到修改状态的方法
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}