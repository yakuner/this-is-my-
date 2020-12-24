
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Reginter from '@/pages/Reginter'

export default [

    {
        path:'/',
        component:Home
    },
    {
        path:'/search',
        component:Search,
        name:'search'
    },
    
    {
        path:'/login',
        component:Login
    },
    {
        path:'/reginter',
        component:Reginter
    },

]
   
