import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
});

// jsdom does not compute layout, so offsetWidth/offsetHeight are always 0.
// Several components filter focusable elements by visibility; report a positive
// size so those filters behave as they would in a real browser.
Object.defineProperties(globalThis.HTMLElement.prototype, {
  offsetWidth: { configurable: true, get: () => 1 },
  offsetHeight: { configurable: true, get: () => 1 },
});
