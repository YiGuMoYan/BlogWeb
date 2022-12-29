<template>
  <div class="head">
    <!-- 头像 -->
    <img src="../../../assets/Head.jpg" alt="head">
    <!-- 标签块 -->
    <div class="tagBlock">
      <span><HeadTagComponent name="博客" :num="markdownListNum"/></span>
      <span class="tagMargin"><HeadTagComponent name="标签" :num="tagListNum"/></span>
    </div>
    <!-- 标语 -->
    <div class="slogan">{{ slogan }}</div>
    <div class="connect">
      <router-link class="link" to="connect">联系我们</router-link>
    </div>
  </div>
</template>

<script>
import HeadTagComponent from '@/components/aside/head/HeadTagComponent.vue'

export default {
  name: 'HeadComponents',
  components: { HeadTagComponent },
  props: {
    markdownListNum: {
      type: Number,
      default: 0
    },
    tagListNum: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      slogan: '很高兴与您在这里相遇'
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

  img {
    margin-top: 30px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    transition: all .5s;
  }

  img:hover {
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
  }

  .slogan:hover {
    font-size: 25px;
  }

  .connect {
    margin-top: 30px;
    font-size: 15px;

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
