


<template>
  <div class="pagination">
    <button :disabled="MycurrentPage === 1" :class="{disable:MycurrentPage === 1}" @click="$emit('getNewPage',MycurrentPage-1)">上一页</button>
    <!-- 当连续页开始位置大于一的时候就可以显示 -->
    <button v-if="startAndEnd.start > 1">1</button>
    <button v-if="startAndEnd.start > 2">...</button>
    <button 
    :class="{active:MycurrentPage === item}" 
    v-for="item in startAndEndArr"  
    :key="item"
    @click="$emit('getNewPage',item)"
    >{{item}}</button>
    <button v-if="startAndEnd.end < allPage - 1">...</button>
    <button v-if="startAndEnd.end < allPage" @click="$emit('getNewPage',allPage)">{{allPage}}</button>
    <!-- 当前的页数和遍历的数据一样就显示样式 -->
    <button :disabled="MycurrentPage === allPage" :class="{disable:MycurrentPage === allPage}"  @click="$emit('getNewPage',MycurrentPage + 1 )">下一页</button>
    <button disabled class="disable">共{{allReq}}条</button>
  </div>
</template>

<script>
// 设计一个高复用性的组件
  
// 首先需要设计props,需要用到哪些数据
// currentP: 传入的当前页,默认是一
// pageSize: 每页的最大展示量 默认是10
// totle : 总的请求条数
// showPage : 连续请求页的最大请求数量
// 需要设计data,自己也可以形成一个单独的生态环境
// Mycurrent: this.currentP || 1 根据父组件传入的值来进行计算,需要自己额外定义一个
// 自己生成一个小的生态
// 需要计算属性,根据现有的属性计算出需要的属性,

export default {
  name: "Pagination",
  props: {
    // 页面的初始位置 默认是1
    currentP: {
      type: Number,
      default: 1,
    },
    // 每页的数量
    pageSize: {
      type: Number,
      default: 10,
    },
    // 总的请求数量
    allReq: {
      type: Number,
      default:0
    },

    showPage: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      // 设计一个单独的数据,父组件也可以自定义
      MycurrentPage: this.pageNo || 1,
    };
  },
  computed: {
    // 总页数
    allPage() {
      // 需要的依赖数据
      const { pageSize, allReq } = this;
      return Math.ceil(allReq / pageSize);
    },
    // 设计连续请求页数的开始结束数值
    startAndEnd() {
      const { MycurrentPage, showPage, allPage } = this;
      let start, end;
      // 在暴露两个值的时候,对象存储可以通过属性名取出,而数组则是通过下标取值
      // current  showPage allPage
      // 5-2       5       8
      // 3 4 [5] 6 7
      // start =  MycurrentPage - (showPage - 1) / 2
      //  设计start
      start = MycurrentPage - Math.floor(showPage / 2);
      //  如果start 过小则会产生负值
      // [1] 2 3 4 5
      if (start < 1) {
        start = 1;
      }
      // 设计end
      // end  = MycurrentPage + (showPage - 1) / 2
      end = start + showPage - 1;
      // 但是也会有额外的特殊情况
      //  9 10 [11] 12 13
      if (end > allPage) {
        end = allPage;
        // 但是如果修正了结尾开始也需要相应的调试
        start = end - showPage + 1;
        // 但是总页数不够连续分页的数量,那么还是要将start默认设置为1
        if (allPage < showPage) {
          start = 1;
        }
      }
      return { start, end };
    },
    startAndEndArr(){
      const arr = []
      const { start,end} = this.startAndEnd
      for(let i = start ; i<=end;i++ ){
        arr.push(i)
      }
      return arr
    }
  },
  watch:{
    currentP(value){
      this.MycurrentPage = value
    }
  }
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

    &.disable{
      color:#ccc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #93eafa;
      color: #fff;
    }
  }
}
</style>

