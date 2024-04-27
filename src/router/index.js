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
      path: "/Timing/:busStopID/:busStopName",
      name: "Timing",
      component: Timing,
      props: true,
    },
    {
      path: "/Search",
      name: "Search",
      component: Search,
    },
  ],
});

export default router;
