// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/programing/ASP.NET/%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D9%85%D8%B1%D9%83%D8%A8%D8%AA%D9%8A/markabtiVuejs/markabatiVuejs/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/programing/ASP.NET/%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D9%85%D8%B1%D9%83%D8%A8%D8%AA%D9%8A/markabtiVuejs/markabatiVuejs/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/programing/ASP.NET/%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D9%85%D8%B1%D9%83%D8%A8%D8%AA%D9%8A/markabtiVuejs/markabatiVuejs/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ["vue", "vue-router", "vuex", "vue-i18n"],
          ui: ["element-plus", "mosha-vue-toastify", "fslightbox-vue"],
          media: ["@photo-sphere-viewer/core", "cropperjs"],
          utils: ["axios", "lodash", "lodash-es", "date-fns"]
        }
      }
    },
    chunkSizeWarningLimit: 800
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9ncmFtaW5nXFxcXEFTUC5ORVRcXFxcXHUwNjQ1XHUwNjM0XHUwNjMxXHUwNjQ4XHUwNjM5IFx1MDY0NVx1MDYzMVx1MDY0M1x1MDYyOFx1MDYyQVx1MDY0QVxcXFxtYXJrYWJ0aVZ1ZWpzXFxcXG1hcmthYmF0aVZ1ZWpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwcm9ncmFtaW5nXFxcXEFTUC5ORVRcXFxcXHUwNjQ1XHUwNjM0XHUwNjMxXHUwNjQ4XHUwNjM5IFx1MDY0NVx1MDYzMVx1MDY0M1x1MDYyOFx1MDYyQVx1MDY0QVxcXFxtYXJrYWJ0aVZ1ZWpzXFxcXG1hcmthYmF0aVZ1ZWpzXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcm9ncmFtaW5nL0FTUC5ORVQvJUQ5JTg1JUQ4JUI0JUQ4JUIxJUQ5JTg4JUQ4JUI5JTIwJUQ5JTg1JUQ4JUIxJUQ5JTgzJUQ4JUE4JUQ4JUFBJUQ5JThBL21hcmthYnRpVnVlanMvbWFya2FiYXRpVnVlanMvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcclxuXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgXHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XHJcbiAgICAgICAgICB2dWU6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAndnVleCcsICd2dWUtaTE4biddLFxyXG4gICAgICAgICAgdWk6IFsnZWxlbWVudC1wbHVzJywgJ21vc2hhLXZ1ZS10b2FzdGlmeScsICdmc2xpZ2h0Ym94LXZ1ZSddLFxyXG4gICAgICAgICAgbWVkaWE6IFsnQHBob3RvLXNwaGVyZS12aWV3ZXIvY29yZScsICdjcm9wcGVyanMnXSxcclxuICAgICAgICAgIHV0aWxzOiBbJ2F4aW9zJywgJ2xvZGFzaCcsICdsb2Rhc2gtZXMnLCAnZGF0ZS1mbnMnXVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogODAwXHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9iLFNBQVMsZUFBZSxXQUFXO0FBRXZkLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUhpTyxJQUFNLDJDQUEyQztBQU1sUyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUUxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsRUFDTjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLEtBQUssQ0FBQyxPQUFPLGNBQWMsUUFBUSxVQUFVO0FBQUEsVUFDN0MsSUFBSSxDQUFDLGdCQUFnQixzQkFBc0IsZ0JBQWdCO0FBQUEsVUFDM0QsT0FBTyxDQUFDLDZCQUE2QixXQUFXO0FBQUEsVUFDaEQsT0FBTyxDQUFDLFNBQVMsVUFBVSxhQUFhLFVBQVU7QUFBQSxRQUNwRDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxFQUN6QjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
