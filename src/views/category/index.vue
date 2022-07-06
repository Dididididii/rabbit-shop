<template>
  <div class="top-category">
    <div class="container">

      <!-- 轮播图 -->
      <xtxCarouselVue :sliders="sliders" style="height:500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" >
              <p>{{item.name}}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <!-- 分类关联商品 -->
      <div class="ref-goods"  v-for="item in subList" :key="item.id">
        <div class="head">
          <h3>- {{item.name}} -</h3>
          <p class="tag">{{item.desc}}</p>
          <xtxMoreVue />
        </div>
        <div class="body">
          <goodItemVue v-for="g in item.goods" :key="g.id" :goods="g" />
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import xtxMoreVue from '@/components/library/xtx-more.vue'
import goodItemVue from './components/goods-item.vue'
import xtxCarouselVue from '@/components/library/xtx-carousel.vue'
import { findBanner } from '@/api/home'
import { computed, watch } from 'vue'
import { findTopCategory } from '@/api/category'
export default {
  name: 'TopCategory',
  components: { xtxCarouselVue, goodItemVue, xtxMoreVue },
  data () {
    return {
      // 轮播图
      sliders: [],
      topCategory: computed(() => {
        let cate = {}
        const item = this.$store.state.category.list.find(item => {
          return item.id === this.$route.params.id
        })
        if (item) {
          cate = item
        }
        return cate
      }),
      subList: []
    }
  },
  created () {
    findBanner().then(data => {
      this.sliders = data.result
    })
    findTopCategory(this.$route.params.id).then(data => {
      this.subList = data.result.children
    })
    watch(() => this.$route.params.id, (newV) => {
      newV && findTopCategory(this.$route.params.id).then(data => {
        this.subList = data.result.children
      })
    }, { immediate: true })
  }

}
</script>
<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
