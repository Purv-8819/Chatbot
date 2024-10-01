/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        bounceDelay: {
          "0%, 100%": { transform: "translateY(-0.15em) scale(1)" },
          "50%": { transform: "translateY(-0.35em) scale(1.5) " },
        },
      },
      animation: {
        "bounce-1": "bounceDelay 1s infinite",
        "bounce-2": "bounceDelay 1s infinite 0.2s",
        "bounce-3": "bounceDelay 1s infinite 0.4s",
      },
    },
  },
  plugins: [],
};
