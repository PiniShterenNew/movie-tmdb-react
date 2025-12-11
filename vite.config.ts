import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  // @ts-expect-error - Plugin type compatibility between vite and vitest
  plugins: [react(), visualizer({
    filename: "dist/bundle-analysis.html",
    template: "treemap",
    gzipSize: true,
    brotliSize: true,
    open: true,
  })],
  base: "/",
  build: {
    outDir: "dist",
    cssCodeSplit: false,
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        sourcemapFileNames: 'assets/[name]-[hash].js.map',
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
  },
});
