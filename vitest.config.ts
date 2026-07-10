import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

/**
 * Test config for the component test harness. Named `vitest.config.ts` (not
 * `vite.config.ts`) so Storybook's own Vite pipeline does not inherit it.
 */
export default defineConfig({
  plugins: [react()],
  // Ensure plain .jsx files (icons.jsx, ui.jsx) use the automatic JSX runtime
  // rather than esbuild's classic transform, which would need a React global.
  esbuild: { jsx: "automatic" },
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    css: false,
  },
});
