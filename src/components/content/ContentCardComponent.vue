<template>
  <div class="card">
    <div v-if="type===0">
      <span class="column image leftRadius">
        <img class="leftRadius" :src="imageUrl" alt="backgroundImage">
      </span>
      <span class="column title rightRadius">
        <div class="message">
          <h2>{{markdown.title}}</h2>
          <i class="el-icon-date"></i>{{markdown.time}}
        </div>
      </span>
    </div>
    <div v-if="type===1">
      <span class="column title leftRadius">
        <div class="message">
          <h2>{{markdown.title}}</h2>
          {{markdown.time}}
        </div>
      </span>
      <span class="column image rightRadius">
        <img class="rightRadius" :src="imageUrl" alt="backgroundImage">
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ContentCardComponent',
  props: {
    type: {
      type: Number,
      default: 1
    },
    markdown: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  created () {
    this.getImageUrl()
  },
  data () {
    return {
      imageUrl: ''
    }
  },
  methods: {
    getImageUrl () {
      const that = this
      axios({
        url: 'http://127.0.0.1:8080/backgroundImageFile/selectBackgroundImageFile',
        method: 'get'
      }).then(function (res) {
        that.imageUrl = res.data.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  width: 90%;
  height: 300px;
  padding-right: 5%;
  padding-left: 5%;
  transition: all .2s;
  display: table;

  .column {
    float: left;
    height: 300px;
    width: 50%;
    transition: all .2s;
  }

  .image {
    img {
      width: 100%;
      height: 100%;
    }
  }

  .title {
    background-color: aliceblue;
    text-align: center;
    vertical-align: middle;

    .message {
      margin-top: 50px;
      color: black;

      h2 {
        font-size: 25px;
      }
    }
  }

  .leftRadius {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  .rightRadius {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  @media screen and (max-width: 1000px) {
    .card {
      height: 400px;
    }

    .column.image, .column.title {
      width: 100%;
      margin-left: 0;
    }

    .column.image {
      height: 200px;
    }

    .column.title {
      height: 200px;
    }

    .leftRadius {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 0;
      border-top-right-radius: 20px;
    }

    .rightRadius {
      border-top-right-radius: 0;
      border-bottom-right-radius: 20px;
      border-bottom-left-radius: 20px;
    }
  }
}

@media screen and (min-width: 1000px) {
  .card:hover .image {
    width: 40%;
  }

  .card:hover .title {
    width: 60%;
  }
}
</style>
