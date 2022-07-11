<template>
  <div class="xtx-pagination"  v-if="total>0">
    <a v-if="myCurrentPage<=1" href="javascript:;" class="disabled">上一页</a>
    <a @click="changePage(myCurrentPage-1)" v-else href="javascript:;">上一页</a>
    <span v-if="pager.start>1">...</span>
    <a @click="changePage(i)" href="javascript:;" :class="{active:i===myCurrentPage}" v-for="i in pager.btnArr" :key="i">{{i}}</a>
    <span v-if="pager.end<pager.pageCount">...</span>
    <a v-if="myCurrentPage>=pager.pageCount" href="javascript:;" class="disabled">下一页</a>
    <a @click="changePage(myCurrentPage+1)" v-else href="javascript:;">下一页</a>
  </div>
</template>
<script>

export default {
  name: 'XtxPagination',
  props: {
    total: {
      type: Number,
      default: 100
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    top: {
      type: Number,
      default: 0
    },
    specified: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 总条数
      myTotal: 100,
      // 每页条数
      myPageSize: 10,
      // 当前第几页
      myCurrentPage: 1,
      // 按钮个数
      btnCount: 5
    }
  },
  computed: {
    pager () {
      // 计算总页数
      const pageCount = Math.ceil(this.myTotal / this.myPageSize)
      // 计算起始页码和结束页码
      // 1. 理想情况根据当前页码，和按钮个数可得到
      let start = this.myCurrentPage - Math.floor(this.btnCount / 2)
      let end = start + this.btnCount - 1
      // 2.1 如果起始页码小于1了，需要重新计算
      if (start < 1) {
        start = 1
        end = (start + this.btnCount - 1) > pageCount ? pageCount : (start + this.btnCount - 1)
      }
      // 2.2 如果结束页码大于总页数，需要重新计算
      if (end > pageCount) {
        end = pageCount
        start = (end - this.btnCount + 1) < 1 ? 1 : (end - this.btnCount + 1)
      }
      // 处理完毕start和end得到按钮数组
      const btnArr = []
      for (let i = start; i <= end; i++) {
        btnArr.push(i)
      }
      return { pageCount, start, end, btnArr }
    }

  },
  methods: {
    changePage (newPage) {
      if (this.myCurrentPage !== newPage) {
        this.myCurrentPage = newPage
        if (this.specified) {
          window.scrollTo({ top: this.top, left: 0 })
        }
        // 通知父组件最新页码
        this.$emit('current-change', newPage)
      }
    }
  },
  watch: {
    currentPage (newV) {
      this.myCurrentPage = newV
    },
    total (newV) {
      this.myTotal = newV
    },
    pageSize (newV) {
      this.myPageSize = newV
    }
  }

}
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
