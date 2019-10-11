<template>
  <div class="line">
    <div id="main" style="width:50%;height:450px;"></div>
  </div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/tooltip";

export default {
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.getElementById("main"));
    this.initData();
  },
  props: ["sevenDay", "sevenDate"],
  methods: {
    initData() {
      const color = ["#5793f3", "#675bba", "#d14a61"];
      const option = {
        color: color,
        title: {
          text: "走势图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["新注册用户", "新增订单", "新增管理员"]
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            dataView: { readOnly: false },
            magicType: { type: ["bar", "line"] },
            restore: {}
          }
        },
        xAxis: {
          data: this.sevenDay
        },
        yAxis: [
          {
            type: "value",
            name: "用户",
            min: 0,
            max: 200,
            position: "left",
            axisLine: {
              lineStyle: {
                color: "#999"
              }
            },
            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            type: "value",
            name: "订单",
            min: 0,
            max: 200,
            position: "right",
            axisLine: {
              lineStyle: {
                color: "#999"
              }
            },
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: [
          {
            name: "新注册用户",
            type: "line",
            data: this.sevenDate[0],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          },
          {
            name: "新增订单",
            type: "line",
            data: this.sevenDate[1],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          },
          {
            name: "新增管理员",
            type: "bar",
            data: this.sevenDate[2],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            }
          }
        ]
      };
      // 绘制图表
      this.myChart.setOption(option);
    }
  },
  watch: {
    sevenDate: function() {
      this.initData();
    },
    sevenDay: function() {
      this.initData();
    }
  }
};
</script>

<style lang="less" scoped>
.line {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
</style>