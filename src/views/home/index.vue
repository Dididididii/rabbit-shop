<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <homeCategoryVue />
        <!-- 轮播图 -->
        <homeBannerVue />
      </div>
    </div>
    <!-- 新鲜好物 -->
    <homeNewVue />
  </div>
</template>

<script>
import homeCategoryVue from './components/home-category.vue'
import homeBannerVue from './components/home-banner.vue'
import homeNewVue from './components/home-new.vue'
export default {
  name: 'xtx-home-papg',
  components: {
    homeCategoryVue,
    homeBannerVue,
    homeNewVue
  }
}
</script>

<style lang="less">
.xtx-carousel {
  .carousel-btn.prev {
    left: 270px !important;
  }
   .carousel-indicator {
    padding-left: 250px !important;
  }
}
</style>
