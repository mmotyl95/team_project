import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Timing from "../views/Timing.vue";
import Search from "../views/Search.vue";
import busRoute from "../views/busRoute.vue";
import busDirectionRoutes from "../views/busDirectionRoutes.vue";

const router = createRouter({
  /**
   * the error shows up because my "module" option is set to ES6 which does
   * not support the import.meta method, if I want the red squiggly lines to
   * disappear, I need to set the module to a ES version which supports this
   * method. I will change to es2020 for now.
   *
   * The second error underlines the env which says
   * "Property 'env' does not exist on type 'ImportMeta'."
   * Fix this issue by creating a env.d.ts file and adding
   * "env.d.ts" in the include property in tsconfig.json, this issue
   * should not appear again because I copy this from a fresh proj but
   * with typescript support. Commenting for reference.
   */
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // Convert to use import() to reduce size
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
      path: "/busroute/:busNumber/:busRoute",
      name: "direction",
      component: busDirectionRoutes,
      props: true,
    },
  ],
});

export default router;
