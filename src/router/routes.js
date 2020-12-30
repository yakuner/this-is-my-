import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Reginter from '@/pages/Reginter'
import Search from '@/pages/Search'
import Detile from '@/pages/Detile'
import ShopCart from '@/pages/ShopCart/ShopCart'
export default [
    {
        path:'/',
        component:Home,
        name:'home',
        meta:{
            isShow:true
        }
    },
    {
        path:'/login',
        component:Login,
        meta:{
            isShow:false
        }
    },
    {
        path:'/reginter',
        component:Reginter,
        meta:{
            isShow:false
        }
    },
    {
            // 加上问好代表可穿可不传,但是要验证判断同时使用
        path:'/search/:keyword?',
        component:Search,
        name:'search',
        props(route){
            return{
                keyword:route.params.keyword
            }
        },
        meta:{
            isShow:true
        }
    },
    {
        //商品详情页
        path:'/detile/:skuid',
        component:Detile
    },
    {
        path:'/shopchat',
        component:ShopCart,
        name:'shopchat'
    }
]