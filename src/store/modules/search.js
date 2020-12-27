//搜索页信息
import {reqList} from '@/api'
const state ={
    list:{}
}
const mutations ={
    // 修改初始值
    SET_LIST(state,list){
        state.list = list
    }
}
const actions = {
    async getList({commit},options){
        const result = await reqList(options)
        if(result.code === 200){
            commit('SET_LIST',result.data)
        }
    }
}
const getters = {
    // 当前需要的数据是list中的数据
    goodsList(state){
        return state.list.goodsList
    },
    trademarkList(state){
        return state.list.trademarkList
    },
    attrsList(state){
        return state.list.attrsList
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}