<template>
  <div class="spec-preview">
    <img :src="imgShow.imgUrl" />
    <div class="event" ref="wapper" @mousemove="move"></div>
    <div class="big" >
      <img :src="imgShow.imgUrl" ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  mounted() {
    this.$bus.$on("changeIndex", this.changeIndex);
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index;
    },
    // 设计放大镜效果
    move(event) {
      // 获取鼠标居中位置
      let mouseX = event.offsetX;
      let mouseY = event.offsetY;
      const { mask ,bigImg} = this.$refs;
      let maskX = mouseX - mask.offsetWidth / 2;
      let maskY = mouseY - mask.offsetHeight / 2;
      // 在距离真正赋值给元素之前判断
      if(maskX < 0){
        maskX = 0
      }else if(maskX > mask.offsetWidth){
            maskX = mask.offsetWidth
      }
      if(maskY < 0){
        maskY = 0
      }else if(maskY > mask.offsetHeight){
            maskY = mask.offsetHeight
      }
      mask.style.left = maskX + "px";
      mask.style.top = maskY + "px";
      // 大图相反效果
      bigImg.style.left = -2*maskX + 'px'
      bigImg.style.top = -2*maskY + 'px'
    },
  },
  computed: {
    // 解决初始时候读取undefined报错的问题,a.b.c计算一下属性就可以解决
    imgShow() {
      return this.skuImageList[this.currentIndex] || {};
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>