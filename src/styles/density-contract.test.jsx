import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(resolve(process.cwd(), "src/styles/inkwell.css"), "utf8");

describe("control density stylesheet contract", () => {
  it("keeps the default checkbox row at md density", () => {
    expect(css).toContain(".checkbox { min-height: var(--control-md-height); }");
    expect(css).not.toContain(".checkbox { min-height: 44px; }");
    expect(css).toContain(".checkbox-select-option .checkbox {\n  display: flex;\n  width: 100%;\n  min-height: var(--control-md-height);");
  });

  it("places Select control density after the control-variant defaults", () => {
    const controlDefaults = css.indexOf(".cselect--control .cselect-trigger {");
    const compact = css.indexOf(".cselect--control .cselect-trigger.ink-control-density--compact");
    const comfortable = css.indexOf(".cselect--control .cselect-trigger.ink-control-density--comfortable");
    expect(controlDefaults).toBeGreaterThanOrEqual(0);
    expect(compact).toBeGreaterThan(controlDefaults);
    expect(comfortable).toBeGreaterThan(compact);
    expect(css).toContain(".cselect-trigger.ink-control-density--compact .cselect-chevron { width: var(--control-compact-icon-size); height: var(--control-compact-icon-size); }");
    expect(css).toContain(".cselect-trigger.ink-control-density--comfortable .cselect-chevron { width: var(--control-comfortable-icon-size); height: var(--control-comfortable-icon-size); }");
  });

  it("applies the complete density metric set to shared control families", () => {
    for (const [density, token] of [["compact", "compact"], ["comfortable", "comfortable"]]) {
      expect(css).toContain(`.ink-control-trigger.ink-control-density--${density} { min-height: var(--control-${token}-height); padding: var(--control-${token}-padding-block) var(--control-${token}-padding-inline); gap: var(--control-${token}-content-gap); font-size: var(--control-${token}-font-size); font-weight: var(--control-${token}-font-weight); }`);
      expect(css).toContain(`.split-button-chevron.ink-control-density--${density} svg { width: var(--control-${token}-icon-size); height: var(--control-${token}-icon-size); }`);
      expect(css).toContain(`--ink-tabs-tab-font-size: var(--control-${token}-font-size);`);
      expect(css).toContain(`font-weight: var(--control-${token}-font-weight);`);
    }
  });
});
