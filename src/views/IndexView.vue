<template>
  <div class="index">
    <div class="column aside">
      <HeadComponents :markdownListNum="markdownListNum" :tagListNum="tagListNum"/>
    </div>
    <div class="column content">
      <ContentHeadComponent title="标题"/>
    </div>
  </div>
</template>

<script>
import HeadComponents from '@/components/aside/head/HeadComponents.vue'
import ContentHeadComponent from '@/components/content/ContentHeadComponent.vue'
import axios from 'axios'

export default {
  name: 'IndexView',
  components: { ContentHeadComponent, HeadComponents },
  created () {
    this.getMarkdownList()
  },
  data () {
    return {
      markdownList: [],
      markdownListNum: 0,
      tagList: [],
      tagListNum: 0
    }
  },
  methods: {
    getMarkdownList () {
      const that = this
      axios({
        url: 'http://127.0.0.1:8080/markdown/selectAllMarkdownMessage',
        method: 'get'
      }).then(function (res) {
        that.markdownList = res.data.data
        that.markdownListNum = that.markdownList.length
        for (const markdown of that.markdownList) {
          that.getTagList(markdown.classification)
        }
        that.tagListNum = that.tagList.length
      })
    },
    getTagList (tagStr) {
      const tags = tagStr.split('|')
      for (const tag of tags) {
        if (this.tagList.indexOf(tag) === -1) {
          this.tagList.push(tag)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  margin-top: 40px;
  width: 90vw;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);

  .column {
    float: left;
    padding: 10px;
  }

  .aside {
    width: 25%;
  }

  .content {
    width: 70%;
  }
}

@media screen and (max-width: 1000px) {
  .column.content, .column.aside {
    width: 100%;
    margin-top: 20px;
  }
}

.index:after {
  content: "";
  display: table;
  clear: both;
}
</style>
