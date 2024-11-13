import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./stores";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

createApp(App).use(store).use(ElementPlus).use(router).mount("#app");
