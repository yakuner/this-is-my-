

import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建一个新的axios函数以及可以当成对象使用
const service = axios.create({
    baseURL:'http://39.99.186.36/api', //配置默认请求
    timeout:20000
})

// 设置请求拦截器,可以设置token在请求头目前无所作为,可以设置请求进度条
service.interceptors.request.use( (config)=>{
    // 设置显示进度条
    nprogress.start()
    return config
})

service.interceptors.response.use(
    response => { //设置成功的回调函数,隐藏进度条
        nprogress.done()
        return response.data
    },
    error => {
        // 统一提示错误信息    
        nprogress.done()
        alert(error)
        return Promise.reject(error)
    }
)
export default service