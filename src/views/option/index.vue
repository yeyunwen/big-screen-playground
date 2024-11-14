<script setup lang="ts">
import { ref, useTemplateRef, watch, nextTick } from "vue";
import Chart1 from "./components/Chart1/index.vue";
import Chart2 from "./components/Chart2/index.vue";
import { useAppStore } from "@/stores/modules/app";
import { default as echarts, type ECOption } from "@/echarts";
import { merge } from "es-toolkit";
const appStore = useAppStore();

const bigChartRef = useTemplateRef<HTMLElement>("bigChart");
const showBig = ref(false);
const getBigFontSizeOption = (fontSize: number): ECOption => {
  return {
    xAxis: { axisLabel: { fontSize } },
    yAxis: { axisLabel: { fontSize } },
    // series: { label: { fontSize } },
    legend: { textStyle: { fontSize } },
    tooltip: { axisPointer: { lineStyle: { width: fontSize } } },
    // dataZoom: { textStyle: { fontSize } },
  };
};

watch(
  () => appStore.chartData,
  (newVal) => {
    if (newVal.option) {
      showBig.value = true;
      nextTick(() => {
        // console.log(bigChartRef.value!);
        // bigChartRef.value!.removeChild(bigChartRef.value!.firstChild!);
        const chart = echarts.init(bigChartRef.value!);
        chart.setOption(merge(newVal.option!, getBigFontSizeOption(16)));
      });
    }
  }
);

const handleClose = () => {
  bigChartRef.value!.innerHTML = "";
  showBig.value = false;
};
</script>

<template>
  <Chart1 />
  <Chart2 />
  <el-dialog
    v-model="showBig"
    @before-close="handleClose"
    :title="appStore.chartData.title"
    width="600"
  >
    <div
      ref="bigChart"
      id="dialog-char"
      style="width: 600px; height: 500px"
    ></div>
  </el-dialog>
</template>

<style scoped></style>
