<template>
  <div class="head">
    <!-- 头像 -->
    <img src="../../../assets/Head.jpg" alt="head" class="headImage">
    <!-- 标签块 -->
    <div class="tagBlock">
      <span @click="blogClick"><HeadTagComponent name="博客" :num="markdownListNum"/></span>
      <span @click="tagClick" class="tagMargin"><HeadTagComponent name="标签" :num="tagListNum"/></span>
    </div>
    <!-- 标语 -->
    <div class="slogan">{{ slogan }}</div>
    <div class="connect">
      <a class="link" href="http://www.yigumoyan.top">联系我们</a>
    </div>
    <head-tag-dialog-component :tag-list="tagList"/>
  </div>
</template>

<script>
import HeadTagComponent from '@/components/aside/head/HeadTagComponent.vue'
import HeadTagDialogComponent from '@/components/aside/head/HeadTagDialogComponent.vue'
import eventMessage from '@/EventMessage'

export default {
  name: 'HeadComponents',
  components: { HeadTagDialogComponent, HeadTagComponent },
  props: {
    markdownListNum: {
      type: Number,
      default: 0
    },
    tagListNum: {
      type: Number,
      default: 0
    },
    tagList: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  data () {
    return {
      slogan: '很高兴与您在这里相遇'
    }
  },
  methods: {
    blogClick () {
      this.$router.push('/')
    },
    tagClick () {
      eventMessage.$emit('changeTagDialog', true)
    }
  }
}
</script>

<style lang="less" scoped>
.head {
  background-color: #101f30;
  width: 100%;
  height: 500px;
  text-align: center;
  color: aliceblue;
  border-radius: 20px;

  .headImage {
    margin-top: 30px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    transition: all .5s;
    user-select: none;
  }

  .headImage:hover {
    transform: rotate(360deg);
  }

  .tagBlock {
    margin-top: 30px;
  }

  .tagMargin {
    margin-left: 20px;
  }

  .slogan {
    margin-top: 30px;
    font-size: 23px;
    transition: all .3s;
    user-select: none;
  }

  .slogan:hover {
    font-size: 25px;
  }

  .connect {
    margin-top: 30px;
    font-size: 15px;
    user-select: none;

    .link {
      color: aliceblue;
      text-decoration: none;
      transition: all .3s;
    }

    .link:hover {
      color: #49B1F5;
      font-size: 18px;
    }
  }
}

span {
  display: inline-block;
}
</style>
