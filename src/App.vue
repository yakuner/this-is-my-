<template>
  <div>
    <Header/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {reqCotagroyList} from '@/api'
export default {
  name: '',
  components:{
    Header,
    Footer
  },
   mounted(){
    // 页面渲染完毕出发action
    this.$store.dispatch('getCategoryList') 
  }
}
</script>

<style lang="less" scoped>

</style>
