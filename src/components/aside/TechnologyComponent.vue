<template>
  <div class="technology">
    <div class="title"><h2>技术栈</h2></div>
    <div class="item" v-for="item in technology" :key="item.name">
      <p class="name">{{ item.name }}</p>
      <el-progress :percentage="item.percentage" :color="item.color" :stroke-width="15" :show-text="false"></el-progress>
      <p class="content">{{ item.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TechnologyComponent',
  data () {
    return {
      technology: [
        {
          name: 'C/C++',
          percentage: 5,
          color: '#F04869',
          content: '就会个基础语法和Qt拖拽'
        },
        {
          name: 'Java',
          percentage: 60,
          color: '#FA7E24',
          content: 'Java 是世界上最好的语言'
        },
        {
          name: 'Python',
          percentage: 50,
          color: '#FCDA42',
          content: '机器学习为什么要让人来学习'
        },
        {
          name: 'SQL',
          percentage: 1,
          color: '##FA7E24',
          content: '增删改查，其他的不会'
        },
        {
          name: '前端',
          percentage: 40,
          color: '#248067',
          content: '马马虎虎，除了设计都能整'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.technology {
  width: 100%;
  background-color: #101F30;
  margin-top: 30px;
  padding-top: 15px;
  padding-bottom: 25px;
  border-radius: 20px;
  color: aliceblue;

  .title {
    transition: all .3s;
    text-align: center;
    color: aliceblue;
  }

  .item {
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 20px;

    p {
      margin: 5px;
    }

    .name {
      font-size: 20px;
    }

    .content {
      font-size: 15px;
      padding-left: 20px;
    }
  }
}
</style>
