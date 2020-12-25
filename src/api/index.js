import ajax from './ajax'

// 发送菜单栏三级请求
export const reqCotagroyList =  () => ajax.get('/product/getBaseCategoryList')