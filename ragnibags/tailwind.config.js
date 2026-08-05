/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: "#2B1B12",
        saddle: "#8B5A2B",
        brass: "#C9A227",
        canvas: "#EAE3D3",
        ink: "#1C1410",
        rust: "#B34324",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-worksans)", "sans-serif"],
        tag: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        tag: "3px 4px 0 rgba(43,27,18,0.25)",
      },
    },
  },
  plugins: [],
};
