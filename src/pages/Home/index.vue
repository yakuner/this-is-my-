<template>
  <div>
    <TypeNav/>
    <Container/>
    <TodayRecommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor,index) in floors" :key="index" :floor = "floor"/>
    <Brand/>
    <!-- --------------------------------------- -->
    <!-- <ul>
      <li v-for="item in arr" :key="item" v-if=" item % 2 === 0">{{item}}</li>
    </ul> -->
    <!-- --------------------------------------- -->
  </div>
</template>

<script>
import Container from '@/pages/Home/Container'
import TodayRecommend from '@/pages/Home/TodayRecommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'
// -------------------------------------------------
// let arr = []
// for(let i=0; i<1000;i++){
//   arr.push(i)
// }
// ----------------------------------------------------
export default {
  name: 'Home',
  components:{
    Container,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  data(){
    return{
      // arr,
    }
  },
  mounted(){
    this.$store.dispatch('getFloors')
  },
    computed:{
    ...mapState({
      floors : state => state.home.floors
    })
  }
}
</script>

<style lang="less" scoped>
</style>
