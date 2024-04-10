import { defineConfig } from "vite";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
dotenv.config();
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
});
