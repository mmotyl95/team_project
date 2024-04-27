import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Timing from "../views/Timing.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/Timing",
      name: "Timing",
      component: Timing,
    },
  ],
});

export default router;
