import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/:trackingId",
    name: "tracking",
    component: () => import("../views/TrackingView.vue"),
  },
  {
    path: "/imprint",
    name: "imprint",
    component: () => import("../views/ImprintView.vue"),
  },
  {
    path: "/privacy",
    name: "privacy",
    component: () => import("../views/PrivacyView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
