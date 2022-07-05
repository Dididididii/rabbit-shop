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
 <footer>底部</footer>
 </div>
</template>

<script>
import appTopnavVue from '@/components/app-topnav.vue'
import appHeaderVue from '@/components/app-header.vue'
export default {
  name: 'xtx-layout',
  components: {
    appTopnavVue,
    appHeaderVue
  }
}
</script>

<style lang="less">

</style>
