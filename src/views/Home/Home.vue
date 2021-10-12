<template>
  <div class="home">
    <div class="header">
      <div class="nav">
        <p>
          立思辰档案智能控制系统
          <span>{{ this.nowDate }}</span>
        </p>
        <div class="search">
          <button @click="openSearch">搜索</button>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="firstLine">
        <div class="echarts">
          <span class="left"></span>
          <span class="top"></span>
          <span class="right"></span>
          <span class="botton"></span>
          <p>库房温湿度统计</p>
          <span>测点</span>
          <Humiture/>
        </div>
        <div class="echarts">
          <span class="left"></span>
          <span class="top"></span>
          <span class="right"></span>
          <span class="botton"></span>
          <p>库房库存统计</p>
          <Inventory/>
        </div>
        <div class="echarts info">
          <span class="left"></span>
          <span class="top"></span>
          <span class="right"></span>
          <span class="botton"></span>
          <p>报警信息</p>
          <div class="waringInfo"><i class="iconfont icon-baojing"></i>报警信息报警信息报警信息</div>
          <div class="waringInfo"><i class="iconfont icon-baojing"></i>报警信息报警信息报警信息</div>
          <div class="waringInfo"><i class="iconfont icon-baojing"></i>报警信息报警信息报警信息</div>
          <div class="waringInfo"><i class="iconfont icon-baojing"></i>报警信息报警信息报警信息</div>
          <div class="waringInfo"><i class="iconfont icon-baojing"></i>报警信息报警信息报警信息</div>
          <div class="waringInfo"><i class="iconfont icon-baojing"></i>报警信息报警信息报警信息</div>
        </div>
      </div>
      <div class="secondLine">
        <div class="echarts info">
          <span class="left"></span>
          <span class="top"></span>
          <span class="right"></span>
          <span class="botton"></span>
          <p>最近借阅</p>
<!--          <div class="waringInfo" v-for="item in borrowData" :key="item.dh">{{ item.dh }}-->
<!--            <span class="borrowTime">{{ item.outBaseTime }}</span>-->
<!--          </div>-->
          <div class="waringInfo" >档号
            <span class="borrowTime">2021-10-12 10:24</span>
          </div>
        </div>
        <div class="echarts">
          <span class="left"></span>
          <span class="top"></span>
          <span class="right"></span>
          <span class="botton"></span>
          <p>年度档案统计</p>
          <ShadowEcharts/>
        </div>

        <div class="echarts">
          <span class="left"></span>
          <span class="top"></span>
          <span class="right"></span>
          <span class="botton"></span>
          <p>密级统计</p>
          <PieEcharts/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieEcharts from "@/views/Home/echarts/PieEcharts";
import ShadowEcharts from "@/views/Home/echarts/ShadowEcharts";
import Humiture from "@/views/Home/echarts/Humiture";
import Inventory from "@/views/Home/echarts/Inventory";

let echarts = require('echarts')

export default {
  name: "home",
  components: {Inventory, Humiture, ShadowEcharts, PieEcharts},
  data() {
    return {
      dialogVisible: false,  //弹框
      recordTypeEcharts: {},  //档案类型echarts数据 树状图
      borrowEcharts: {},  //借阅echart数据 饼状图
      recordTypes: [],  //档案类型 总数
      recordBorrow: [],  //档案当前借出总量
      borrowTotal: [],  //档案当前借出总量
      nowDate: "", // 当前日期
      year: '',  //年
      month: '',  //月
      day: '', //日
      week: '',  //周
      weekArr: [], //周数组
      hour: '', //时
      minute: '', //分
      second: '', //秒
      borrowData: [],  //借阅信息
    }
  },
  created() {
    this.currentTime();
    this.getBorrowing();
  },
  //销毁定时器
  beforeDestroy() {
    if (this.formatDate) {
      clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
    }
  },
  methods: {
    /**
     * 单击按钮，进入搜索页
     */
    openSearch() {
      this.$router.push('/search')
    },
    //echarts字号换算
    nowSize(val, initWidth = 1920) {
      // let nowClientWidth = document.documentElement.clientWidth;
      let nowClientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      return val * (nowClientWidth / initWidth)
    },
    /**
     * 创建定时器，当前时间
     */
    currentTime() {
      setInterval(this.formatDate, 500);
      setInterval(this.getBorrow, 60000);
    },
    /**
     * 获取当前时间
     */
    formatDate() {
      let date = new Date();
      this.year = date.getFullYear(); // 年
      this.month = date.getMonth() + 1; // 月
      this.day = date.getDate(); // 日
      this.week = date.getDay(); // 星期
      this.weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //时 如果只有一位，则前面补零;
      this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //分 如果只有一位，则前面补零
      this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); // 如果只有一位，则前面补零
      this.nowDate = `${this.year}年${this.month}月${this.day}日 ${this.hour}:${this.minute}:${this.second} ${this.weekArr[this.week]}`;
    },
    /**
     * 最近借阅
     */
    getBorrowing() {
      this.$api.getLatelyBorrowing().then(res => {
        console.log(res);
        this.borrowData = res.data.data;
      })
    }
  },
}

</script>

