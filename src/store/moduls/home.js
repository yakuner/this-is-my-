import {
    reqCotagroyList,
    reqBannerList,
    reqMockFloors,
    reqMockRemmonds,
    reqMockRank,
    reqMockLike
} from '@/api'
const state= {
    // 定义一个初始值为数组
    cotaGroyList : [],
    bannerList : [],
    floors : [],
    remmonds :{},
    rank:[],
    like:[]
}
const mutations = {
    SET_COTA_GROY_LIST(state,cotaGroyList){
        state.cotaGroyList = cotaGroyList
    },
    SET_BANNER_LIST(state,bannerList){
        state.bannerList = bannerList
    },
    SET_FLOORS(state,floors){
        state.floors = floors
    },
    SET_REMMONDS(state,remmonds){
        state.remmonds = remmonds
    },
    SET_RANK(state,rank){
        state.rank = rank
    },
    SET_LIKE(state,like){
        state.like = like
    },
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

    },
    async getfloors({commit}){
        const result = await reqMockFloors()
        if(result.code === 200){
            commit('SET_FLOORS',result.data)
        }
    },
    async getRemmonds({commit}){
        const result = await reqMockRemmonds()
        if(result.code === 200){
            commit('SET_REMMONDS',result.data)
        }

    },
    async getRank({commit}){
        const result = await reqMockRank()
        if(result.code === 200){
            commit('SET_RANK',result.data)
        }

    },
    async getLike({commit}){
        console.log('@@');
        const result = await reqMockLike()
        console.log(result);
        if(result.code === 200){
            commit('SET_LIKE',result.data)
        }

    },
}
const getters = {
}
export default {
    state,
    mutations,
    actions,
    getters,
}