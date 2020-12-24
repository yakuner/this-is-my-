// 用于三级目录跳转功能模块,目前只有跳转操作
export function judgeSearch(that,path,custom){
    // 遍历对象取出第二项和第三项
    const result = Object.keys(custom).splice(1, 2)
    //["categoryname", "category3id"]
    if (result[1]) {
      // 写一个正则判断是否有数字
      // 截取每次点击关键字,创建属性名
      const newCate = result[0].replace(/n/i, "N");
      const newId = result[1].replace(/i/i, "I");
      that.$router.replace({
        name: path,
        query: { [newCate]: custom[result[0]], [newId]: custom[result[1]] },
       }).catch((error)=>{
        if(error.name === 'NavigationDuplicated'){
            return new Promise( ()=>{})
        }
        return Promise.reject(error)
  })
    }
  }
//编程式导航重复点击跳转相同路由地址提示NavigationDuplicated导航重复错误,我自己一
// 开始解决的时候打算监视这个路径,如果有变动,就重新调用封装好的方法,但是发现没用,因为后来我发现这个新的特性是3版本之后推出的
// push的语法是({路由信息},成功的回调,失败的回调),如果没有指定回调,那么重复点击之后该方法就会返回一个失败的

//   function judgeSearch(custom){
//     // 遍历对象取出第二项和第三项
//     const result = Object.keys(custom).splice(1, 2)
//     //["categoryname", "category3id"]
//     if (result[1]) {
//       // 写一个正则判断是否有数字
//       // 截取每次点击关键字,创建属性名
//       const newCate = result[0].replace(/n/i, "N");
//       const newId = result[1].replace(/i/i, "I");
//       this.$router.push({
//         name: "search",
//         query: { [newCate]: custom[result[0]], [newId]: custom[result[1]] },
//       });
//     }
//   }