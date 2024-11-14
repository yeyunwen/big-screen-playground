import { ECOption } from "@/echarts";
import { defineStore } from "pinia";
import { ref } from "vue";

interface ChartData {
  option: ECOption | null;
  title: string;
}

export const useAppStore = defineStore("app", () => {
  const chartData = ref<ChartData>({
    option: null,
    title: "",
  });

  const setChartData = (payload: ChartData) => {
    chartData.value = payload;
  };

  return {
    chartData,
    setChartData,
  };
});
