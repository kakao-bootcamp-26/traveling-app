/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        coral: "#eb9980",
        mint: "#5CFFD1",
        "mint-dark": "#92B8B1",
      },
      fontFamily: {
        pretendard: ["Pretendard"],
        "pretendard-regular": ["Pretendard-Regular"],
        MangoDdobaki: ["MangoDdobak-B"],
      },
    },
  },
  plugins: [],
};
