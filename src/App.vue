<template>
  <div>
    <div class="index">
      <!-- 边框栏 -->
      <div class="column aside">
        <head-components :markdown-list-num="markdownListNum" :tag-list-num="tagListNum" :tag-list="tagList"/>
        <timeline-component class="timeline"/>
      </div>
      <!-- 主内容 -->
      <div class="column content">
        <!-- 主内容的标题 -->
        <content-head-component :title="title"/>
        <!-- 主内容的内容 -->
        <div class="main"><router-view :markdown-list="currentMarkdownList" :total="markdownListNum" :currentPage="currentPage"/></div>
      </div>
    </div>
    <div>
      <foot-component/>
    </div>
  </div>
</template>

<script>
import HeadComponents from '@/components/aside/head/HeadComponents.vue'
import ContentHeadComponent from '@/components/content/ContentHeadComponent.vue'
import axios from 'axios'
import eventMessage from '@/EventMessage'
import TimelineComponent from '@/components/aside/TimelineComponent.vue'
import FootComponent from '@/components/FootComponent.vue'

export default {
  name: 'IndexView',
  components: { FootComponent, TimelineComponent, ContentHeadComponent, HeadComponents },
  created () {
    this.getMarkdownList()
    eventMessage.$on('currentPageChange', (val) => {
      this.currentPage = val
    })
    eventMessage.$on('changeTags', (val) => {
      this.tags = val
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
      totalNum: 0,
      // 当前 tag
      tags: []
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
        that.arrangeMarkdownList()
      })
    },
    getMarkdownListByTags () {
      const that = this
      axios({
        url: 'http://127.0.0.1:8080/markdown/selectMarkdownByClassifications',
        method: 'post',
        data: {
          tags: that.tags
        }
      }).then(function (res) {
        that.markdownList = res.data.data
        that.arrangeMarkdownList()
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
    arrangeMarkdownList () {
      // 给 markdownList 逆序
      // 使最新的 markdown 显示在最前
      this.markdownList = this.markdownList.reverse()
      this.markdownListNum = this.markdownList.length
      // 获取第一页 markdown 内容
      this.currentMarkdownList = this.markdownList.slice((this.currentPage - 1) * 5, this.currentPage * 5)
      this.setTags()
    }
  },
  watch: {
    // 监听当前页面变化
    currentPage () {
      // 修改当前页面所显示的 markdown
      this.currentMarkdownList = this.markdownList.slice((this.currentPage - 1) * 5, this.currentPage * 5)
    },
    tags () {
      if (this.tags === this.tagList) {
        this.getMarkdownList()
      } else {
        this.getMarkdownListByTags()
      }
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
  }
}

@media screen and (max-width: 1000px) {
  .column.content, .column.aside {
    width: 100%;
    margin-top: 20px;
    margin-left: 0;
  }
  .timeline {
    display: none;
  }
}

.index:after {
  content: "";
  display: table;
  clear: both;
}
</style>