<style lang="less" scoped>
.home {
  //首页头部
  .header {
    width: 100%;
    height: 2rem;

    .headerIcon {
      position: absolute;
      display: flex;

      button {
        background-color: rgba(255, 255, 255, 0);
        color: #fff;
        margin: 0.2rem 0 0 0.2rem;

        .icon-tuichu1 {
          font-size: 0.6rem;
        }
      }
    }

    .nav {
      margin: 0 auto;
      display: flex;

      p {
        width: 100%;
        color: #0EFFFF;
        text-shadow: 0 0 0.5em #0ae642, 0 0 0.2em #5c5c5c;
        height: 2rem;
        font-size: 1rem;
        line-height: 2rem;
        text-align: center;

        span {
          color: red;
          font-size: 0.5rem;
          text-shadow: none;
        }
      }

      .search {
        margin: 1rem 1rem 0 0;
        button {
          background-color: rgba(255, 255, 255, 0);
          border: 1px solid #173969;
          color: #0EFFFF;
          height: 1rem;
          width: 2rem;
          border-radius: 0.2rem;
          line-height: 1em;
          text-align: center;
          font-size: 0.5rem;
          border-shadow: 0 0 0.5em #0ae642, 0 0 0.2em #5c5c5c;

        }
      }
    }
  }

  .container {
    margin:2rem auto;
    .firstLine {
      display: flex;
      justify-content: space-around;

      .echarts {
        border: 1px solid #83D9F5;
        border-radius: 0.2rem;
        margin: 0.5rem;
        padding: 0.5rem;
        position: relative;
        width: 10rem;
        height: 8rem;
        .left{
          display: inline-block;
          width: 0.3rem;
          height: 0.3rem;
          border-radius: 0.1rem;
          position: absolute;
          top: -0.05rem;
          left: -0.05rem;
          border-top: 5px solid #06F4FD;
          border-left: 5px solid #06F4FD;
        }
        .top{
          display: inline-block;
          width: 0.3rem;
          height: 0.3rem;
          border-radius: 0.1rem;
          position: absolute;
          top: -0.05rem;
          left: 10.65rem;
          border-top: 5px solid #06F4FD;
          border-right: 5px solid #06F4FD;
        }
        .right{
          display: inline-block;
          width: 0.3rem;
          height: 0.3rem;
          border-radius: 0.1rem;
          position: absolute;
          top: 8.65rem;
          left: 10.65rem;
          border-bottom: 5px solid #06F4FD;
          border-right: 5px solid #06F4FD;
        }
        .botton{
          display: inline-block;
          width: 0.3rem;
          height: 0.3rem;
          border-radius: 0.1rem;
          position: absolute;
          top: 8.65rem;
          left: -0.05rem;
          border-bottom: 5px solid #06F4FD;
          border-left: 5px solid #06F4FD;
        }

        p {
          color: #fff;
          margin: 0.3rem 0 1rem 0
        }

        span {
          color: #fff;
          font-size: 0.3rem;
          position: relative;
          top: -0.3rem;
          left: 0.2rem;
        }
      }

      .info {
        .waringInfo {
          color: #fff;
          font-size: 0.4rem;
          line-height: 1rem;
          height: 1rem;
          border-bottom: 1px #fff dashed;

          .iconfont {
            line-height: 1rem;
            margin-right: 0.2rem;
            font-size: 0.5rem;
            color: red;
            border-shadow: 0 0 0.5em #0ae642, 0 0 0.2em #5c5c5c;
          }

        }
      }
    }

    .secondLine {
      display: flex;
      justify-content: space-around;
      margin-top: 0.5rem;

      .echarts {
        border: 1px solid #83D9F5;
        border-radius: 0.2rem;
        margin: 0.5rem;
        padding: 0.5rem;
        position: relative;
        width: 10rem;
        height: 8rem;
        .left{
          display: inline-block;
          width: 0.3rem;
          height: 0.3rem;
          border-radius: 0.1rem;
          position: absolute;
          top: -0.05rem;
          left: -0.05rem;
          border-top: 5px solid #06F4FD;
          border-left: 5px solid #06F4FD;
        }
        .top{
          display: inline-block;
          width: 0.3rem;
          height: 0.3rem;
          border-radius: 0.1rem;
          position: absolute;
          top: -0.05rem;
          left: 10.65rem;
          border-top: 5px solid #06F4FD;
          border-right: 5px solid #06F4FD;
        }
        .right{
          display: inline-block;
          width: 0.3rem;
          height: 0.3rem;
          border-radius: 0.1rem;
          position: absolute;
          top: 8.65rem;
          left: 10.65rem;
          border-bottom: 5px solid #06F4FD;
          border-right: 5px solid #06F4FD;
        }
        .botton{
          display: inline-block;
          width: 0.3rem;
          height: 0.3rem;
          border-radius: 0.1rem;
          position: absolute;
          top: 8.65rem;
          left: -0.05rem;
          border-bottom: 5px solid #06F4FD;
          border-left: 5px solid #06F4FD;
        }

        p {
          color: #fff;
          margin: 0.3rem 0 1rem 0
        }

        span {
          color: #fff;
          font-size: 0.3rem;
          position: relative;
          top: -0.3rem;
          left: 0.2rem;
        }
      }

      .info {
        width: 10rem;
        .waringInfo {
          width: 100%;
          color: #fff;
          font-size: 0.4rem;
          line-height: 1rem;
          height: 1rem;
          border-bottom: 1px #fff dashed;
        }

        .borrowTime {
          font-size: 0.3rem;
          position: relative;
          top: 0;
          left: 5rem
        }
      }
    }
  }
}


</style>
