<template>
  <div class="type-nav">
    <div class="container">
     <div @mouseenter="entercategoryList" @mouseleave="leavecategoryList">
        <h2 class="all">全部商品分类</h2>
      <div  class="sort" v-show="isHome" >
        <div class="all-sort-list2" @click="toSearch">
          <div class="item" v-for="(c1,index) in cotaGroyList" 
          :key="c1.categoryId"  
          :class="{active:current === index}"
          @mouseenter="showActions(index)" 
          @mouseleave="current === -1"
          >
            <h3>
              <!-- <a href="" @click="$router.push({name:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}})">{{c1.categoryName}}</a> -->
              <!-- <router-link :to="`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`" >{{c1.categoryName}}</router-link> -->
              <a href="javascript:" :data-cotagroyName="c1.categoryName" :data-categroy1Id="c1.categoryId">{{c1.categoryName}}</a>
            </h3>
            <div class="item-list clearfix" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
              <div class="subitem">
                <dl class="fore">
                  <dt>
                      <!-- <a href="" @click="$router.push({name:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}})">{{c2.categoryName}}</a> -->

                    <a href="javascript:" :data-cotagroyName="c2.categoryName" :data-categroy2Id="c2.categoryId">{{c2.categoryName}}</a>
                     <!-- <router-link :to="`/search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`" >{{c2.categoryName}}</router-link> -->
                  </dt>
                  <dd>
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                       <!-- <a href="" @click="$router.push({name:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}})">{{c3.categoryName}}</a> -->

                      <a href="javascript:" :data-cotagroyName="c3.categoryName" :data-categroy3Id="c3.categoryId">{{c3.categoryName}}</a>
                      <!-- <router-link :to="`/search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`" >{{c3.categoryName}}</router-link> -->
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
       
        </div>
      </div>
     </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
     
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: "TypeNav",
  data(){
    return {
        current: -1,
        isHome:false
    }
  },
  methods:{
    // 进入直接显示
    // showActions(index){
    //   this.current = index
    // },
    // 用节流的方式防止触发频率太高
    // 什么是节流和防抖?节流和防抖都是解决页面频繁调用回调的,导致页面页面卡顿,不断的频繁请求会无故增加服务器的压力
    // 就像同样点击一百次,那么回调就会触发一百次,节流的效果就是你一直连续点击,只会定时触发几次,而防抖则只会触发最后那一次回调
    showActions:throttle((index)=>{
      this.current = index
    } ) ,
    entercategoryList(){
        this.isHome = true
    },
    // 离开判断是否是home,不是在做修改
    leavecategoryList(){
        if(this.$route.path !== '/'){
          this.isHome = false
        }
    },
    toSearch(event){
      // 解构event.target 取出里面的自定义标签的内容,所以我们要自定义标签
      const {cotagroyname,categroy1id,categroy2id,categroy3id,} = event.target.dataset
      if(categroy1id){
        let params = {}
        this.$router.push({name:'search',query:{cotagroyName:cotagroyname,category1Id:categroy1id},params:this.$route.params}).catch( ()=>{})
      }
      if(categroy2id){
        this.$router.push({name:'search',query:{cotagroyName:cotagroyname,category2Id:categroy2id},params:this.$route.params}).catch( ()=>{})
      }
      if(categroy3id){
        this.$router.push({name:'search',query:{cotagroyName:cotagroyname,category3Id:categroy3id},params:this.$route.params}).catch( ()=>{})
      }
    }
  },
  mounted(){
      this.isHome = this.$route.path === '/' ? true : false
  },
  computed:{
    ...mapState({
      cotaGroyList: state => state.home.cotaGroyList
    })
  }
};
//第一种声明式导航式不可取的,因为遍历会生成很多的路由连接,这样会导致浏览器加载的很慢
// 所以我们考虑到使用编程式导航,但是也需要给遍历的每个a元素绑定功能相同的点击事件,这样是完全没有必要额,
// 所以我们使用代理进行统一点击,但是这样还是会有问题,编程式导航连续点击跳转同一路由出导航重复的错误,
// 这是push内部指定的三个参数的问题,我们平时如果只写跳转的信息不写后面的回调重复点击,
// push内部就会直接返回一个失败的promise对象,我们可以用.catch接住.也可以重写push方法,
// 重写内部屏蔽导航重复这个错误就可以,其他的错误信息向下穿透
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          
        }
        .active {
            background-color: skyblue;
            .item-list {
              display: block;
            }
          }
      }
    }
  }
}
</style>
