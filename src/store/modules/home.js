// home组件模块
import {reqCotaGoryList,reqHomeBanner,mockFloors} from '@/api'
const  state = {
    cotaGroyList : [],
    banner:[],
    floors:[]

}
const mutations = {
    // 保存三级菜单请求
    SET_COTA_GROY_LIST(state,cotaGroyList){
        state.cotaGroyList = cotaGroyList
    },
    SET_BANNER_LIST(state,banner){
        state.banner = banner
    },
    SET_FLOORS(state,floors){
        state.floors = floors
    },

}
const actions = {
    //存取三级菜单请求
    async getCotaGroyList({commit}){
        const result = await reqCotaGoryList()
        if(result.code === 200){
            commit('SET_COTA_GROY_LIST',result.data.splice(0,15))
        }
    },
    async getBannerList({commit}){
        const result = await reqHomeBanner()
        if(result.code === 200){
            commit('SET_BANNER_LIST',result.data)
        }
    },
    async getFloors({commit}){
        const result = await mockFloors()
        if(result.code === 200){
            commit('SET_FLOORS',result.data)
        }
    }
}
const getters = {}
export default {
    state,mutations,actions,getters
}

