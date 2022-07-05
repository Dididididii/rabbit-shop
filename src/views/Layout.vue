<template>
 <div>
    <nav>
      <appTopnavVue />
    </nav>
 <header>
   <appHeaderVue />
 </header>
 <main>
    <!-- 二级路由 -->
    <router-view />
 </main>
 <footer>
  <appFooterVue />
 </footer>
 </div>
</template>

<script>
import appTopnavVue from '@/components/app-topnav.vue'
import appHeaderVue from '@/components/app-header.vue'
import appFooterVue from '@/components/app-footer.vue'
export default {
  name: 'xtx-layout',
  components: {
    appTopnavVue,
    appHeaderVue,
    appFooterVue
  }
}
</script>

<style lang="less">

</style>
