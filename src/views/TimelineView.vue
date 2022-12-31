<template>
  <div class="timeline">
    <div class="title"> <h1>时间轴</h1> </div>
    <div class="time">
      <el-timeline>
        <el-timeline-item
          v-for="timeline in timelineList"
          :key="timeline.id"
          :timestamp="timeline.time"
          id="timeline">
          {{timeline.point}}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TimelineView',
  created () {
    this.getTimelineList()
  },
  data () {
    return {
      timelineList: []
    }
  },
  methods: {
    getTimelineList () {
      const that = this
      axios({
        url: that.$url + 'timeline/selectAllTimeline',
        method: 'get'
      }).then(function (res) {
        that.timelineList = res.data.data
        that.timelineList = that.timelineList.reverse()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.timeline {
  display: block;
  margin-top: 30px;
  width: 100%;
  border-radius: 20px;
  background-color: #101F30;
  color: aliceblue;
  padding-top: 40px;
  padding-bottom: 50px;

  .title {
    text-align: center;
    h1 {
      line-height: 50px;
      margin: 0;
    }
  }

  .time {
    margin-top: 60px;

    /deep/ .el-timeline-item__content {
      color: aliceblue;
      font-size: 20px;
    }
  }

}

@media screen and (min-width: 1000px) {
  /deep/ .el-timeline {
    padding-left: 20%;
  }
}
</style>
