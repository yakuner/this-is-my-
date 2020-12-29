
<template>
  <div class="pagination">
    <button :disabled="Mycurrentpage <= 1" @click="Mycurrentpage -= 1">上一页</button>
    <button v-show="startEnd.start>1" @click = "Mycurrentpage = 1">1</button>

    <!-- start要大于1 -->
    <button disabled v-show="Mycurrentpage > 2">...</button>
    <!-- <button
      v-for="item in startEndArr"
      :key="item"
      :class="{ active: item=== Mycurrentpage }"
      @click="changePage(item)"
    >
      {{ item }}
    </button> -->
    <!-- start要大于2 -->
    <!-- 
      v-for与v-if的优先级   面试题
      v-for的优先级高, 先执行, 每个遍历都会执行v-if
      1). 将v-if判断的处理放在v-for父标签上: 只需要判断一次(原本是每个遍历的元素都会判断)  ==> 适用于判断与元素无关的情况
      2). 最好使用计算属性来去掉v-if  ===> 减少遍历的次数 ==> 适用于根据元素数据来判断的情况
    -->
     <!-- <span v-if="isShow"> 
        <button v-for="item in startEndArr"  :class="{active: item===myCurrentPage}" @click="setCurrentPage(item)" :key="item">{{item}}</button>
      </span>  -->
    <!-- 
     
    
    <! <button v-for="item in startEnd.end" v-if="item>=startEnd.start" 
      :class="{active: item===myCurrentPage}" @click="setCurrentPage(item)">{{item}}</button> -->
       <button disabled v-show="startEnd.end < allPage -1">...</button>
        <button v-show="startEnd.end < allPage" @click="Mycurrentpage = 12">{{allPage}}</button>
    <button
      :disabled="Mycurrentpage === allPage"
      @click="Mycurrentpage = Mycurrentpage + 1"
    >
      下一页
    </button>

    <button style="margin-left: 30px" disabled>共{{ allPage }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: [
    "currentPage", //当前页
    "pageSize", //请求的每页的数量
    "total", //请求的总数
    "showPageNo", //传入的每页的数量
  ],
  data() {
    // 为什么data中可以写入this,什么时候能写,什么时候不能写
    return {
      Mycurrentpage: this.currentPage 
    };
  },
  // 当页码变化请求数据

  watch: {
    // 监视当前状态的变化,状态改变重新请求
    Mycurrentpage(Mycurrentpage) {
      this.$emit("currentChange", Mycurrentpage);
    },
  },
  computed: {
    // 总页数  总的请求书除以每页的个数
    allPage() {
      const { pageSize, total } = this;
      return Math.ceil(total / pageSize);
    },
    // 中间的数组结构
    startEndArr() {
       const {start,end} = this.startEnd
      let arr = [];
      for (let i = start; i <= end; i++) {
        arr.push(i);
      }
      return arr;
    },
    // 中间可视区域
     startEnd(){
        //  定义两个单独的数字
         let start,end  
         const {Mycurrentpage,showPageNo,total,allPage} = this
        //  可视页数开始等于当前页减去,为什么要除以二
                      // 1              5/2    =-1 
                      // 2              5/2    = 0
                      // 3              5/2    = 1
                      // 4              5/2    = 2
                      // 5              5/2      3
                      // 6                2      4
                      //   7              2      5
                      //   8              2      6
                      //   9              2      7
         start = Mycurrentpage - Math.floor(showPageNo/2) 
        if(start <= 0){
          start = 1
        }
                  // 6       5         1      10
                  // 7       5         1      11
                  // 8       5         1      12
                  // 9       5         1      13
                  // 10      5         1      14
                  // 11      5         1      15
         end = start + showPageNo - 1 
        //  修正end的值
         if(end >allPage){
           end = allPage
          //  并且修正start的值,如果不写则只会开始增,结束不增加
           start = end -showPageNo +1
         }
        //  判断总页数是不是小于展示页数
         if(allPage< showPageNo){
           start = 1
         }
         return {
           start,
           end
         }
     }
  },
  methods: {
    // 点击改编页码
    changePage(index) {
        if(this.Mycurrentpage === index)return
        this.Mycurrentpage = index
    },
  },
};
</script>
<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>


总结自定义设计分页器,需要的东西

请求的单页,总的页数,要分的页数,单页个数,传入的调用重新请求

需要计算的东西:
总的页数  =  总请求 / 每页的个数 

监视data中当前的页数变化,当页数改变时,重新发送请求,其它的事件就可以只负责修改数据

自定义事件传递的是@后面的事件,是哪个子组件就使用哪个

中间部分设计让当前值永远处于中间.一般分页的显示都是奇数,所以我们在定义的时候就应该
确定好类型,然后根据这个值去确定首尾显示的截止数字

通用的复用件一般都考虑到设计好需要展示什么功能
