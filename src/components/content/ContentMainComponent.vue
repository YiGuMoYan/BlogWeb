<template>
  <div class="main">
    <div v-for="(markdown, index) in markdownList" :key="markdown.id" class="card">
      <content-card-component :type="isMutuality ? index % 2 : 0"/>
    </div>
  </div>
</template>

<script>
import ContentCardComponent from '@/components/content/ContentCardComponent.vue'

export default {
  name: 'ContentMainComponent',
  components: { ContentCardComponent },
  props: {
    markdownList: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  created () {
    console.log(this.windowWidth)
    this.setWindowWidth()
  },
  data () {
    return {
      windowWidth: document.documentElement.clientWidth,
      isMutuality: this.windowWidth >= 1000
    }
  },
  methods: {
    setWindowWidth () {
      const that = this
      this.isMutuality = this.windowWidth >= 1000
      window.onresize = () => {
        return (() => {
          that.windowWidth = document.documentElement.clientWidth
        })()
      }
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

  .card {
    margin-top: 50px;
  }
}
</style>
