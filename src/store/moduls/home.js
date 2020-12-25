import {reqCotagroyList,reqBannerList} from '@/api'
const state= {
    // 定义一个初始值为数组
    cotaGroyList : [],
    bannerList : []
}
const mutations = {
    SET_COTA_GROY_LIST(state,cotaGroyList){
        state.cotaGroyList = cotaGroyList
    },
    SET_BANNER_LIST(state,bannerList){
        state.bannerList = bannerList
    }
}
const actions = {
    async getCotaGroyList({commit}){
        const result = await reqCotagroyList()
        if(result.code === 200){
            commit('SET_COTA_GROY_LIST',result.data.slice(0,15))
        }
    },
    async getBannerList({commit}){
        const result = await reqBannerList()
        if(result.code === 200){
            commit('SET_BANNER_LIST',result.data)
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