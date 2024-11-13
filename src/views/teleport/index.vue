<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import Chart1 from "./components/Chart1/index.vue";
import Chart2 from "./components/Chart2/index.vue";

const bigChartRef = useTemplateRef<HTMLElement>("bigChart");
const showBig = ref(false);

const handleShowBig = (type: "chart1" | "chart2") => {
  showBig.value = true;
};
const handleClose = () => {
  bigChartRef.value!.innerHTML = "";
  showBig.value = false;
};
</script>

<template>
  <Chart1 @show-big="handleShowBig" />
  <Chart2 @show-big="handleShowBig" />
  <el-dialog
    v-model="showBig"
    @before-close="handleClose"
    title="Tips"
    width="500"
  >
    <div
      ref="bigChart"
      id="dialog-char"
      style="width: 500px; height: 500px"
    ></div>
  </el-dialog>
</template>

<style scoped></style>
