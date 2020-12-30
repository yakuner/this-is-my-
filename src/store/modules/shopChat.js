
// 详情页组件模块
import {reqShopChats} from '@/api'
const state = {}
const mutations = {}
const actions = {
    async postShopChat({commit},{skuid,skuNub}){
        const result = await reqShopChats(skuid,skuNub)
        if(result.code === 200){
            return 'ok'
        }else{
             throw error
        }
    }
}
const getters  = {}
export default {
    state,
    mutations,
    actions,
    getters
}

