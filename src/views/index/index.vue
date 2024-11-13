<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from "vue";
import Chart1 from "./components/Chart1/index.vue";
import Chart2 from "./components/Chart2/index.vue";
import type { ComponentPublicInstance } from "vue";

const chart1Ref =
  useTemplateRef<ComponentPublicInstance<typeof Chart1>>("chart1");
const chart2Ref =
  useTemplateRef<ComponentPublicInstance<typeof Chart2>>("chart2");

const bigChartRef = useTemplateRef<HTMLElement>("bigChart");
const showBig = ref(false);

const handleShowBig = (type: "chart1" | "chart2") => {
  showBig.value = true;
  nextTick(() => {
    if (type === "chart1") {
      chart1Ref.value?.render(bigChartRef.value!);
    } else {
      chart2Ref.value?.render(bigChartRef.value!);
    }
  });
};
const handleClose = () => {
  bigChartRef.value!.innerHTML = "";
  showBig.value = false;
};
</script>

<template>
  <Chart1 ref="chart1" @show-big="handleShowBig" />
  <Chart2 ref="chart2" @show-big="handleShowBig" />
  <el-dialog
    v-model="showBig"
    @before-close="handleClose"
    title="Tips"
    width="500"
  >
    <div
      ref="bigChart"
      class="chart-wrap"
      style="width: 500px; height: 500px"
    ></div>
  </el-dialog>
</template>

<style scoped></style>
