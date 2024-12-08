import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        //   target: "http://localhost:5000", // Backend server URL
        target: "https://video-mgt-app.vercel.app/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Removes '/api' prefix from the request
      },
    },
  },
});
