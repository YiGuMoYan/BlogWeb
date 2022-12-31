<template>
  <div class="timeline">
    <router-link to="/timeline">
      <div class="title"><h2>时间轴</h2></div>
      <div>
        <el-timeline>
          <el-timeline-item
            v-for="timeline in timelineListShow"
            :key="timeline.id"
            :timestamp="timeline.time">
            {{ timeline.point }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'
import eventMessage from '@/EventMessage'

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
        eventMessage.$emit('getBeginTime', that.timelineList[0].time)
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
    transition: all .3s;
    text-align: center;
    color: aliceblue;
  }

  /deep/ .el-timeline-item__content {
    color: aliceblue;
  }

  a {
    text-decoration: none;
  }

  .router-link-active {
    text-decoration: none;
  }
}

.timeline:hover {
  .title {
    color: #49B1F5;;
  }
}
</style>
