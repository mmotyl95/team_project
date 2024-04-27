// Load bulma & font awesome styles in the main entry point before all else
import "bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

createApp(App)
  .use(createPinia().use(piniaPluginPersistedstate))
  .use(router)
  .mount("#app");
