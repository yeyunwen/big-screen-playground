<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
import { default as echarts, ECOption } from "@/echarts";
import { merge } from "es-toolkit";
import { baseOption } from "./optine";

defineOptions({
  name: "Chart1",
});

const emits = defineEmits(["showBig"]);

const chartRef = useTemplateRef<HTMLElement>("chart");

const getOption = (data: { xList: string[]; yList: number[] }): ECOption => {
  const exctrOption: ECOption = {
    xAxis: {
      data: data.xList,
    },
    series: [
      {
        data: data.yList,
      },
    ],
  };

  return merge(baseOption, exctrOption);
};

const render = (dom: HTMLElement) => {
  const option = getOption({
    xList: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    yList: [150, 230, 224, 218, 135, 147, 260],
  });
  const chart = echarts.init(dom);
  chart.setOption(option);
  return {
    dispose: () => {
      chart.dispose();
    },
  };
};

const clickBig = () => {
  emits("showBig", "chart1");
};

onMounted(() => {
  render(chartRef.value!);
});

defineExpose({
  render,
});
</script>

<template>
  <el-button @click="clickBig">放大</el-button>
  <div class="chart-wrap">
    <div ref="chart" style="width: 100%; height: 100%"></div>
  </div>
</template>

<style scoped>
.chart-wrap {
  width: 200px;
  height: 200px;
}
</style>
