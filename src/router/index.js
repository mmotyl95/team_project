import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Timing from "../views/Timing.vue";
import Search from "../views/Search.vue";
import busRoute from "../views/busRoute.vue";
import busDirectionRoutes from "../views/busDirectionRoutes.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/timing/:busStopID/:busStopName",
      name: "Timing",
      component: Timing,
      props: true,
    },
    {
      path: "/search",
      name: "Search",
      component: Search,
    },
    {
      path: "/busroute/:busNumber/:busStopID",
      name: "busRoute",
      component: busRoute,
      props: true,
    },
    {
      path: "/busroute/:busNumber",
      name: "direction",
      component: busDirectionRoutes,
      props: true,
    },
  ],
});

export default router;
