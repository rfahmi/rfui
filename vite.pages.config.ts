import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  root: "demo",
  base: "/rfui/",
  build: {
    outDir: "../dist-demo",
    emptyOutDir: true,
  },
});
