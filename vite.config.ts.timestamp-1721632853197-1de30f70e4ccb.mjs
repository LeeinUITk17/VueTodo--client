// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///F:/VueTodoSource/client/VueTodo--client/node_modules/vite/dist/node/index.js";
import vue from "file:///F:/VueTodoSource/client/VueTodo--client/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///F:/VueTodoSource/client/VueTodo--client/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueDevTools from "file:///F:/VueTodoSource/client/VueTodo--client/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "F:\\VueTodoSource\\client\\VueTodo--client";
var __vite_injected_original_import_meta_url = "file:///F:/VueTodoSource/client/VueTodo--client/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__vite_injected_original_dirname, "index.html"),
        background: resolve(__vite_injected_original_dirname, "src/background/index.ts"),
        content: resolve(__vite_injected_original_dirname, "src/content/index.ts")
      },
      output: {
        entryFileNames: "src/[name].js",
        chunkFileNames: "src/[name].js",
        assetFileNames: "assets/[name].[ext]"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxWdWVUb2RvU291cmNlXFxcXGNsaWVudFxcXFxWdWVUb2RvLS1jbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXFZ1ZVRvZG9Tb3VyY2VcXFxcY2xpZW50XFxcXFZ1ZVRvZG8tLWNsaWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovVnVlVG9kb1NvdXJjZS9jbGllbnQvVnVlVG9kby0tY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXHJcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbdnVlKCksIHZ1ZUpzeCgpLCB2dWVEZXZUb29scygpXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgaW5wdXQ6IHtcclxuICAgICAgICBwb3B1cDogcmVzb2x2ZShfX2Rpcm5hbWUsICdpbmRleC5odG1sJyksXHJcbiAgICAgICAgYmFja2dyb3VuZDogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvYmFja2dyb3VuZC9pbmRleC50cycpLCBcclxuICAgICAgY29udGVudDogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29udGVudC9pbmRleC50cycpLCBcclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnc3JjL1tuYW1lXS5qcycsXHJcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdzcmMvW25hbWVdLmpzJyxcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0uW2V4dF0nXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErUyxTQUFTLGVBQWUsV0FBVztBQUNsVixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8saUJBQWlCO0FBQ3hCLFNBQVMsZUFBZTtBQUx4QixJQUFNLG1DQUFtQztBQUFvSixJQUFNLDJDQUEyQztBQU85TyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsSUFBSSxHQUFHLE9BQU8sR0FBRyxZQUFZLENBQUM7QUFBQSxFQUN4QyxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsT0FBTyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxRQUN0QyxZQUFZLFFBQVEsa0NBQVcseUJBQXlCO0FBQUEsUUFDMUQsU0FBUyxRQUFRLGtDQUFXLHNCQUFzQjtBQUFBLE1BRWxEO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
