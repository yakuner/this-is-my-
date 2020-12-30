<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="enterAndShow" @mouseleave="leaveAndHide">
        <h2 class="all">全部商品分类</h2>
        <div class="sort" @click.prevent="toSearch" v-show="isShow">
          <div class="all-sort-list2">
            <div
              class="item"
              v-for="(c1, index) in cotaGroyList"
              :key="c1.categoryId"
              :class="{ active: current === index }"
              @mouseenter="mouseEnter(index)"
            >
              <h3>
                <a
                  href=""
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
                <!-- <a href="javascript:" :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a> -->
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dt>
                      <a
                        href=""
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >

                      <!-- <a href="javascript:" :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a> -->
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          href=""
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >

                        <!-- <a href="javascript:" :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a> -->
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
import { mapState } from "vuex";
import _ from "lodash";
export default {
  name: "TypeNav",
  data() {
    return {
      current: -2,
      isShow: false,
    };
  },
  created() {
    this.isShow = this.$route.name === "home" ? true : false;
  },
  methods: {
    // 设计鼠标移动事件,加上样式
    // 问题:鼠标滑动每个都展示,我们不需要这样快速的每个都展示,只需要展示其中几个
    // 函数节流和防抖都是可以有效的防止频繁的触发事件,举个例子,假如连续点击一百下,正常不作处理那么就会调用一百次函数,
    // 节流就会定时的触发几次,而防抖则只会触发最后一次
    // 但是又会触发新的问题,
    // 移出菜单栏数据从-1变回了移除之前的数据?
    // 因为throttle这个方法默认最后一个是延迟执行的,所以等我们移出后又会再次调用这个方法重新赋值,所以我们需要一个最外层的数据防止数据改动
    mouseEnter: _.throttle(function (index) {
      if (this.current !== -2) {
        this.current = index;
      }
    }, 300),
    // 在跳转搜索页的时候,我们使用声明式导航进行跳转,但是这样会产生大量的路由连接,会导致加载很慢,所以我们使用编程式导航跳转
    // 但是使用编程式导航也会出现大量重复的事件绑定,所以我们使用事件代理来进行事件的绑定,这样使用一个绑定事件就可以完成跳转任务
    // 但是我们要配合着自定义标签属性进行对单一属性进行取值
    toSearch(event) {
      const {
        categoryname,
        category1id,
        category2id,
        category3id,
      } = event.target.dataset;
      // 判断哪个有值,就添加哪个
      if (category1id) {
       if(this.$route.name === 'search'){
          this.$router.replace({
          name: "search",
          query: { categoryName: categoryname, category1Id: category1id},params:this.$route.params
       })}else{
          this.$router.push({
          name: "search",
          query: { categoryName: categoryname, category1Id: category1id},params:this.$route.params
        });
       }
      
      }
      if (category2id) {
       if(this.$route.name === 'search'){
          this.$router.replace({
          name: "search",
          query: { categoryName: categoryname, category2Id: category2id},params:this.$route.params
       })}else{
          this.$router.push({
          name: "search",
          query: { categoryName: categoryname, category2Id: category2id},params:this.$route.params
        });
       }
      
      }
      if (category3id) {
       if(this.$route.name === 'search'){
          this.$router.replace({
          name: "search",
          query: { categoryName: categoryname, category3Id: category1id},params:this.$route.params
       })}else{
          this.$router.push({
          name: "search",
          query: { categoryName: categoryname, category3Id: category3id},params:this.$route.params
        });
       }
      
      }
     
      this.leaveAndHide()
    },
    // 进入的状态
    enterAndShow() {
      this.current = -1;
      this.isShow = true;
    },
    // 离开的状态
    leaveAndHide() {
      this.current = -2;
      if (this.$route.name !== "home") {
        this.isShow = false;
      }
    },
  },
  computed: {
    ...mapState({
      cotaGroyList: (state) => state.home.cotaGroyList,
    }),
  },
};
</script>

<style lang="less" scope>
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
          &.active {
            background-color: #ccc;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
