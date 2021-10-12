<template>
  <div id="pieEcharts" class="pieEcharts"></div>
</template>

<script>
let echarts = require('echarts');

export default {
  name: "PieEcharts",
  methods: {
    //echarts字号换算
    nowSize(val, initWidth = 1920) {
      // let nowClientWidth = document.documentElement.clientWidth;
      let nowClientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      return val * (nowClientWidth / initWidth)
    },

    recordPieEcharts() {
      let pieEcharts = echarts.init(document.getElementById('pieEcharts'));

      // this.$api.getYearTotalByMJ().then(res => {
      //   console.log(res);
      //   if (res.data.code === 200) {
      //     console.log(res.data.data);

          pieEcharts.setOption({
            title: {},
            tooltip: {
              trigger: 'item',
            },
            legend: {
              icon: "circle",
              left: 'center',
              top: '90%',
              textStyle: {
                fontSize: this.nowSize(17),
                color: '#fff'
              },
              itemWidth: this.nowSize(32),
              itemHeight: this.nowSize(20),
              // radius: '80%',
            },
            series: [
              {
                top: '-25%',
                name: '秘密等级',
                type: 'pie',
                radius: ['40%', '60%'],
                data: [
                  {value: 3, name: '公开'},
                  {value: 5, name: '绝密'},
                  {value:8, name: '机密'},
                  {value: 2, name: '秘密'},
                  // {value: res.data.data['公开'], name: '公开'},
                  // {value: res.data.data['绝密'], name: '绝密'},
                  // {value: res.data.data['机密'], name: '机密'},
                  // {value: res.data.data['秘密'], name: '秘密'},
                ],
                label: {
                  show: false,
                  normal: {
                    position: 'outside',
                    // formatter: '{c}',
                    formatter: '{d}%',
                    fontSize: this.nowSize(20),
                    color: '#fff',

                  },

                },
                labelLine: {
                  show: true
                },
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          })
        }
    //   })
    // },
  },
  mounted() {
    this.$nextTick(() => {
      setInterval(() => {
        this.recordPieEcharts();
      }, 3600000);
      setTimeout(() => {
        this.recordPieEcharts();
      }, 500);
    })
  },
  updated() {
    if (this.recordPieEcharts) {
      clearTimeout(this.recordPieEcharts); // 在Vue实例销毁前，清除时间定时器
    }
  },
  //销毁定时器
  beforeDestroy() {
    if (this.recordPieEcharts) {
      clearInterval(this.recordPieEcharts); // 在Vue实例销毁前，清除时间定时器
    }
  },
}

</script>

<style scoped>
.pieEcharts {
  width: 10rem;
  height: 6rem;
}
</style>