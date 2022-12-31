<template>
  <div class="visitor">
    <div class="title"><h2>网站统计</h2></div>
    <div class="allVisitor">
      <h3>访客总数</h3>
      <h3>
        <i class="el-icon-s-flag" style="color: red"></i>
        {{ visitorNum }}
        <i class="el-icon-s-flag" style="color: blue"></i>
      </h3>
    </div>
    <div class="time">
      <h3>运营时间</h3>
      <h3>
        {{ time }}
      </h3>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import eventMessage from '@/EventMessage'

export default {
  name: 'VisitorComponent',
  created () {
    this.getVisitorNum()
    setInterval(this.getTime, 1000)
    eventMessage.$on('getBeginTime', (val) => {
      this.beginTime = val
    })
  },
  data () {
    return {
      visitorNum: 0,
      time: '',
      beginTime: this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    getVisitorNum () {
      const that = this
      axios({
        url: 'http://127.0.0.1:8080/visitor/selectVisitor',
        method: 'get'
      }).then(function (res) {
        that.visitorNum = res.data.data
      })
    },
    getTime () {
      const thisTime = this.$moment(new Date()).valueOf()
      const lastTime = this.$moment('2022-08-20 14:10:32', 'YYYY-MM-DD HH:mm:ss').valueOf()
      this.time = this.$moment(thisTime - lastTime).format('YYYY-MM-DD HH:mm:ss')
      this.time = this.$moment(this.time).subtract(1970, 'year').format('YY年MM月DD日 HH时mm分ss秒')
    },
    addZero (num) {
      if (parseInt(num) < 10) {
        num = '0' + num
      }
      return num
    },
    formatMsToDate (ms) {
      if (ms) {
        const oDate = new Date(ms)
        const oYear = oDate.getFullYear()
        const oMonth = oDate.getMonth() + 1
        const oDay = oDate.getDate()
        const oHour = oDate.getHours()
        const oMin = oDate.getMinutes()
        const oSen = oDate.getSeconds()
        return oYear + '-' + this.addZero(oMonth) + '-' + this.addZero(oDay) + ' ' + this.addZero(oHour) + ':' +
          this.addZero(oMin) + ':' + this.addZero(oSen)
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.visitor {
  width: 100%;
  height: 350px;
  background-color: #101F30;
  margin-top: 30px;
  border-radius: 20px;
  padding-top: 20px;
  text-align: center;
  color: aliceblue;

  .allVisitor {
    margin-top: 40px;
  }

  .time {
    margin-top: 40px;
  }
}
</style>
