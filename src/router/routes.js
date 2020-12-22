import Home from '../pages/Home'
import Regisn from '../pages/Regisn'
import Search from '../pages/Search'
import Login from '../pages/Login'

export default [
    {
        path:'/',
        component:Home
    },
    {
        path:'/regisn',
        component:Regisn
    },
    {
        path:'/search/:keyWord',
        component:Search,
        name:'search',
        props(route){
            return{
                keyWord:route.params.keyWord
            }
        }
    },
    {
        path:'/login',
        component:Login
    },
]