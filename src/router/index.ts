import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/index/index.vue"),
  },
  {
    path: "/teleport",
    component: () => import("@/views/teleport/index.vue"),
  },
  {
    path: "/option",
    component: () => import("@/views/option/index.vue"),
  },
  {
    path: "/use",
    component: () => import("@/views/use/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
