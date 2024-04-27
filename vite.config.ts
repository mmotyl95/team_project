import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import basicSSL from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/#conditional-config
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),

      //Plugin for PWA usage
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: "auto",

        // Manifest JSON
        manifest: {
          name: "SG Bussin",
          short_name: "Bussin",
          description: "Bussin Bus Arrival App",
          start_url: "/SG-Bussin/",
          theme_color: '#ffffff',
          display:'standalone',
          // Smaller icon as launcher icon, larger icon for app switch.
          icons: [
          // One full stop to reference a file in the same directory. Two full stop if we reference a file from the parent directory
            {
              src: "./assets/icons/bus-192.png",
              type: 'image/png',
              sizes: '192x192',
              purpose: 'maskable'
            },
          ],
        },
      }),

      // Enable https by default
      // https://vitejs.dev/config/server-options.html#server-https
      // https://vitejs.dev/guide/migration.html#automatic-https-certificate-generation
      basicSSL(),
    ],

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },

    // When deploying to Github pages, the base URL will be your repo's name,
    // Thus the production base URL must be changed here for it to work when deployed.
    // Ref: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#next-steps
    base: mode === "github-pages" ? "/SG-Bussin/" : "/",
  };
});
