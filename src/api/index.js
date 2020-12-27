// 定义接口请求函数
import ajax from './ajax'

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
