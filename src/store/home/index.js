
import {reqCategoryList} from '@/api'
const state = {
    CategoryList:[],
    xxx:111
}
const mutations = {
    RESOVLE_CATEGORYLIST_UPDATA(state,CategoryList){
        state.CategoryList = CategoryList
    }
}
const actions = {
    // 异步actions获取ajax响应数据
    async CategoryList({commit}){
        // 第一步发送请求
        const result =  await reqCategoryList()
        // 将收到的请求交给mutations设置状态
        commit('RESOVLE_CATEGORYLIST_UPDATA',result.data.splice(0,15))
    }
}
const getters = {
    }
export default {
    state,
    mutations,
    actions,
    getters,
}