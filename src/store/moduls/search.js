//搜索页数据存储
import {
    reqSearch
} from '@/api'
const state = {
    searchList: {} // 搜索页总数据 
}
const mutations = {
    // 保存请求回来的data
    SET_SEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    async getSearchList({
        commit
    }, searchParams) {
        const result = await reqSearch(searchParams)
        if (result.code === 200) {
            commit('SET_SEARCHLIST', result.data)
        }
    }
}
const getters = {
    // 返回图片价格goods
    goodsList(state) { //当返回的数据不是我们想要的,我们想要数据里面的数据,
        //所以可以通过计算属性来计算出一个新的属性,往往当计算属性一开始的时候我们调用
        //
        return state.searchList.goodsList || []
    },
    // 返回品牌动态渲染
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    // 返回属性筛选列表
    attrsList(state) {
        return state.searchList.attrsList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
}