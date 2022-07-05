<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <homeCategoryVue />
      </div>
    </div>
  </div>
</template>

<script>
import homeCategoryVue from './components/home-category.vue'
export default {
  name: 'xtx-home-papg',
  components: {
    homeCategoryVue
  }
}
</script>

<style lang="less">

</style>
