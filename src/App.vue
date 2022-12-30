<template>
  <div class="index">
    <!-- 边框栏 -->
    <div class="column aside">
      <head-components :markdownListNum="markdownListNum" :tagListNum="tagListNum"/>
    </div>
    <!-- 主内容 -->
    <div class="column content">
      <!-- 主内容的标题 -->
      <content-head-component :title="title"/>
      <!-- 主内容的内容 -->
      <div class="main"><router-view :markdown-list="currentMarkdownList"/></div>
    </div>
  </div>
</template>

<script>
import HeadComponents from '@/components/aside/head/HeadComponents.vue'
import ContentHeadComponent from '@/components/content/ContentHeadComponent.vue'
import axios from 'axios'
import eventMessage from '@/EventMessage'

export default {
  name: 'IndexView',
  components: { ContentHeadComponent, HeadComponents },
  created () {
    this.getMarkdownList()
    eventMessage.$on('currentPageChange', (val) => {
      this.currentPage = val
    })
  },
  data () {
    return {
      // 主内容标题
      title: '满怀期待，重新出发！',
      // 所有 markdown 信息
      markdownList: [],
      // 所有 markdown 数量
      markdownListNum: 0,
      // 所有 tag
      tagList: [],
      // 所有 tag 数量
      tagListNum: 0,
      // 当前页面所显示的 markdown
      currentMarkdownList: [],
      // 当前页面编号
      currentPage: 1,
      // 一共有多少个页面
      totalNum: 0
    }
  },
  methods: {
    // 获取所有 markdown
    getMarkdownList () {
      const that = this
      axios({
        url: 'http://127.0.0.1:8080/markdown/selectAllMarkdownMessage',
        method: 'get'
      }).then(function (res) {
        that.markdownList = res.data.data
        // 给 markdownList 逆序
        // 使最新的 markdown 显示在最前
        that.markdownList = that.markdownList.reverse()
        that.markdownListNum = that.markdownList.length
        // 获取第一页 markdown 内容
        that.currentMarkdownList = that.markdownList.slice((that.currentPage - 1) * 5, that.currentPage * 5)
        that.setTags()
        that.setTotalNum()
      })
    },
    // 解析所有 tag
    setTags () {
      for (const markdown of this.markdownList) {
        this.getTagList(markdown.classification)
      }
      this.tagListNum = this.tagList.length
    },
    // 从 tag 字符串中解析出 tag
    getTagList (tagStr) {
      const tags = tagStr.split('|')
      for (const tag of tags) {
        if (this.tagList.indexOf(tag) === -1) {
          this.tagList.push(tag)
        }
      }
    },
    // 计算一共有多少页面
    setTotalNum () {
      this.totalNum = Math.ceil(this.markdownListNum / 5)
      eventMessage.$emit('changeTotalNum', this.totalNum)
    }
  },
  watch: {
    // 监听当前页面变化
    currentPage () {
      // 修改当前页面所显示的 markdown
      this.currentMarkdownList = this.markdownList.slice((this.currentPage - 1) * 5, this.currentPage * 5)
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  margin-top: 40px;
  padding-left: 6%;
  padding-right: 6%;

  .column {
    float: left;
  }

  .aside {
    width: 25%;
  }

  .content {
    width: 70%;
    margin-left: 3%;

    .main {
      height: 250px;
    }
  }
}

@media screen and (max-width: 1000px) {
  .column.content, .column.aside {
    width: 100%;
    margin-top: 20px;
    margin-left: 0;
  }
}

.index:after {
  content: "";
  display: table;
  clear: both;
}
</style>
