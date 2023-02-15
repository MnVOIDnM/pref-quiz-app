import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/__/auth/handler": {
        target: "https://pref-quiz-app-dce04.firebaseapp.com",
      },
    },
  },
});
