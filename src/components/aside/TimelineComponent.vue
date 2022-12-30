<template>
  <div class="timeline">
    <div class="title"><h2>时间轴</h2></div>
    <div>
      <el-timeline>
        <el-timeline-item
          v-for="timeline in timelineListShow"
          :key="timeline.id"
          :timestamp="timeline.time">
          {{timeline.point}}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TimelineComponent',
  created () {
    this.getTimelineList()
  },
  data () {
    return {
      timelineList: [],
      timelineListShow: []
    }
  },
  methods: {
    getTimelineList () {
      const that = this
      axios({
        url: 'http://127.0.0.1:8080/timeline/selectAllTimeline',
        method: 'get'
      }).then(function (res) {
        that.timelineList = res.data.data
        that.timelineList = that.timelineList.reverse()
        that.timelineListShow = that.timelineList.slice(0, 4)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.timeline {
  width: 100%;
  height: 350px;
  background-color: #101F30;
  margin-top: 30px;
  border-radius: 20px;
  padding-top: 15px;

  .title {
    text-align: center;
    color: aliceblue;
  }

  /deep/ .el-timeline-item__content {
    color: aliceblue;
  }
}
</style>
