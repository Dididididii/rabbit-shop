<template>
 <div>
    <nav><appTopnavVue /></nav>
 <header>头部</header>
 <main>
    <!-- 二级路由 -->
    <router-view />
 </main>
 <footer>底部</footer>
 </div>
</template>

<script>
import appTopnavVue from '@/components/app-topnav.vue'
export default {
  name: 'xtx-layout',
  components: {
    appTopnavVue
  }
}
</script>

<style lang="less">

</style>
