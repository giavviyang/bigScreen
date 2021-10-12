<template>
  <div id="humiture" class="humiture"></div>
</template>

<script>
let echarts = require('echarts');
export default {
  name: "Humiture",
  methods: {
    //echarts字号换算
    nowSize(val, initWidth = 1920) {
      // let nowClientWidth = document.documentElement.clientWidth;
      let nowClientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      return val * (nowClientWidth / initWidth)
    },
    humitureEcharts() {
      var myChart = echarts.init(document.getElementById('humiture'));
      var option = {
        title: {},
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '1%',
          top: '-15',
          right: '-40%',
          bottom: '10%',
          containLabel: true,
          width:'102%',
          height:'80%'
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          // boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#97A1C8']
            }
          },
          axisLine:{
            show:true
          },
          axisLabel:{
            textStyle:{
              color:'#fff',
              fontSize:this.nowSize(15),
            }
          }
        },
        yAxis: {
          type: 'category',
          boundaryGap:false,
          scale:true,
          data: ['','监测点1', '监测点2', '监测点3', '监测点4', '监测点5',''],
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#97A1C8']
            }
          },
          axisLine:{
            show:true,
            onZero:true
          },
          axisTick:{
            alignWithLabel:true
          },
          axisLabel:{
            textStyle:{
              color:'#fff',
              fontSize:this.nowSize(15),
            }
          }

        },
        series: [
          {
            name: '2011',
            type: 'bar',
            data: [{},
              {
                value: 18,
                itemStyle: {
                  color: '#46EBA7',
                }
              },
              {
                value: 30,
                itemStyle: {
                  color: '#E1053D',
                }
              },
              {
                value: 25,
                itemStyle: {
                  color: '#06D7EC',
                }
              },
              {
                value: 20,
                itemStyle: {
                  color: '#F9C61C',
                }
              },
              {
                value: 18,
                itemStyle: {
                  color: '#FBFE08',
                }
              },{}]
          },
        ]
      };
      option && myChart.setOption(option);

    },
  },
  mounted() {
    this.humitureEcharts();
  }
}

</script>

<style scoped>
.humiture {
  width: 10rem;
  height: 6rem;
}
</style>