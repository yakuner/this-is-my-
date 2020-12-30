
// 详情页组件模块
import {reqDetileInfo} from '@/api'
const  state = {
    detileInfo : {}
}
const mutations = {
    SET_DETILEINFO(state,detileInfo){
        state.detileInfo = detileInfo
    }

}
const actions = {
    async getDetileInfo({commit},skuid){
        const result = await reqDetileInfo(skuid)
        if(result.code === 200){
            commit('SET_DETILEINFO',result.data)
        }   
    }
}
const getters = {
    // 面包屑
    categoryView(state){
        return  state.detileInfo.categoryView || {}
    },
    //销售属性
    spuSaleAttrList(state){
        return  state.detileInfo.spuSaleAttrList || []
    }, 
    // 商品介绍
    skuInfo(state){
        return  state.detileInfo.skuInfo || {} 
    },
    // 不能读取两层以上代码
   
}
export default {
    state,mutations,actions,getters
}

