import { shadcnPlugin } from "./src/styles/shadcn-plugin";
import { type Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["src/**/*.{ts,tsx}"],
  theme: {},
  plugins: [shadcnPlugin, require("tailwindcss-animate")],
} satisfies Config;
