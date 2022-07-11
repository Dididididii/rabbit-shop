<template>
  <div class="goods-hot">
    <h3>{{title}}</h3>
    <div v-if="goodsList">
      <goodsItemVue v-for="item in goodsList" :key="item.id" :goods="item"/>
    </div>
  </div>
</template>
<script>
import goodsItemVue from '@/views/category/components/goods-item.vue'
import { findHotGoods } from '@/api/product'
export default {
  name: 'GoodsHot',
  props: {
    type: {
      type: Number,
      default: 1
    },
    goodsId: {
      type: String
    }
  },
  components: { goodsItemVue },
  data () {
    return {
      titleObj: { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' },
      goodsList: []
    }
  },
  methods: {
    useHotGoods () {
      findHotGoods({ id: this.goodsId, type: this.type }).then(data => {
        this.goodsList = data.result.map(item => {
          item.tag = item.desc
          return item
        })
      })
    }
  },
  computed: {
    title () {
      return this.titleObj[this.type]
    }
  },
  created () {
    this.useHotGoods()
  }

}
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  ::v-deep .goods-item {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
