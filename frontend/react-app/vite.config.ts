import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          icon: true,
        },
      }),
      // prerender({
      //   routes: ["/"],
      //   rendererOptions: {
      //     maxConcurrentRoutes: 1,
      //     renderAfterTime: 500,
      //     headless: true,
      //     renderAfterDocumentEvent: 'render-event',
      //     args: ["--no-sandbox", "--disable-setuid-sandbox"],
      //     protocolTimeout: 60000,
      //   },
      //   postProcess(renderedRoute) {
      //     renderedRoute.html = renderedRoute.html
      //       .replace(/http:/i, "https:")
      //       .replace(/(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i, env.VITE_BASE_URL || "");
      //   },
      // }),
    ],
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["./src/tests/setup.ts"],
    },
    base: "/",
    build: {
      outDir: "dist",
      assetsDir: "assets",
    },
    resolve: {
      alias: [{ find: "@", replacement: "/src" }],
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
      // host: "0.0.0.0",
      // port: 5173,
    },
  };
});
