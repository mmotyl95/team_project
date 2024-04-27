import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    //Plugin for PWA usage
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",

      // Manifest JSON
      manifest: {
        name: "shelbus schedule",
        short_name: "shelbus",
        descripion: "Simple bus schedule app",
        start_url: "/",
        icons: [
          {
            src: "../assets/icons/bus.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
