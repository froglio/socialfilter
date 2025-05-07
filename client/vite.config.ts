import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/generate-filters": "http://localhost:3000",
      "/scrape": "http://localhost:3000",
    },
  },
});
