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
        <div class="all-sort-list2" @click.prevent="toSearch">
           <div class="item" v-for="c1 in CategoryList" :key="c1.categoryId">
            <h3>
                  <a href="javascript:" :data-category1Id=c1.categoryId :data-categoryName=c1.categoryName >{{c1.categoryName}}</a>
              <!-- <a href="javascript:" :data-categoryId=c1.categoryId :data-categoryName=c1.categoryName @click="$router.push({name:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}})">{{c1.categoryName}}</a> -->
              <!-- <router-link :to="`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`">{{c1.categoryName}}</router-link> -->
            </h3>
            <div class="item-list clearfix" v-for="c2 in c1 .categoryChild" :key="c2.categoryId">
              <div class="subitem">      
              <dl class="fore" >
                  <dt>
                    <a href="javascript:" :data-category2Id=c2.categoryId :data-categoryName=c2.categoryName>{{c2.categoryName}}</a>
                     <!-- <router-link :to="`/search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`">{{c2.categoryName}}</router-link> -->
                     <!-- <a href="javascript:" :data-categoryId=c1.categoryId :data-categoryName=c1.categoryName @click="$router.push({name:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}})">{{c2.categoryName}}</a> -->
                  </dt>
                  <dd>
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <a href="javascript:" :data-category3Id=c3.categoryId :data-categoryName=c3.categoryName>{{c3.categoryName}}</a>
                       <!-- <router-link :to="`/search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`">{{c3.categoryName}}</router-link> -->
                       <!-- <a href="javascript:" :data-categoryId=c1.categoryId :data-categoryName=c1.categoryName @click="$router.push({name:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}})">{{c3.categoryName}}</a> -->
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
export default {
  name: "TypeNav",
  computed:{
    CategoryList(){
      return this.$store.state.home.CategoryList
    }
  },
  methods:{
    toSearch(event){
        // 为什么使用数据代理而不直接用声明式导航,编程式导航
        // 首先使用声明式导航跳转会加载卡顿,一下生成大量的路由link,浏览器加载资源缓慢
        // 编程式导航会生成上百个绑定也是不好,为什么要用代理,因为绑定的回调的功能都是一样的,我们想通过一个绑定就可以代替子元素的绑定,
            // 但是没办法找到是点击了哪个标签,所以我们给每个a标签都加上自定义标签属性 data-xxx=??  
        const {target} = event
        const {categoryname,category1id,category2id,category3id} = target.dataset
        if(category1id){
            this.$router.push({name:'search',query:{categoryName:categoryname,category1Id:category1id}}).catch( ()=>{})
        }
        if(category2id){
            this.$router.push({name:'search',query:{categoryName:categoryname,category2Id:category2id}}).catch( ()=>{})
        }
        if(category3id){
            this.$router.push({name:'search',query:{categoryName:categoryname,category3Id:category3id}}).catch( ()=>{})
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    }
  }
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
