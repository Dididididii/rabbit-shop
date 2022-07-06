<template>
  <div class="home-banner">
    <xtxCarouselVue auto-play :sliders="sliders" />
  </div>
</template>
<script>
import xtxCarouselVue from '@/components/library/xtx-carousel.vue'
import { findBanner } from '@/api/home'
// import { ref } from 'vue'
export default {
  name: 'HomeBanner',
  components: { xtxCarouselVue },
  data () {
    return {
      sliders: []
    }
  },
  async created () {
    const res = await findBanner()
    // console.log(res)
    this.sliders = res.result
    console.log(this.sliders)
  }
}
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98
}
</style>
