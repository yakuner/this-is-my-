import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 创建一个高仿axios
const service  = axios.create({
    baseURL:'http://39.99.186.36/api',
    timeout:20000
})

// 设置请求拦截器
service.interceptors.request.use(config =>{
    nprogress.start()
    return config
})
// 设置响应拦截器
service.interceptors.response.use(
    response => {//成功的回调
        nprogress.done()
        return response.data
    },
    error => {//失败的回调
        nprogress.done()
        // 统一处理错误
        alert(error)
        return Promise.reject(error)
    }
)
export default service