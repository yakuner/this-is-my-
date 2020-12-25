import {reqCotagroyList} from '@/api'
const state= {
    // 定义一个初始值为数组
    cotaGroyList : [],
}
const mutations = {
    SET_COTA_GROY_LIST(state,cotaGroyList){
        state.cotaGroyList = cotaGroyList
    }
}
const actions = {
    async getCotaGroyList({commit}){
        const result = await reqCotagroyList()
        if(result.code === 200){
            commit('SET_COTA_GROY_LIST',result.data.slice(0,15))
        }

    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters,
}