<template>
  <div class="head">{{title}}</div>
</template>

<script>
export default {
  name: 'ContentHeadComponent',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
@font-face {
  font-family: myFirstFont;
  src: url('../../assets/font/SmileySans-Oblique.ttf');
}

.head {
  width: 100%;
  height: 200px;
  background-color: #142334;
  border-radius: 20px;
  line-height: 200px;
  font-size: 50px;
  color: aliceblue;
  text-align: center;
  font-family: myFirstFont, serif;
}
</style>
