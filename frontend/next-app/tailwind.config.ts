import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)"],
        notoSansKr: ["var(--font-notoSansKr)"],
      },
      colors: {
        primary: "#00CCAA",
      },
    },
  },
  plugins: [],
};
export default config;
