/// <reference types="vitest" />
/// <reference types="vite/client" />

import { loadEnvConfig } from "@next/env";
import react from "@vitejs/plugin-react";
// import AutoImport from "unplugin-auto-import/vite";

import { defineConfig } from "vite";
// import svgr from "vite-plugin-svgr";
import path from "path";

loadEnvConfig(process.cwd());

export default defineConfig({
  plugins: [
    react(),
    // AutoImport({
    //   imports: ['vitest'],
    //   dts: true, // generate TypeScript declaration
    // }),

    // svgr({ include: "**/*.svg" })
  ], // svgr 파일 사용을 위한 세팅
  // test를 위한 세팅
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"], // 설치 파일의 경로, 각 테스트 파일 전에 실행
    include: ["**/*.test.+(ts|tsx|js)"],
  },
  // 별칭 설정
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
