import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import prerender from "@prerenderer/rollup-plugin";
import puppeteerRenderer from "@prerenderer/renderer-puppeteer";
import puppeteer from "puppeteer";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  (async () => {
    const browser = await puppeteer.launch({
      headless: true, // 브라우저가 백그라운드에서 실행되도록 설정
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("http://example.com");
    // const html = await page.content();
    await page.content();
    console.log("성공적~!");
    await browser.close();
  })();
  return {
    plugins: [
      react(),
      prerender({
        routes: ["/"],
        renderer: puppeteerRenderer,
        // server: {
        //   port: Number(env.VITE_SERVER_PORT),
        //   host: env.VITE_SERVER_HOST,
        // },
        rendererOptions: {
          maxConcurrentRoutes: 1,
          renderAfterTime: 500,
        },
        postProcess(renderedRoute) {
          renderedRoute.html = renderedRoute.html
            .replace(/http:/i, "https:")
            .replace(/(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i, env.VITE_BASE_URL || "");
        },
      }),
      svgr({
        // exportAsDefault: true,
        svgrOptions: {
          icon: true,
        },
      }),
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
  };
});
