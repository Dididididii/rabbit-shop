<template>
  <div class='xtx-goods-page' v-if="goods">
    <div class="container">
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
            <goodsImageVue :images="goods.mainPictures"/>
            <goodsSalesVue />
        </div>
        <div class="spec">
          <!-- 名字区组件 -->
          <goodsNameVue :goods="goods" />
          <!-- 规格组件 -->
          <goodsSkuVue :goods="goods" />
          <xtxNumboxVue label="数量" :num="num" :max="goods.inventory" @changeNum="changeNum"/>
          <xtxButtonVue type="primary" style="margin-top:20px;">加入购物车</xtxButtonVue>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id"/>
      <!-- 商品详情 -->
      <div class="goods-footer" ref="target">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <goodsTabsVue :goods="goods" />
          <!-- 注意事项 -->
          <goodsWarnVue />
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <goodsHotVue :goodsId="goods.id" :type="1" />
          <goodsHotVue :goodsId="goods.id" :type="2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import goodsWarnVue from './components/goods-warn.vue'
import goodsTabsVue from './components/goods-tabs.vue'
import GoodsRelevant from './components/goods-relevant'
import xtxButtonVue from '@/components/library/xtx-button.vue'
import xtxNumboxVue from '@/components/library/xtx-numbox.vue'
import goodsImageVue from './components/goods-image.vue'
import goodsSalesVue from './components/goods-sales.vue'
import goodsNameVue from './components/goods-name.vue'
import goodsSkuVue from './components/goods-sku.vue'
import goodsHotVue from './components/goods-hot.vue'
import { findGoods } from '@/api/product'
import { watch, nextTick } from 'vue'
export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant, goodsImageVue, goodsSalesVue, goodsNameVue, goodsSkuVue, xtxNumboxVue, xtxButtonVue, goodsTabsVue, goodsHotVue, goodsWarnVue },
  data () {
    return {
      goods: {},
      num: 1

    }
  },
  methods: {
    useGoods () {
      findGoods(this.$route.params.id).then(res => {
        // this.goods = res.result

        res.result.skus.forEach(sku => {
          const sortSpecs = []
          res.result.specs.forEach(spec => {
            sortSpecs.push(sku.specs.find(item => item.name === spec.name))
          })
          sku.specs = sortSpecs
        })
        // this.goods = res.result
        // 让商品数据为null让后使用v - if的组件可以重新销毁和创建
        this.goods = null
        nextTick(() => {
          this.goods = res.result
        })
      })
    },
    changeNum (newValue) {
      this.num = newValue
    }
  },
  async created () {
    await watch(() => this.$route.params.id, newV => {
      if (newV && `/product/${newV}` === this.$route.path) {
        this.useGoods()
      }
    }, { immediate: true })
  }
}
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}

.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
