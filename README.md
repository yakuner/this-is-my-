mock使用总结:
如果想要使用必须有自己写好的json文件,然后定义一个mock文件,
然后在main文件中引入该文件
我们单独定义一个文件引入的是mock这个对象,使用mock()这个方法
注意:mock中的方法必须是通过ajax发送的才有效果,而且如果不指定data的属性的话 就会使用自己引入的文件名,


1.store 中state定义数据需要根据接口文档定义好的来指定初始值

初始化search路由页面流程
```
1-定义接口请求函数 
2-设置初始状态(根据接口文档进行定义,如果接口文档中定义的data是对象那么我们也定义一个对象,
如果是数组我们也定义成数组)
3.在合适的时机触发调用派发发送请求,将数据展示给使用的页面动态渲染
在动态渲染的时候有可能出现二维数组,一定要仔细观察结构
我们需要用到getters计算属性的时候,为什么用? 因为我们想要用的数据需要靠已经有的数据得出而来,同时我们需要使用这个属性的某些功能,当其他组件也同样需要这个计算属性时我们定义在getters中,同时指定如果没有值时需要|| 一个需要的初始化类型的值
return  state.aaa || []  或者对象 这样没有值使用属性也不会报错
```


在search中