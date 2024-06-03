const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        code: ["JetBrainsMonoNL"],
      },
      colors: {
        primario: "#4b0082",
        secundario: "#96f6e0",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
