// 定义接口请求函数
import ajax from './ajax'
import mockajax from '@/api/mockajax' 
// 发送动态渲染三级菜单栏的数据

export const reqCotaGoryList  = () => ajax.get('/product/getBaseCategoryList')
// 搜索页请求/
export const reqList  = (listObj) => {
   return ajax({
        url:'/list',
        method:'POST',
        data:listObj
    })
}
// 请求主页轮播数据
export const reqHomeBanner = () => ajax.get('/cms/banner')

// 请求商品详情页信息
export const reqDetileInfo = (skuid) => {
    return ajax({
        url:`/item/${skuid}`
    })
}
// 请求购物车成功信息
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqShopChats  = (skuId,skuNum) => {
    return ajax({
        url:`/cart/addToCart/${ skuId }/${ skuNum }`,
        method:'POST'
    })
}



// mock数据请求
export  const mockFloors = ()=>mockajax.get('/floors')
