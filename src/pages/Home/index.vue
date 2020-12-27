<template>
  <div>
    <TypeNav/>
    <Container/>
    <TodayRecommend/>
    <Rank/>
    <Like/>
    <Floor v-for="floor in floors" :key="floor.id" :floor="floor"/>
    <Brand/>
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
  mounted(){
    this.$store.dispatch('getfloors')
    this.$store.dispatch('getRemmonds')
    this.$store.dispatch('getRank')
    this.$store.dispatch('getLike')
  },
  computed:{
    ...mapState({
      floors: state => state.home.floors
    })
  }
}
</script>

<style lang="less" scoped>

</style>
