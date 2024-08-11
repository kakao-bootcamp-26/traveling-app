// vite.config.ts
import { defineConfig, loadEnv } from "file:///Users/devlee/kakao-tech/travel-project/.yarn/__virtual__/vite-virtual-8cc3b1bc2f/0/cache/vite-npm-5.4.0-6fbda5653e-122de7795e.zip/node_modules/vite/dist/node/index.js";
import react from "file:///Users/devlee/kakao-tech/travel-project/.yarn/__virtual__/@vitejs-plugin-react-virtual-36f556f5cd/0/cache/@vitejs-plugin-react-npm-4.3.1-cbe92983ea-39a027fedd.zip/node_modules/@vitejs/plugin-react/dist/index.mjs";
import prerender from "file:///Users/devlee/kakao-tech/travel-project/.yarn/__virtual__/@prerenderer-rollup-plugin-virtual-519970eb43/0/cache/@prerenderer-rollup-plugin-npm-0.3.12-70a49f5bf8-5ea57a4d2f.zip/node_modules/@prerenderer/rollup-plugin/index.mjs";
import puppeteerRenderer from "file:///Users/devlee/kakao-tech/travel-project/.yarn/__virtual__/@prerenderer-renderer-puppeteer-virtual-dc81686c0a/0/cache/@prerenderer-renderer-puppeteer-npm-1.2.4-afb1a2c21f-d8a1be4862.zip/node_modules/@prerenderer/renderer-puppeteer/index.mjs";
import puppeteer from "file:///Users/devlee/kakao-tech/travel-project/.yarn/unplugged/puppeteer-npm-22.15.0-fa225bdb63/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js";
import svgr from "file:///Users/devlee/kakao-tech/travel-project/.yarn/__virtual__/vite-plugin-svgr-virtual-9ddf879f01/0/cache/vite-plugin-svgr-npm-4.2.0-e0c6a7a1f0-0a6400f209.zip/node_modules/vite-plugin-svgr/dist/index.js";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  (async () => {
    const browser = await puppeteer.launch({
      headless: true,
      // 브라우저가 백그라운드에서 실행되도록 설정
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();
    await page.goto("http://example.com");
    await page.content();
    console.log("\uC131\uACF5\uC801~!");
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
          renderAfterTime: 500
        },
        postProcess(renderedRoute) {
          renderedRoute.html = renderedRoute.html.replace(/http:/i, "https:").replace(/(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i, env.VITE_BASE_URL || "");
        }
      }),
      svgr({
        // exportAsDefault: true,
        svgrOptions: {
          icon: true
        }
      })
    ],
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["./src/tests/setup.ts"]
    },
    base: "/",
    build: {
      outDir: "dist",
      assetsDir: "assets"
    },
    resolve: {
      alias: [{ find: "@", replacement: "/src" }]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZGV2bGVlL2tha2FvLXRlY2gvdHJhdmVsLXByb2plY3QvZnJvbnRlbmQvcmVhY3QtYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZGV2bGVlL2tha2FvLXRlY2gvdHJhdmVsLXByb2plY3QvZnJvbnRlbmQvcmVhY3QtYXBwL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9kZXZsZWUva2FrYW8tdGVjaC90cmF2ZWwtcHJvamVjdC9mcm9udGVuZC9yZWFjdC1hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHByZXJlbmRlciBmcm9tIFwiQHByZXJlbmRlcmVyL3JvbGx1cC1wbHVnaW5cIjtcbmltcG9ydCBwdXBwZXRlZXJSZW5kZXJlciBmcm9tIFwiQHByZXJlbmRlcmVyL3JlbmRlcmVyLXB1cHBldGVlclwiO1xuaW1wb3J0IHB1cHBldGVlciBmcm9tIFwicHVwcGV0ZWVyXCI7XG5pbXBvcnQgc3ZnciBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnclwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksIFwiXCIpO1xuICAoYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGJyb3dzZXIgPSBhd2FpdCBwdXBwZXRlZXIubGF1bmNoKHtcbiAgICAgIGhlYWRsZXNzOiB0cnVlLCAvLyBcdUJFMENcdUI3N0NcdUM2QjBcdUM4MDBcdUFDMDAgXHVCQzMxXHVBREY4XHVCNzdDXHVDNkI0XHVCNERDXHVDNUQwXHVDMTFDIFx1QzJFNFx1RDU4OVx1QjQxOFx1QjNDNFx1Qjg1RCBcdUMxMjRcdUM4MTVcbiAgICAgIGFyZ3M6IFtcIi0tbm8tc2FuZGJveFwiLCBcIi0tZGlzYWJsZS1zZXR1aWQtc2FuZGJveFwiXSxcbiAgICB9KTtcbiAgICBjb25zdCBwYWdlID0gYXdhaXQgYnJvd3Nlci5uZXdQYWdlKCk7XG4gICAgYXdhaXQgcGFnZS5nb3RvKFwiaHR0cDovL2V4YW1wbGUuY29tXCIpO1xuICAgIC8vIGNvbnN0IGh0bWwgPSBhd2FpdCBwYWdlLmNvbnRlbnQoKTtcbiAgICBhd2FpdCBwYWdlLmNvbnRlbnQoKTtcbiAgICBjb25zb2xlLmxvZyhcIlx1QzEzMVx1QUNGNVx1QzgwMX4hXCIpO1xuICAgIGF3YWl0IGJyb3dzZXIuY2xvc2UoKTtcbiAgfSkoKTtcbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICByZWFjdCgpLFxuICAgICAgcHJlcmVuZGVyKHtcbiAgICAgICAgcm91dGVzOiBbXCIvXCJdLFxuICAgICAgICByZW5kZXJlcjogcHVwcGV0ZWVyUmVuZGVyZXIsXG4gICAgICAgIC8vIHNlcnZlcjoge1xuICAgICAgICAvLyAgIHBvcnQ6IE51bWJlcihlbnYuVklURV9TRVJWRVJfUE9SVCksXG4gICAgICAgIC8vICAgaG9zdDogZW52LlZJVEVfU0VSVkVSX0hPU1QsXG4gICAgICAgIC8vIH0sXG4gICAgICAgIHJlbmRlcmVyT3B0aW9uczoge1xuICAgICAgICAgIG1heENvbmN1cnJlbnRSb3V0ZXM6IDEsXG4gICAgICAgICAgcmVuZGVyQWZ0ZXJUaW1lOiA1MDAsXG4gICAgICAgIH0sXG4gICAgICAgIHBvc3RQcm9jZXNzKHJlbmRlcmVkUm91dGUpIHtcbiAgICAgICAgICByZW5kZXJlZFJvdXRlLmh0bWwgPSByZW5kZXJlZFJvdXRlLmh0bWxcbiAgICAgICAgICAgIC5yZXBsYWNlKC9odHRwOi9pLCBcImh0dHBzOlwiKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyhodHRwczpcXC9cXC8pPyhsb2NhbGhvc3R8MTI3XFwuMFxcLjBcXC4xKTpcXGQqL2ksIGVudi5WSVRFX0JBU0VfVVJMIHx8IFwiXCIpO1xuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICBzdmdyKHtcbiAgICAgICAgLy8gZXhwb3J0QXNEZWZhdWx0OiB0cnVlLFxuICAgICAgICBzdmdyT3B0aW9uczoge1xuICAgICAgICAgIGljb246IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICBdLFxuICAgIHRlc3Q6IHtcbiAgICAgIGVudmlyb25tZW50OiBcImpzZG9tXCIsXG4gICAgICBnbG9iYWxzOiB0cnVlLFxuICAgICAgc2V0dXBGaWxlczogW1wiLi9zcmMvdGVzdHMvc2V0dXAudHNcIl0sXG4gICAgfSxcbiAgICBiYXNlOiBcIi9cIixcbiAgICBidWlsZDoge1xuICAgICAgb3V0RGlyOiBcImRpc3RcIixcbiAgICAgIGFzc2V0c0RpcjogXCJhc3NldHNcIixcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiBbeyBmaW5kOiBcIkBcIiwgcmVwbGFjZW1lbnQ6IFwiL3NyY1wiIH1dLFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1csU0FBUyxjQUFjLGVBQWU7QUFDdFksT0FBTyxXQUFXO0FBQ2xCLE9BQU8sZUFBZTtBQUN0QixPQUFPLHVCQUF1QjtBQUM5QixPQUFPLGVBQWU7QUFDdEIsT0FBTyxVQUFVO0FBR2pCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUMzQyxHQUFDLFlBQVk7QUFDWCxVQUFNLFVBQVUsTUFBTSxVQUFVLE9BQU87QUFBQSxNQUNyQyxVQUFVO0FBQUE7QUFBQSxNQUNWLE1BQU0sQ0FBQyxnQkFBZ0IsMEJBQTBCO0FBQUEsSUFDbkQsQ0FBQztBQUNELFVBQU0sT0FBTyxNQUFNLFFBQVEsUUFBUTtBQUNuQyxVQUFNLEtBQUssS0FBSyxvQkFBb0I7QUFFcEMsVUFBTSxLQUFLLFFBQVE7QUFDbkIsWUFBUSxJQUFJLHNCQUFPO0FBQ25CLFVBQU0sUUFBUSxNQUFNO0FBQUEsRUFDdEIsR0FBRztBQUNILFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxRQUNSLFFBQVEsQ0FBQyxHQUFHO0FBQUEsUUFDWixVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUtWLGlCQUFpQjtBQUFBLFVBQ2YscUJBQXFCO0FBQUEsVUFDckIsaUJBQWlCO0FBQUEsUUFDbkI7QUFBQSxRQUNBLFlBQVksZUFBZTtBQUN6Qix3QkFBYyxPQUFPLGNBQWMsS0FDaEMsUUFBUSxVQUFVLFFBQVEsRUFDMUIsUUFBUSw4Q0FBOEMsSUFBSSxpQkFBaUIsRUFBRTtBQUFBLFFBQ2xGO0FBQUEsTUFDRixDQUFDO0FBQUEsTUFDRCxLQUFLO0FBQUE7QUFBQSxRQUVILGFBQWE7QUFBQSxVQUNYLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsTUFBTTtBQUFBLE1BQ0osYUFBYTtBQUFBLE1BQ2IsU0FBUztBQUFBLE1BQ1QsWUFBWSxDQUFDLHNCQUFzQjtBQUFBLElBQ3JDO0FBQUEsSUFDQSxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixXQUFXO0FBQUEsSUFDYjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTyxDQUFDLEVBQUUsTUFBTSxLQUFLLGFBQWEsT0FBTyxDQUFDO0FBQUEsSUFDNUM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
