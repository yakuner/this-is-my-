<template>
  <div>
    <Header/>
    <router-view></router-view>
    <Footer v-show="this.$route.meta.isShow"/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: '',
  components:{
    Header,
    Footer
  },
  mounted(){
    this.$store.dispatch('getCotaGroyList')
    this.$store.dispatch('getBannerList')
  }
  // computed:{
  //   isShow(){
  //       const isShow = this.$route.name
  //      return isShow ==='login' || isShow ==='reginter' ? true : false 
  //   }
  // }
}
</script>

<style lang="less" scoped>

</style>
