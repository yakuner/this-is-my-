import ajax from './ajax'
import Mockajax from './Mockajax'
// 发送菜单栏三级请求
export const reqCotagroyList =  () => ajax.get('/product/getBaseCategoryList')
// 发送动态渲染轮播图请求
export const reqBannerList =  () => ajax.get('/cms/banner')
//发送搜索页请求,请求参数
export const reqSearch = searchParams => ajax.post('/list',searchParams)

// 发送mock模拟数据
// 发送楼层模拟请求
export const reqMockFloors = () => Mockajax.get('/floors')
// 发送今日推荐发送请求
export const reqMockRemmonds = () => Mockajax.get('/remmonds')
export const reqMockRank = () => Mockajax.get('/Rank')
export const reqMockLike = () => Mockajax.get('/like')