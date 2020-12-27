// home组件模块
import {reqCotaGoryList} from '@/api'
const  state = {
    cotaGroyList : [],
    xxx:111
}
const mutations = {
    // 保存三级菜单请求
    SET_COTA_GROY_LIST(state,cotaGroyList){
        state.cotaGroyList = cotaGroyList
    }
}
const actions = {
    //存取三级菜单请求
    async getCotaGroyList({commit}){
        const result = await reqCotaGoryList()
        if(result.code === 200){
            commit('SET_COTA_GROY_LIST',result.data.splice(0,15))
        }
    }
}
const getters = {}
export default {
    state,mutations,actions,getters
}

