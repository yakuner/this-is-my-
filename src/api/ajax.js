import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const service = axios.create({
    baseURL:'http://182.92.128.115/api',
    timeout:200000
})
// 设置请求拦截器,并设置进度条样式
service.interceptors.request.use(config => {
    nprogress.start()
    return config
})

service.interceptors.response.use(
    response => {  //设置成功回调
        nprogress.done()
        return response.data
      
    },
    error => { //设置失败回调
        alert(error)
        return Promise.reject(error)
    }
)
export default service