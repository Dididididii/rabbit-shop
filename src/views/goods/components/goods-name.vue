<template>
  <div>
    <p class="g-name">{{goods.name}}</p>
  <p class="g-desc">{{goods.desc}}</p>
  <p class="g-price">
    <span>{{goods.price}}</span>
    <span>{{goods.oldPrice}}</span>
  </p>
  <div class="g-service">
    <dl>
      <dt>促销</dt>
      <dd>12月好物放送，App领券购买直降120元</dd>
    </dl>
    <dl>
      <dt>配送</dt>
      <dd>至 <xtxCityVue @change="changeCity" :fullLocations="fullLocation"/></dd>
    </dl>
    <dl>
      <dt>服务</dt>
      <dd>
        <span>无忧退货</span>
        <span>快速退款</span>
        <span>免费包邮</span>
        <a href="javascript:;">了解详情</a>
      </dd>
    </dl>
  </div>
  </div>
</template>

<script>
import xtxCityVue from '@/components/library/xtx-city.vue'
export default {
  name: 'GoodName',
  components: { xtxCityVue },
  props: {
    goods: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      provinceCode: 110000,
      cityCode: 119900,
      countyCode: 110101,
      fullLocation: '' // 北京市 市辖区 东城区
    }
  },
  methods: {
    Initialize () {
      if (this.goods.userAddresses) {
        const defaultAddr = this.goods.userAddresses.find(addr => addr.isDefault === 1)
        if (defaultAddr) {
          this.provinceCode = defaultAddr.provinceCode
          this.cityCode = defaultAddr.cityCode
          this.countyCode = defaultAddr.countyCode
          this.fullLocation = defaultAddr.fullLocation
        }
      }
    },
    changeCity (result) {
      console.log(result)
      this.provinceCode = result.provinceCode
      this.cityCode = result.cityCode
      this.countyCode = result.countyCode
      this.fullLocation = result.fullLocation
    }
  },
  created () {
    this.Initialize()
  }

}
</script>

<style lang="less" scoped>
.g-name {
  font-size: 22px
}
.g-desc {
  color: #999;
  margin-top: 10px;
}
.g-price {
  margin-top: 10px;
  span {
    &::before {
      content: "¥";
      font-size: 14px;
    }
    &:first-child {
      color: @priceColor;
      margin-right: 10px;
      font-size: 22px;
    }
    &:last-child {
      color: #999;
      text-decoration: line-through;
      font-size: 16px;
    }
  }
}
.g-service {
  background: #f5f5f5;
  width: 500px;
  padding: 20px 10px 0 10px;
  margin-top: 10px;
  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      color: #666;
      &:last-child {
        span {
          margin-right: 10px;
          &::before {
            content: "•";
            color: @xtxColor;
            margin-right: 2px;
          }
        }
        a {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
