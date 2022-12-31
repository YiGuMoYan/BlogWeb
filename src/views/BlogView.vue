<template>
  <div class="blog">
    <v-md-preview :text="markdown.markdown"></v-md-preview>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BlogView',
  created () {
    this.getMarkdownById()
  },
  data () {
    return {
      id: this.$route.params.id,
      markdown: {}
    }
  },
  methods: {
    getMarkdownById () {
      const that = this
      axios({
        url: that.$url + 'markdown/selectMarkdownById',
        method: 'post',
        data: {
          id: that.id
        }
      }).then(function (res) {
        that.markdown = res.data.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.blog {
  margin-top: 30px;

  /deep/ .vuepress-markdown-body {
    background-color: #101F30;
    color: aliceblue;
    border-radius: 20px;
  }
}
</style>
