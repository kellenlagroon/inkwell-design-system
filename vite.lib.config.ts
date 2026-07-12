import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

/**
 * Library build for the Inkwell package. Run via `npm run build`.
 * Named `vite.lib.config.ts` (not `vite.config.ts`) so Storybook's own Vite
 * pipeline does not inherit these library-mode settings.
 */
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      include: ["src/index.ts", "src/components"],
      exclude: ["src/**/*.stories.*", "src/**/*.mdx", "src/**/*.test.*"],
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: () => "index.js",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
    outDir: "dist",
    sourcemap: true,
    emptyOutDir: true,
  },
});
