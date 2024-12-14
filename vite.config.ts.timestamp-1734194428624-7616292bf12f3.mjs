// vite.config.ts
import { defineConfig } from "file:///E:/Projects/swiftpanel/node_modules/.pnpm/vite@5.4.11_@types+node@22.10.1/node_modules/vite/dist/node/index.js";
import { getDirname } from "file:///E:/Projects/swiftpanel/node_modules/.pnpm/@adonisjs+core@6.15.2_@adonisjs+assembler@7.8.2_typescript@5.7.2__@vinejs+vine@2.1.0_edge.js@6.2.0/node_modules/@adonisjs/core/build/src/helpers/main.js";
import inertia from "file:///E:/Projects/swiftpanel/node_modules/.pnpm/@adonisjs+inertia@1.2.4_@adonisjs+core@6.15.2_@adonisjs+assembler@7.8.2_typescript@5.7.2__@vi_ljzyq2n4x5i65ynuku4yx7wdrm/node_modules/@adonisjs/inertia/build/src/plugins/vite.js";
import react from "file:///E:/Projects/swiftpanel/node_modules/.pnpm/@vitejs+plugin-react@4.3.4_vite@5.4.11_@types+node@22.10.1_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import adonisjs from "file:///E:/Projects/swiftpanel/node_modules/.pnpm/@adonisjs+vite@3.0.0_@adonisjs+core@6.15.2_@adonisjs+assembler@7.8.2_typescript@5.7.2__@vinej_iudbzb5sb2fn3kqrnkzeqvhbrq/node_modules/@adonisjs/vite/build/src/client/main.js";
var __vite_injected_original_import_meta_url = "file:///E:/Projects/swiftpanel/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    inertia({ ssr: { enabled: false } }),
    react(),
    adonisjs({
      entrypoints: ["resources/scripts/app/app.tsx"],
      reload: ["resources/views/**/*.edge"]
    })
  ],
  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      "~/": `${getDirname(__vite_injected_original_import_meta_url)}/resources/scripts/`
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxQcm9qZWN0c1xcXFxzd2lmdHBhbmVsXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxQcm9qZWN0c1xcXFxzd2lmdHBhbmVsXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9Qcm9qZWN0cy9zd2lmdHBhbmVsL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IGdldERpcm5hbWUgfSBmcm9tICdAYWRvbmlzanMvY29yZS9oZWxwZXJzJ1xuaW1wb3J0IGluZXJ0aWEgZnJvbSAnQGFkb25pc2pzL2luZXJ0aWEvY2xpZW50J1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IGFkb25pc2pzIGZyb20gJ0BhZG9uaXNqcy92aXRlL2NsaWVudCdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIGluZXJ0aWEoeyBzc3I6IHsgZW5hYmxlZDogZmFsc2UgfSB9KSxcbiAgICByZWFjdCgpLFxuICAgIGFkb25pc2pzKHtcbiAgICAgIGVudHJ5cG9pbnRzOiBbJ3Jlc291cmNlcy9zY3JpcHRzL2FwcC9hcHAudHN4J10sXG4gICAgICByZWxvYWQ6IFsncmVzb3VyY2VzL3ZpZXdzLyoqLyouZWRnZSddLFxuICAgIH0pLFxuICBdLFxuXG4gIC8qKlxuICAgKiBEZWZpbmUgYWxpYXNlcyBmb3IgaW1wb3J0aW5nIG1vZHVsZXMgZnJvbVxuICAgKiB5b3VyIGZyb250ZW5kIGNvZGVcbiAgICovXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ34vJzogYCR7Z2V0RGlybmFtZShpbXBvcnQubWV0YS51cmwpfS9yZXNvdXJjZXMvc2NyaXB0cy9gLFxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwUCxTQUFTLG9CQUFvQjtBQUN2UixTQUFTLGtCQUFrQjtBQUMzQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sY0FBYztBQUpvSSxJQUFNLDJDQUEyQztBQU0xTSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxRQUFRLEVBQUUsS0FBSyxFQUFFLFNBQVMsTUFBTSxFQUFFLENBQUM7QUFBQSxJQUNuQyxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsTUFDUCxhQUFhLENBQUMsK0JBQStCO0FBQUEsTUFDN0MsUUFBUSxDQUFDLDJCQUEyQjtBQUFBLElBQ3RDLENBQUM7QUFBQSxFQUNIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQU1BLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLE1BQU0sR0FBRyxXQUFXLHdDQUFlLENBQUM7QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
