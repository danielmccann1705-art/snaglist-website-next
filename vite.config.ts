import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { releaseIndexable } from "./scripts/routing.mjs";

export default defineConfig({
  define: {
    __PUBLIC_INDEXABLE__: JSON.stringify(releaseIndexable(process.env)),
  },
  plugins: [tailwindcss(), reactRouter()],
  server: { host: "0.0.0.0", port: 5173 },
});
