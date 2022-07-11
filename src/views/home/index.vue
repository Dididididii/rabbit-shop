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
    <!-- 人气推荐 -->
    <homeHotVue />
    <!-- 热门品牌 -->
    <homeBrandVue />
    <!-- 商品区域 -->
    <homeProductVue />
     <!-- 最新专题 -->
    <homeSpecialVue />
  </div>
</template>

<script>
import homeSpecialVue from './components/home-special.vue'
import homeCategoryVue from './components/home-category.vue'
import homeBannerVue from './components/home-banner.vue'
import homeNewVue from './components/home-new.vue'
import homeHotVue from './components/home-hot.vue'
import homeBrandVue from './components/home-brand.vue'
import homeProductVue from './components/home-product.vue'
export default {
  name: 'xtx-home-papg',
  components: {
    homeCategoryVue,
    homeBannerVue,
    homeNewVue,
    homeHotVue,
    homeBrandVue,
    homeProductVue,
    homeSpecialVue
  }
}
</script>

<style scoped lang="less">
.xtx-carousel {
  .carousel-btn.prev {
    left: 270px !important;
  }
   .carousel-indicator {
    padding-left: 250px !important;
  }
}
</style>
