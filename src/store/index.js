import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import cart from "./modules/cart";
import category from "./modules/category";
import createPersistedstate from "vuex-persistedstate";

Vue.use(Vuex);

// 创建vuex仓库并导出
export default new Vuex.Store({
  state: {
    // 数据
  },
  getters: {
    // vuex的计算属性
  },
  mutations: {
    // 改变数据函数
  },
  actions: {
    // 请求数据函数
  },
  modules: {
    // 分模块
    user,
    cart,
    category,
  },
  plugins: [
    createPersistedstate({
      key: "erabbit-client-pc-store",
      paths: ["user", "cart"],
    }),
  ],
});
