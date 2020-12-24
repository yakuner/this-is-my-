<template>
  <div class="type-nav">
    <div class="container">
      <h2 class="all">全部商品分类</h2>
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
      <div class="sort">
        <div class="all-sort-list2" @click="toSearch">
          <div class="item" v-for="c1 in getCotagroy" :key="c1.categoryId">
            <h3>
              <!-- <a href="javascript:" @click="$router.push({name:'search',query:{categoryName:c1.categoryName,category2Id:c1.categoryId}})">{{c1.categoryName}}</a> -->

              <a
                href="javascript:"
                :data-categoryName="c1.categoryName"
                :data-category1Id="c1.categoryId"
                >{{ c1.categoryName }}</a
              >
              <!-- <router-link :to="`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`">{{c1.categoryName}}</router-link> -->
            </h3>
            <div
              class="item-list clearfix"
              v-for="c2 in c1.categoryChild"
              :key="c2.categoryId"
            >
              <div class="subitem">
                <dl class="fore">
                  <dt>
                    <!-- <a href="javascript:" @click="$router.push({name:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}})">{{c2.categoryName}}</a> -->
                    <a
                      href="javascript:"
                      :data-categoryName="c2.categoryName"
                      :data-category2Id="c2.categoryId"
                      >{{ c2.categoryName }}</a
                    >
                    <!-- <router-link :to="`/search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`">{{c2.categoryName}}</router-link> -->
                  </dt>
                  <dd>
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <!-- <a href="javascript:" @click="$router.push({name:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}})">{{c3.categoryName}}</a> -->
                      <a
                        href="javascript:"
                        :data-categoryName="c3.categoryName"
                        :data-category3Id="c3.categoryId"
                        >{{ c3.categoryName }}</a
                      >
                      <!-- <router-link :to="`/search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`">{{c3.categoryName}}</router-link> -->
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {judgeSearch} from '@/utile/catagroyToSearch'
export default {
  name: "TypeNav",
  methods: {
    //创建一个用于判断跳转路径的工具函数
    toSearch(event) {
      //  当遇到大量的绑定事件但是是同一个点击效果时,这时我们要考虑到交给共同的父元素委托,但是还要考虑到是点击的哪个按钮,
      //  想要获取单一的值我们就要给每个标签都加上自定义属性,这样就可以相对减少损耗
      //  为什么需要判断A不可靠,为什么不可靠?为什么判定标签属性:单纯判定a标签有可能不是我们想要的对象,
      // 每次点击都会在自定义对象中存储着唯一点击的这个对象,我们判断这个对象存在就可以跳转
      const {dataset} = event.target;
      // 该函数接收三个参数,this.要跳转的路由名,自定义标签名
      judgeSearch(this,"search",dataset);
      // console.dir(target.dataset);
      // if(target.tagName.toUpperCase() === 'A'){
      //    this.$router.push({name:'search',query:{categoryName:categoryname,category1Id:category1id}})
      // }
      // if(target.tagName.toUpperCase() === 'A'){
      //    this.$router.push({name:'search',query:{categoryName:categoryname,category2Id:category2id}})
      // }
      // if(target.tagName.toUpperCase() === 'A'){
      //    this.$router.push({name:'search',query:{categoryName:categoryname,category3Id:category3id}})
      // }
    },
  },
  computed: {
    getCotagroy() {
      return this.$store.state.home.CategoryList;
    },
  },
};
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

          &:hover {
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
