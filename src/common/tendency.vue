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
    var myChart = echarts.init(document.getElementById("main"));
    // 绘制图表
    myChart.setOption({
      colors:["#5793f3", "#675bba", "#d14a61"],
      title: {
        text: "走势图"
      },
      tooltip: {
         
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
      legend: {
           data: ["新注册用户", "新增订单", "新增管理员"]
      },
      xAxis: {
        data: ["2019-8-30", "2019-8-31", "2019-9-1", "2019-9-2", "2019-9-3", "2019-9-4"]
      },
      yAxis: [
         {
            type: "value",
            name: "用户",
            min: 0,
            max: 100,
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
            max: 100,
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
          data: [5, 20, 36, 10, 10, 20]
        },
        {
          name: "新增订单",
          type: "bar",
          data: [10, 30, 10, 50, 60, 40]
        },
        {
          name: "新增管理员",
          type: "bar",
          data: [2, 10, 15, 8, 5, 4]
        }
      ]
    });
  }
};
</script>

<style lang="less" scoped>
.line{
    display: flex;
    justify-content: center;
    margin-top: 50px;
}
</style>