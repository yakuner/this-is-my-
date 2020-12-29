import axios from 'axios'

const service  = axios.create({
    baseURL:'/mock'  //默认跳转地址
})

service.interceptors.request.use(
    config =>{
        return config
    }
)
service.interceptors.response.use(
    response => response.data,
    error => {alert(error); return Promise.reject(error)}
)
export default service