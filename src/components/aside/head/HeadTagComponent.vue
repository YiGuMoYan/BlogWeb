<template>
  <div class="headTag">
    <div class="name">{{ name }}</div>
    <div class="num">{{ num }}</div>
  </div>
</template>

<script>
export default {
  name: 'HeadTagComponent',
  props: {
    name: {
      type: String,
      default: ''
    },
    num: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="less" scoped>
.headTag {
  color: aliceblue;
  width: 70px;
  height: 100px;
  transition: all .5s;

  .name {
    font-size: 20px;
  }

  .num {
    font-size: 25px;
    margin-top: 20px;
  }
}

.headTag:hover {
  color: #49B1F5;
  cursor: pointer;
}
</style>
