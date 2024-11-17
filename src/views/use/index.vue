<script setup lang="ts">
import { ref, useTemplateRef, watch, nextTick } from "vue";
import LeftTop from "./components/LeftTop/index.vue";
import { useAppStore } from "@/stores/modules/app";
import echarts, { getBigFontSizeOption } from "@/echarts";
import { merge } from "es-toolkit";
const appStore = useAppStore();

const bigChartRef = useTemplateRef<HTMLElement>("bigChart");
const showBig = ref(false);

watch(
  () => appStore.chartData,
  (newVal) => {
    if (newVal.option) {
      showBig.value = true;
      nextTick(() => {
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
  <div class="left-top-wrap">
    <LeftTop />
  </div>
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

<style scoped>
.left-top-wrap {
  width: 30vw;
  height: 30vh;
}
</style>
