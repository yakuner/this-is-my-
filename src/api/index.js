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



// mock数据请求
export  const mockFloors = ()=>mockajax.get('/floors')
