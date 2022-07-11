<template>
  <div class='sub-category'>
    <div class="container">

      <!-- 筛选区 -->
      <SubFilter @filter-change="changeFilter"  />
      <!-- 结果区域 -->
      <div class="goods-list">
        <!-- 排序 -->
        <subSortVue @sort-change="changeSort" />
        <!-- 列表 -->
        <ul>
          <li v-for="item in goodsList" :key="item.id" >
            <goodsItemVue :goods="item" />
          </li>
        </ul>
        <!-- 加载 -->
        <xtxInfiniteLoadingVue :loading="loading" :finished="finished" @infinite="getData" />
      </div>
    </div>
  </div>
</template>

<script>
import goodsItemVue from './components/goods-item.vue'
import xtxInfiniteLoadingVue from '@/components/library/xtx-infinite-loading.vue'
import subSortVue from './components/sub-sort.vue'
import SubFilter from './components/sub-filter'
import { findSubCategoryGoods } from '@/api/category'
import { watch } from 'vue'
export default {
  name: 'SubCategory',
  components: { SubFilter, subSortVue, xtxInfiniteLoadingVue, goodsItemVue },
  // 1. 基础布局
  // 2. 无限加载组件
  // 3. 动态加载数据且渲染
  // 4. 任何筛选条件变化需要更新列表
  data () {
    return {
      loading: false,
      finished: false,
      goodsList: [],
      timer: null,
      reqParams: {
        page: 1,
        pageSize: 20
      },
      id: this.$route.params.id
    }
  },
  methods: {
    getData () {
      this.loading = true
      this.reqParams.categoryId = this.$route.params.id
      findSubCategoryGoods(this.reqParams).then(({ result }) => {
        if (result.items.length) {
          this.goodsList.push(...result.items)
          this.reqParams.page++
          console.log(this.goodsList)
        } else {
          // 加载完毕
          this.finished = true
        }
        // 请求结束

        this.loading = false
      })
    },
    // 监听筛选区改变
    changeFilter (filterParams) {
      this.reqParams = { ...this.reqParams, ...filterParams }
      this.reqParams.page = 1
      this.goodsList = []
      this.finished = false
      this.getData()
    },
    // 监听排序改变
    changeSort (sortParams) {
      this.reqParams = { ...this.reqParams, ...sortParams }
      this.reqParams.page = 1
      this.goodsList = []
      this.finished = false
      this.getData()
    },
    lazyLoading () {
      const scorllTop = document.documentElement.scrollTop || document.body.scrollTop
      const clientHeight = document.documentElement.clientHeight
      const scrollHeight = document.documentElement.scrollHeight - 500
      if (scorllTop + clientHeight >= scrollHeight) {
        if (!this.loading && !this.finished) {
          this.getData()
        }
      }
    }

  },
  created () {
    this.getData()
    window.addEventListener('scroll', this.lazyLoading)

    watch(() => this.$route.params.id, (newVal) => {
      if (newVal && this.$route.path === ('/category/sub/' + newVal)) {
        this.goodsList = []
        // console.log(this.goodsList)
        this.reqParams = {
          page: 1,
          pageSize: 20
        }
        this.getData()

        this.finished = false
      }
    })
  },
  destroyed () {
    window.removeEventListener('scroll', this.lazyLoading)
  }

}
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
