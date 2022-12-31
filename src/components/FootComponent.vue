<template>
  <div class="foot">
    <div class="hitokoto">{{ hitokotoStr }}</div>
    <div class="message">
      <div>{{ message1 }}<a href="http://yigumoyan.top">{{ name }}</a>{{ message2 }}</div>
      <div><a href="https://beian.miit.gov.cn">{{ port }}</a></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FootComponent',
  created () {
    this.getHitokoto()
  },
  data () {
    return {
      message1: ' Copyright © 2022 —— 2023 ',
      name: '忆古陌烟',
      message2: ' All rights reserved. ',
      port: '陕ICP备2022009553号',
      hitokoto: '',
      hitokotoStr: ''
    }
  },
  methods: {
    getHitokoto () {
      const that = this
      axios({
        url: 'http://127.0.0.1:8080/hitokoto/selectHitokoto',
        method: 'get'
      }).then(function (res) {
        that.hitokoto = res.data.data
        that.hitokotoStr = that.hitokoto.say + ' —— '
        if (that.hitokoto.fromWho !== null) {
          that.hitokotoStr += that.hitokoto.fromWho + ' '
        }
        if (that.hitokoto.fromArt !== null) {
          that.hitokotoStr += '『' + that.hitokoto.fromArt + '』'
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.foot {
  width: 100%;
  height: 250px;
  background-color: #0F1523;
  text-align: center;
  margin-top: 100px;
  padding-top: 50px;

  .hitokoto {
    color: aliceblue;
    font-size: 15px;
  }

  .message {
    margin-top: 15px;
    color: aliceblue;
    font-size: 13px;

    a {
      color: aliceblue;
      text-decoration: none;
    }
  }
}
</style>
