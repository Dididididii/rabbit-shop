<template>
  <div class="goods-image">
        <div class="large" v-show="show" :style="[{backgroundImage:`url(${images[currIndex]})`},bgPosition]"></div>
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="">
      <div class="layer" v-show="show" :style="position"></div>
    </div>
    <ul class="small">
      <li v-for="(img,i) in images" :key="img" :class="{active:i===currIndex}">
        <img @mouseenter="currIndex=i" :src="img" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: [Array, Object],
      default: () => []
    }
  },
  data () {
    return {
      currIndex: 0,
      position: reactive({ left: 0, top: 0 }),
      bgPosition: reactive({ backgroundPositionX: 0, backgroundPositionY: 0 }),
      show: false
    }
  },
  methods: {
    usePreviewImg () {
      // elementX 鼠标基于容器左上角X轴偏移
      // elementY 鼠标基于容器左上角Y轴偏移
      // isOutside 鼠标是否在模板容器外
      const { elementX, elementY, isOutside } = useMouseInElement(this.$refs.target)

      watch([elementX, elementY, isOutside], () => {
        // 控制X轴方向的定位 0-200 之间
        if (elementX.value < 100) this.position.left = 0
        else if (elementX.value > 300) this.position.left = 200
        else this.position.left = elementX.value - 100
        // 控制Y轴方向的定位 0-200 之间
        if (elementY.value < 100) this.position.top = 0
        else if (elementY.value > 300) this.position.top = 200
        else this.position.top = elementY.value - 100
        // 设置大背景的定位
        this.bgPosition.backgroundPositionX = -this.position.left * 2 + 'px'
        this.bgPosition.backgroundPositionY = -this.position.top * 2 + 'px'
        // 设置遮罩容器的定位
        this.position.left = this.position.left + 'px'
        this.position.top = this.position.top + 'px'
        // 设置是否显示预览大图
        this.show = !isOutside.value
      })
    }
  },
  mounted () {
    this.usePreviewImg()
  }

}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0,0,0,.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,&.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
