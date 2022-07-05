import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import '@/assets/styles/common.less'
Vue.config.productionTip = false
document.title = '小兔鲜商城'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
