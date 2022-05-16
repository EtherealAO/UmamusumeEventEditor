import { fileURLToPath, URL } from "url";

import UglifyJsPlugin = require('uglifyjs-webpack-plugin');
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
