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
        primario: "#333333",
        secundario: "#22d0c9",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
