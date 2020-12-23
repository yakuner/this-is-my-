import axios from 'axios'
import nprogress from 'nprogress'
    //配置默认跳转接口以及等待数据时间
const service  = axios.create({
    baseURL:'http://39.99.186.36/api',
    timeout:100000
})
// 设置请求拦截器
service.interceptors.request.use( (config)=>{
    nprogress.start()
    return config
})

// 设置响应拦截器
service.interceptors.response.use( 
    response => { //设置响应成功的回调
        nprogress.done()
        return response.data
    },
    error => {  //设置响应失败的回调
        nprogress.done()
        alert(error)
        return Promise.reject(error)
    }
)
// 将二次封装后的axios请求暴露
export default service