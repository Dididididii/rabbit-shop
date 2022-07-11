<template>
<!-- 筛选区 -->
     <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a @click="changeBrand(brand.id)" :class="{active:filterData.selectedBrand===brand.id}" href="#" v-for="brand in filterData.brands" :key="brand.id" >{{brand.name}}</a>
      </div>
    </div>
    <div class="item" v-for="p in filterData.saleProperties" :key="p.id">
      <div class="head">{{p.name}}：</div>
      <div class="body">
        <a :class="{active:p.selectedProp===attr.id}" href="#" v-for="attr in p.properties" :key="attr.id" @click="changeAttr(p,attr.id)">{{attr.name}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { watch } from 'vue'
import { findSubCategoryFilter } from '@/api/category'
export default {
  name: 'SubFilter',
  // 1. 获取数据
  // 2. 数据中需要全部选中，需要预览将来点击激活功能。默认选中全部
  // 3. 完成渲染
  data () {
    return {
      filterData: null,
      filterLoading: false
    }
  },
  created () {
    // 4. 分类发生变化的时候需要重新获取筛选数据，需要使用侦听器
    watch(() => this.$route.params.id, (newVal, oldVal) => {
      // 当你从二级分类去顶级分类也会拿到ID，不能去加载数据因为它不是二级分类的ID
      if (newVal && this.$route.path === ('/category/sub/' + newVal)) {
        this.filterLoading = true
        newVal && findSubCategoryFilter(this.$route.params.id).then(({ result }) => {
        // 品牌全部
          result.selectedBrand = null
          result.brands.unshift({ id: null, name: '全部' })
          // 销售属性全部
          result.saleProperties.forEach(p => {
            p.selectedProp = undefined
            p.properties.unshift({ id: null, name: '全部' })
          })
          this.filterData = result
          this.filterLoading = false
          // console.log()
        })
      }
    }, { immediate: true })
  },
  methods: {
    getFilterParams () {
      const filterParams = {}
      const attrs = []
      filterParams.brandId = this.filterData.selectedBrand
      this.filterData.saleProperties.forEach(p => {
        const attr = p.properties.find(attr => attr.id === p.selectedProp)
        if (attr && attr.id !== undefined) {
          attrs.push({ groupName: p.name, propertyName: attr.name })
        }
      })
      if (attrs.length) filterParams.attrs = attrs
      // console.log(filterParams)
      return filterParams
    },
    // 选择品牌
    changeBrand (brandId) {
      if (this.filterData.selectedBrand === brandId) return
      this.filterData.selectedBrand = brandId

      this.$emit('filter-change', this.getFilterParams())
      return false
    },
    // 选中属性
    changeAttr (p, attrId) {
      if (p.selectedProp === attrId) return
      p.selectedProp = attrId
      this.$emit('filter-change', this.getFilterParams())
    }
  }
}
</script>
<style scoped lang='less'>
  // 筛选区
  .sub-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      line-height: 40px;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          transition: all .3s;
          display: inline-block;
          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
</style>
