import axios from 'axios'

const service = axios.create({
    baseURL: '/mock'
})

service.interceptors.request.use(config => {
    return config
})
// 设置响应拦截器
service.interceptors.response.use(
    response => { //成功的回调  
        return response.data
    },
    error => { //失败的回调
        // 统一处理错误
        alert(error)
        return Promise.reject(error)
    }
)
export default service