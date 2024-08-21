/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        coral: "#eb9980",
        mint: "#5CFFD1",
        "mint-dark": "#92B8B1",
        "dark-blue": "rgb(27, 29, 43)",
        "dark-blue-2": "rgb(37, 40, 62)",
        "dark-grey": "rgb(48, 51, 73)",
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
