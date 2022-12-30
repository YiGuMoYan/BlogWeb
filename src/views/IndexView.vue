<template>
  <div class="main">
    <div v-for="(markdown, index) in markdownList" :key="markdown.id" class="card">
      <content-card-component :type="isMutuality ? index % 2 : 0" :markdown="markdown"/>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="paginationChange"
      :page-count="totalNum"
      class="pagination">
    </el-pagination>
  </div>
</template>

<script>
import ContentCardComponent from '@/components/content/ContentCardComponent.vue'
import eventMessage from '@/EventMessage'

export default {
  name: 'ContentMainComponent',
  components: { ContentCardComponent },
  props: {
    // 当前页面要展示的 markdown
    markdownList: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  created () {
    this.setWindowWidth()
    // 接收 总页面数量变化 的信号
    eventMessage.$on('changeTotalNum', (val) => {
      this.totalNum = val
    })
  },
  data () {
    return {
      // 当前屏幕宽度 用于适配设备
      windowWidth: document.documentElement.clientWidth,
      // 是否让图片进行交错排列
      isMutuality: this.windowWidth >= 1000,
      // 总页面数量
      totalNum: 1,
      // 当前页面
      currentPage: 1
    }
  },
  methods: {
    // 监听页面宽度
    setWindowWidth () {
      const that = this
      this.isMutuality = this.windowWidth >= 1000
      window.onresize = () => {
        return (() => {
          that.windowWidth = document.documentElement.clientWidth
        })()
      }
    },
    // 当前页面改变
    paginationChange (val) {
      eventMessage.$emit('currentPageChange', val)
    }
  },
  watch: {
    windowWidth (val) {
      this.isMutuality = val >= 1000
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  text-align: center;

  .card {
    margin-top: 50px;
  }

  .pagination {
    margin-top: 50px;
  }
}
</style>
