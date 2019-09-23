<template>
  <div class="visitorpie">
    <div id="visitorpie" style="width:90%;height:450px;"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/pie";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
export default {
  mounted() {
    this.mychart = echarts.init(document.getElementById("visitorpie"));
    this.initData();
  },
  methods: {
    initData() {
      const options = {
        title: {
          text: "用户分布",
          x: "center"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["北京", "上海", "深圳", "杭州", "其他"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            data: [
              { value: 125, name: "北京" },
              { value: 200, name: "上海" },
              { value: 80, name: "深圳" },
              { value: 90, name: "杭州" },
              { value: 70, name: "其他" }
            ],
            itemStyle: {
              emphasis: {
                // emphasis表示鼠标hover时高亮时的样式
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0,0,0,0.5)"
              }
            }
          }
        ]
      };
      this.mychart.setOption(options);
    }
  }
};
</script>

<style lang="">
.visitorpie {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>