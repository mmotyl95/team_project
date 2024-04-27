import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Timing from "../views/Timing.vue";
import Search from "../views/Search.vue";

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
    {
      path: "/Search",
      name: "Search",
      component: Search,
    },
  ],
});

export default router;
