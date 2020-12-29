<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="options.keyword">{{options.keyword}}<i @click="removeParamsP">×</i></li>
            <li class="with-x" v-show="options.categoryName">{{options.categoryName}}<i @click="removeParamsQ">×</i></li>
            <li class="with-x" v-show="options.trademark">{{options.trademark}}<i @click="removeTM">×</i></li>
            <li class="with-x" v-for="(prop,index) in options.props" :key="prop" v-show="options.props">{{prop}}<i @click="removeProp(index)">×</i></li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector :setTdMk="setTdMk" @setProps="setProps"/>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:orderArr[0] === '1'}">
                  <a  @click="priceSort('1')">综合<i v-show="orderArr[0] === '1'">{{orderArr[1] !== 'desc' ? '↑':'↓'}}</i></a>
                </li>
                <li :class="{active:orderArr[0] === '5'}">
                  <a  @click="priceSort('5')">销量<i v-show="orderArr[0] === '5'">{{orderArr[1] !== 'desc' ? '↑':'↓'}}</i></a>
                </li>
                <li :class="{active:orderArr[0] === '3'}">
                  <a  @click="priceSort('3')">新品<i v-show="orderArr[0] === '3'">{{orderArr[1] !== 'desc' ? '↑':'↓'}}</i></a>
                </li>
                <li :class="{active:orderArr[0] === '4'}">
                  <a  @click="priceSort('4')">评价<i v-show="orderArr[0] === '4'">{{orderArr[1] !== 'desc' ? '↑':'↓'}}</i></a>
                </li>
                <li :class="{active:orderArr[0] === '2'}">
                  <a  @click="priceSort('2')">价格<i v-show="orderArr[0] === '2'">{{orderArr[1] !== 'desc' ? '↑':'↓'}}</i></a>
                </li>
               
               
              </ul>
            </div>
          </div>
          <div class="goods-list">
           <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="javascript:"><img :src="item.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{item.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a href="javascript:">{{item.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>{{item.hotScore}}</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
                </ul>
          </div>
          <!-- 需要接受三个值一个修改的方法 -->
           <!-- 传入的每页的尺寸,以及总的数据,然后传入的单页码,显示的间隔,回调函数 -->
          <Pagination 
              :currentP = "options.pageNo"
              :pageSize= "options.pageSize"
              :allReq = 'total'
              :showPage="5"
              @getNewPage = "getNewPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import {mapGetters} from 'vuex'
  export default {
    name: 'Search',
    data(){
      return{
        options:{
          props:[],	// Array	N	商品属性的数组: ["属性ID:属性值:属性名"]示例: ["2:6.0～6.24英寸:屏幕尺寸"]
          category1Id:'',	// string	N	一级分类ID
          category2Id:'',	// string	N	二级分类ID
          category3Id:'',	// string	N	三级分类ID
          categoryName:'',	// string	N	分类名称
          keyword:'',	// string	N	搜索关键字
          trademark:'',	// string	N	品牌: "ID:品牌名称"示例: "1:苹果"
          order:'1:desc',	// string	N	排序方式 1: 综合,2: 价格 asc: 升序,desc: 降序 示例: "1:desc"
          pageNo:1,	// number	N	页码
          pageSize:3	// number	N	每页数量
        },
        // 总体相关
        // isPrice:false,
        // // 综合相关
        // isComposite:true
      }
    },
    components: {
      SearchSelector
    },
    // 初始化读取路由参数中的数据用于进行搜索,但是当在搜索页跳转搜索页的时候页面并不会刷新,
    //因为同一个路由组件重复并不会销毁组件,
    // 解决?
    // 监视当前路由对象,
    // 一旦有变化就重新调用
    created(){
      this.getCurrentParams()
      this.ageinSendReq()
      // 重新跳转路径
      //this.$router.push({name:'search',query:this.$route.query,params:this.$route.params})
    },
    methods:{
      // 设计三个数值,刚开始为-2, 向下为-1 ,向上1
      // 价格排序
     priceSort(type1){
      //  判断传入的值,如果是数字是综合排序,不是则是价格
       let [flag,type] = this.orderArr
       flag = type1
       this.options.order = flag + ':' + (type === 'desc' ? 'arc' : 'desc' )
       this.ageinSendReq()
     },
      // 获取Params参数
      getCurrentParams(){
        const { category1Id,category2Id,category3Id,categoryName} = this.$route.query
        const {keyword} = this.$route.params
        this.options = {
          ...this.options,
          category1Id,
          category2Id,
          category3Id,
          categoryName,
          keyword
      }
      },
      // 发送请求
      ageinSendReq(){
         this.$store.dispatch('getList',this.options)
      },
      // 即使清除了options中的值,路径也不会重新刷新,因为只有重新请求路径才会刷新地址栏信息
      removeParamsQ(){
        this.options.categoryName = ''
        this.$router.push({name:'search',params:this.$route.params})
      },
      removeParamsP(){
        this.options.keyword = ''
        this.$router.push({name:'search',query:this.$route.query})
      },
       // 修改品牌信息
      setTdMk(trademark){
          this.options.trademark = trademark
          this.ageinSendReq()
      },
      // 移除商品信息
      removeTM(){
         this.options.trademark = ''
         this.ageinSendReq()
      },
      // 设置数组的添加
      setProps(prop){
        this.options.props.push(prop)
        this.ageinSendReq()
      },
      removeProp(index){
        this.options.props.splice(index,1)
        this.ageinSendReq()
      },
      // 更新页面
       getProductList (page=1) {
        // 更新pageNo
        this.options.pageNo = page
        // 请求获取数据
        this.ageinSendReq()
      },  
      // 接受一个默认值,如果没有写,用默认值代替
      getNewPage(page=1){
          if(this.options.pageNo === page) return 
          this.options.pageNo = page
          this.ageinSendReq()
      }
    },
    computed:{
      ...mapGetters(['goodsList','total']),
      orderArr(){
        return this.options.order.split(':')
      }
    },
    watch:{
      // 监视当前路由对象,只要路径发生变化 那么就重新调用
      $route(){
        this.getCurrentParams()
        this.ageinSendReq()
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>