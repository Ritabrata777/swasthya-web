import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          light: "rgba(255, 255, 255, 0.05)",
          medium: "rgba(255, 255, 255, 0.15)",
          heavy: "rgba(255, 255, 255, 0.25)",
          border: "rgba(255, 255, 255, 0.15)",
        },
        medical: {
          ecg: "#FF3B30",
          spo2: "#32ADE6",
          gsr: "#FF9500",
          safe: "#34C759",
          darkBg: "#0f1014",
        },
      },
      backgroundImage: {
        "mesh-gradient":
          "radial-gradient(at 0% 0%, #1c1c1e 0px, transparent 50%), radial-gradient(at 100% 0%, #0a2440 0px, transparent 50%), radial-gradient(at 100% 100%, #1c1c1e 0px, transparent 50%), radial-gradient(at 0% 100%, #0f2027 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};
export default config;