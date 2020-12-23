import ajax from './ajax'
// 设置接口请求函数
// 发送菜单栏三级导航数据
export const reqCotagroyList =  () => ajax.get('/product/getBaseCategoryList')