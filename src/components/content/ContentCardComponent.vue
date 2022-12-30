<template>
  <div class="card">
    <div v-if="type===0">
      <span class="column image leftRadius">
        <img class="leftRadius" :src="imageUrl" alt="">
      </span>
      <span class="column title rightRadius"></span>
    </div>
    <div v-if="type===1">
      <span class="column title leftRadius"></span>
      <span class="column image rightRadius">
        <img class="rightRadius" :src="imageUrl" alt="">
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
