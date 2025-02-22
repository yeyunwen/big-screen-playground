import { onBeforeUnmount, onMounted, Ref } from "vue";
import echarts, { ECOption } from ".";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";

interface HookOption {
  renderer: "canvas" | "svg";
}

const defaultOption: HookOption = {
  renderer: "canvas",
};

export const useEchart = (
  chartRef: Ref<HTMLElement | null>,
  hookOption?: HookOption
) => {
  const { renderer } = Object.assign(defaultOption, hookOption);
  echarts.use(renderer === "canvas" ? CanvasRenderer : SVGRenderer);

  let chartInstance: echarts.ECharts | null = null;
  let inputOption: ECOption | null = null;

  const initChart = () => {
    chartInstance = echarts.init(chartRef.value);
  };

  const setOption = (option: ECOption) => {
    if (!chartInstance) {
      throw new Error("chartInstance is not initialized");
    }
    inputOption = option;
    console.log("option", option);
    showLoading();
    chartInstance.setOption(option);
    hideLoading();
  };

  const getInputOption = () => {
    return inputOption;
  };

  const showLoading = () => {
    chartInstance?.showLoading();
  };

  const hideLoading = () => {
    chartInstance?.hideLoading();
  };

  const handleResize = () => {
    chartInstance?.resize();
  };

  onMounted(() => {
    window.addEventListener("resize", handleResize);
  });

  onBeforeUnmount(() => {
    chartInstance?.dispose();
    window.removeEventListener("resize", handleResize);
  });

  return {
    chartInstance,
    initChart,
    setOption,
    getInputOption,
    showLoading,
    hideLoading,
  };
};
