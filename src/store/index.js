import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import user from './user'
// 生命使用插件
Vue.use(Vuex)

// 将store对象暴露出去
export default new Vuex.Store({
    modules:{
        user,home
    }
})

// 什么是多模块编程,

//     多模块是vuex在处理复杂的大型项目式按功能模块将每个功能使用的状态以及方法定义在不同的js文件中,
// 最后引入到vuex中的modules对象中,
// 为什么要使用多模块编程?
//     出现什么问题: 在单模块进行编写代码的时候,我们定义的状态越来越多,随之修改状态的方法也会成倍增加啊,代码越来越多不仅看起来乱,
// 而且也不利于维护,所以采用多模块编程的方式,这样一个个模块方便利于维护,也增加了可扩展性,如果我们想增加一个功能.在增加一个模
// 块引入到核心store文件中就可以了
    