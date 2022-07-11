<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{item.name}}</dt>
      <dd>

        <template v-for="goods in item.values" >

          <img :key="goods.picture"  @click="clickSpecs(goods)" v-if="goods.picture" :src="goods.picture" :title="goods.name" :class="{selected:show===goods.name}" >
          <span :key="goods.name" :class="{selected:showS===goods.desc}" @click="clickSpecs1(goods)" v-else>{{goods.name}}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>

export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({ specs: [], skus: [] })
    }

  },
  data () {
    return {
      spliter: '★',
      pathMap: {},
      show: '',
      showS: ''
    }
  },
  methods: {
    clickSpecs (goods) {
      // 1. 选中与取消选中逻辑
      // if (goods.selected) {
      //   goods.selected = false
      // } else {
      //   item.values.forEach(bv => { bv.selected = false })
      //   goods.selected = true
      // }
      if (this.show === goods.name) {
        this.show = ''
      } else {
        this.show = goods.name
      }
    },
    clickSpecs1 (goods) {
      // 1. 选中与取消选中逻辑
      // if (goods.selected) {
      //   goods.selected = false
      // } else {
      //   item.values.forEach(bv => { bv.selected = false })
      //   goods.selected = true
      // }
      if (this.showS === goods.desc) {
        this.showS = ''
      } else {
        this.showS = goods.desc
      }
    }
  }

}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 10px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
line-height: 40px;
        > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }

    }
  }
}
</style>
