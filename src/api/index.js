// 设置接口请求函数

import ajax from './ajax'

//获取首页三级目录渲染的请求
export const reqCategoryList  = () => ajax.get('/product/getBaseCategoryList')