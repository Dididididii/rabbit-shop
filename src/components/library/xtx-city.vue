<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggleDialog" :class="{active}">
      <span class="placeholder" v-if="!fullLocations">请选择配送地址</span>
      <span class="placeholder" v-else>{{fullLocations}}</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span @click="changeItem(item)" class="ellipsis" v-for="item in currList" :key="item.code">{{item.name}}</span>
      </template>
    </div>
  </div>
</template>

<script>
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
import { reactive } from 'vue'
export default {
  name: 'XtxCity',
  props: {
    fullLocations: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      active: false,
      loading: false,
      cityData: [],
      changeResult: reactive({
        provinceCode: '',
        provinceName: '',
        cityCode: '',
        cityName: '',
        countyCode: '',
        countyName: '',
        fullLocation: ''
      })
    }
  },
  methods: {
    openDialog () {
      this.open()
      this.active = true
    },
    closeDialog () {
      this.active = false
    },
    toggleDialog () {
      if (this.active) this.closeDialog()
      else this.openDialog()
    },
    // 获取城市数据
    // 1. 数据在哪里？https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
    // 2. 何时获取？打开城市列表的时候，做个内存中缓存
    // 3. 怎么使用数据？定义计算属性，根据点击的省份城市展示
    getCityData () {
      return new Promise((resolve, reject) => {
        if (window.cityData) {
          // 有缓存
          resolve(window.cityData)
        } else {
          // 无缓冲
          const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
          axios.get(url).then(res => {
            window.cityData = res.data
            resolve(window.cityData)
          })
        }
      })
    },
    open () {
      this.loading = true
      // 获取数据
      this.getCityData().then(data => {
        this.cityData = data
        this.loading = false
      })
      // 清空选择结果
      for (const key in this.changeResult) {
        this.changeResult[key] = ''
      }
      onClickOutside(this.$refs.target, () => {
        this.closeDialog()
      })
    },
    changeItem (item) {
      // 省份
      if (item.level === 0) {
        this.changeResult.provinceCode = item.code
        this.changeResult.provinceName = item.name
      }
      // 市
      if (item.level === 1) {
        this.changeResult.cityCode = item.code
        this.changeResult.cityName = item.name
      }
      // 地区
      if (item.level === 2) {
        this.changeResult.countyCode = item.code
        this.changeResult.countyName = item.name
        this.changeResult.fullLocation = `${this.changeResult.provinceName} ${this.changeResult.cityName} ${this.changeResult.countyName}`
        this.closeDialog()
        // console.log(this.changeResult)
        this.$emit('change', this.changeResult)
      }
    }

  },
  created () {

  },
  computed: {
    currList () {
      let currList = this.cityData
      // 城市
      if (this.changeResult.provinceCode) {
        currList = currList.find(p => p.code === this.changeResult.provinceCode).areaList
      }
      // 地区
      if (this.changeResult.cityCode) {
        currList = currList.find(c => c.code === this.changeResult.cityCode).areaList
      }
      // TODO 根据点击的省份城市获取对应的列表
      return currList
    }

  }
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
