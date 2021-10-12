<template>
  <div id="inventory" class="inventory"></div>
</template>

<script>
let echarts = require('echarts');
export default {
  name: "Inventory",
  methods: {
    //echarts字号换算
    nowSize(val, initWidth = 1920) {
      // let nowClientWidth = document.documentElement.clientWidth;
      let nowClientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      return val * (nowClientWidth / initWidth)
    },
    /**
     * 库房库存量统计图
     */
    inventoryEcharts() {
      var myChart = echarts.init(document.getElementById('inventory'));
      var option = {
        title: {},
        grid: {
          left: '1%',
          top: '13%',
          right: '0%',
          bottom: '2%',
          containLabel: true,
          width: '90%',
          height: '71%'
        },
        xAxis: {
          type: 'category',
          data: ['库房一', '库房二', '库房三', '库房四'],
          boundaryGap: false,
          axisLabel:{
            textStyle:{
              color:'#fff',
              fontSize:this.nowSize(15),
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff',
            }
          },

        },
        yAxis: {
          type: 'value',
          boundaryGap:false,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff',
            }
          },
          axisLabel:{
            textStyle:{
              color:'#fff',
              fontSize:this.nowSize(15),
            }
          },
          splitLine:{
            show: true,
            lineStyle:{
              color:['rgba(255,255,255,0.3)'],
              width: 1,
              type:'solid'
            }
          }
        },
        series: [
          {
            data: [150, 230, 200, 218],
            type: 'line',
            symbol: 'none',
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#1CD8D2' // 0% 处的颜色
                }, {
                  offset: 1, color: '#67C727' // 100% 处的颜色
                }],
                global: false, // 缺省为 false
              },
            },
            areaStyle: {},
          }
        ]
      };
      option && myChart.setOption(option);

    },
  },

  mounted() {
    this.inventoryEcharts();
  }
}

</script>

<style scoped>
.inventory {
  width: 10rem;
  height: 6rem;
  /*background-color: #fff;*/
}
</style>