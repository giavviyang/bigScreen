<template>
  <div id="shadowEcharts" class="shadowEcharts"></div>
</template>

<script>
let echarts = require('echarts');

export default {
  name: "ShadowEcharts",
  data() {
    return {
      years: [], //年份
      recordTypes: [],//档案类型
      record: {}, //请求后台的结果重新组合
      data: [],
      total: [],
    }
  },
  methods: {
    //echarts字号换算
    nowSize(val, initWidth = 1920) {
      let nowClientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      return val * (nowClientWidth / initWidth)
    },
    recordShadowEcharts(year) {
      let shadowEcharts = echarts.init(document.getElementById('shadowEcharts'));

      // this.$api.getYearTotalByND({
      //   params: {year: year},
      // }).then(res => {
      //   if (res.data.code === 200) {
      //     let app = {};
      //     let arr = [];
      //     res.data.data.forEach(ele => {
      //       for (let key in ele) {
      //         arr.push(key);
      //         this.years = arr.slice(0, 5)
      //       }
      //     })
      //     let aaa = [];
      //     res.data.data.forEach(item => {
      //       aaa.push(Object.values(item))
      //     })
      //     console.log(JSON.stringify(aaa));
      //     var temp = {}
      //     aaa.forEach(ele => {
      //       temp[ele.slice(-1)] = ele.slice(0, 5);
      //       console.log(temp);
      //     });
      //     console.log(temp);
          let posList = [
            'left', 'right', 'top', 'bottom',
            'inside',
            'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
            'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
          ];
          app.configParameters = {
            rotate: {
              min: -90,
              max: 90
            },
            align: {
              options: {
                left: 'left',
                center: 'center',
                right: 'right'
              }
            },
            verticalAlign: {
              options: {
                top: 'top',
                middle: 'middle',
                bottom: 'bottom'
              }
            },
            position: {
              options: posList.reduce(function (map, pos) {
                map[pos] = pos;
                return map;
              }, {})
            },
            distance: {
              min: 0,
              max: 100
            }
          };

          app.config = {
            rotate: 90,
            align: 'left',
            verticalAlign: 'middle',
            position: 'insideBottom',
            distance: 15,
            onChange: function () {
              var labelOption = {
                normal: {
                  rotate: app.config.rotate,
                  align: app.config.align,
                  verticalAlign: app.config.verticalAlign,
                  position: app.config.position,
                  distance: app.config.distance
                }
              };
              shadowEcharts.setOption({
                series: [{
                  label: labelOption
                }, {
                  label: labelOption
                }, {
                  label: labelOption
                }, {
                  label: labelOption
                }]
              });
            }
          };
          let labelOption = {
            show: false, //不在图表上显示具体数据
            position: app.config.position,
            distance: app.config.distance,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            rotate: app.config.rotate,
            formatter: '{c}  {name|{a}}',
            fontSize: 16,
            rich: {
              name: {}
            }
          };
          shadowEcharts.setOption({
            title: {},
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              top: '25%',
              width: '75%',
              bottom: '10%',
            },
            legend: {
              data: ['人力档案', '营房档案', '财务档案', '保密档案'],
              top: '-2%',
              textStyle: {
                fontSize: this.nowSize(15),
                color: '#fff',
              },
              itemWidth: this.nowSize(20),
              itemHeight: this.nowSize(15),
            },
            toolbox: {
              show: false,
              orient: 'vertical',
              left: 'right',
              top: 'center',
              iconStyle: {
                color: '#fff',
              },
              feature: {
                mark: {show: true},
                dataView: {
                  show: true, lang: ['档案年度总量', '关闭', '刷新'], readOnly: false, optionToContent: function (opt) {
                    var axisData = opt.xAxis[0].data;
                    var series = opt.series;
                    var table = '<table style="width:90%;text-align:center;font-size: 0.3rem;"><tbody><tr style="height: 0.5rem;line-height: 0.5rem">'
                        + '<td>时间</td>'
                        + '<td>' + series[0].name + '</td>'
                        + '<td>' + series[1].name + '</td>'
                        + '<td>' + series[2].name + '</td>'
                        + '<td>' + series[3].name + '</td>'
                        + '</tr>';
                    for (var i = 0, l = axisData.length; i < l; i++) {
                      table += '<tr style="height: 0.5rem;line-height: 0.5rem">'
                          + '<td>' + axisData[i] + '</td>'
                          + '<td>' + series[0].data[i] + '</td>'
                          + '<td>' + series[1].data[i] + '</td>'
                          + '<td>' + series[2].data[i] + '</td>'
                          + '<td>' + series[3].data[i] + '</td>'
                          + '</tr>';
                    }
                    table += '</tbody></table>';
                    return table;
                  }
                },
                magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            xAxis: [
              {
                name: '年',
                type: 'category',
                nameTextStyle: {
                  show: true,
                  fontSize: this.nowSize(20)
                },
                axisLine: {
                  show: true,  //显示y轴
                  lineStyle: {
                    color: '#fff',
                  },
                },
                axisTick: {show: false},
                axisLabel: {
                  fontSize: this.nowSize(15)
                },
                // data: this.years,
                data: ['2017', '2018', '2019', '2020', '2021']
              }
            ],
            yAxis: [
              {
                name: '件',
                type: 'value',
                nameTextStyle: {
                  show: true,
                  fontSize: this.nowSize(20)
                },
                axisLine: {
                  show: true,  //显示y轴
                  lineStyle: {
                    color: '#fff',
                  }
                },
                axisLabel: {
                  fontSize: this.nowSize(15)
                },
              }
            ],
            series: [

              {
                name: '人力档案',
                type: 'bar',
                barGap: 0,
                label: labelOption,
                bottom: '1%',
                emphasis: {
                  focus: 'series'
                },
                // data: temp['人力档案'],
                data: [320, 332, 301, 334, 390],
                itemStyle: {
                  color: '#F9C61C',
                }
              },
              {
                name: '营房档案',
                type: 'bar',
                label: labelOption,
                emphasis: {
                  focus: 'series'
                },
                // data: temp['营房档案'],
                data: [220, 182, 191, 234, 290],
                itemStyle: {
                  color: '#46EBA7',
                }

              },
              {
                name: '财务档案',
                type: 'bar',
                label: labelOption,
                emphasis: {
                  focus: 'series'
                },
                // data:temp['财务档案'],
                data: [150, 232, 201, 154, 190],
                itemStyle: {
                  color: '#06D7EC',
                }
              },
              {
                name: '保密档案',
                type: 'bar',
                label: labelOption,
                emphasis: {
                  focus: 'series'
                },
                // data:temp['保密档案'],
                data: [98, 77, 101, 99, 40],
                itemStyle: {
                  color: '#FBFE08',
                }
              }
            ]
          })
        }
    //   })
    // }
    //
  },
  mounted() {
    this.$nextTick(() => {
      setInterval(() => {
        this.recordShadowEcharts(2020);
      }, 3600000);
      setTimeout(() => {
        this.recordShadowEcharts(2020);
      }, 500);
    })
  },
  updated() {
    if (this.recordShadowEcharts) {
      clearTimeout(this.recordShadowEcharts); // 在Vue实例销毁前，清除时间定时器
    }
  },
  //销毁定时器
  beforeDestroy() {
    if (this.recordShadowEcharts) {
      clearInterval(this.recordShadowEcharts); // 在Vue实例销毁前，清除时间定时器
    }
  },
}
</script>

<style scoped>
.shadowEcharts {
  width: 10rem;
  height: 6rem;
}
</style>