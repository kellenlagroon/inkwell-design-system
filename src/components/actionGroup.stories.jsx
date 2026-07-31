import { ActionGroup, Inline } from "./layout";
import { Button } from "./ui";

const VIEWPORTS = {
  narrow: { name: "Narrow (420px)", styles: { width: "420px", height: "700px" }, type: "mobile" },
  wide: { name: "Wide (900px)", styles: { width: "900px", height: "700px" }, type: "desktop" },
};

export default {
  title: "Layout/ActionGroup",
  parameters: {
    layout: "fullscreen",
    viewport: { options: VIEWPORTS },
  },
};

const Frame = ({ label, children }) => (
  <div style={{ display: "grid", gap: "var(--space-2)" }}>
    <p
      style={{
        margin: 0,
        fontSize: "0.72rem",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--color-text-secondary)",
      }}
    >
      {label}
    </p>
    <div
      style={{
        padding: "var(--space-4)",
        border: "1px dashed var(--color-border-default)",
        borderRadius: "var(--radius-sharp)",
        background: "var(--color-surface-raised)",
      }}
    >
      {children}
    </div>
  </div>
);

const Note = ({ children }) => (
  <p style={{ margin: 0, maxWidth: "62ch", color: "var(--color-text-secondary)", fontSize: "0.84rem", lineHeight: 1.55 }}>
    {children}
  </p>
);

const Pair = ({ wrapped }) => {
  const buttons = (
    <>
      <Button variant="secondary">Cancel</Button>
      <Button>Save changes</Button>
    </>
  );
  const wrappedButtons = (
    <>
      <span>
        <Button variant="secondary">Cancel</Button>
      </span>
      <span>
        <Button>Save changes</Button>
      </span>
    </>
  );
  const content = wrapped ? wrappedButtons : buttons;
  const suffix = wrapped ? "buttons wrapped in a span" : "buttons as direct children";
  return (
    <>
      <Frame label={`ActionGroup — ${suffix}`}>
        <ActionGroup>{content}</ActionGroup>
      </Frame>
      <Frame label={`Inline stackBelow="sm" — ${suffix}`}>
        <Inline stackBelow="sm">{content}</Inline>
      </Frame>
    </>
  );
};

/**
 * Opens at 420px, below the `sm` breakpoint, so the stacked behaviour is visible
 * immediately. Switch the viewport to "Wide (900px)" to confirm all four rows are
 * identical above the breakpoint.
 */
export const ComparedWithInline = {
  name: "Compared with Inline",
  globals: { viewport: { value: "narrow", isRotated: false } },
  render: () => (
    <div style={{ padding: "var(--space-5)", display: "grid", gap: "var(--space-5)" }}>
      <Note>
        Both components stack below 480px. The first pair is identical — stacking
        already stretches direct children, so ActionGroup&apos;s extra rule changes
        nothing.
      </Note>
      <Pair />
      <Note>
        The second pair is the entire difference: when a button sits inside another
        element, ActionGroup still forces it to full width and Inline leaves it at
        its natural width.
      </Note>
      <Pair wrapped />
    </div>
  ),
};

/** The one option Inline does not offer: opting out of stacking entirely. */
export const StackBelowOptions = {
  name: "stackBelow options",
  globals: { viewport: { value: "narrow", isRotated: false } },
  render: () => (
    <div style={{ padding: "var(--space-5)", display: "grid", gap: "var(--space-5)" }}>
      <Note>
        <code>stackBelow</code> picks the breakpoint, or <code>&quot;never&quot;</code> to stay
        horizontal at every width. <code>Inline</code> has no equivalent of{" "}
        <code>&quot;never&quot;</code>.
      </Note>
      {["sm", "md", "never"].map((value) => (
        <Frame key={value} label={`stackBelow="${value}"`}>
          <ActionGroup stackBelow={value}>
            <Button variant="secondary">Cancel</Button>
            <Button>Save changes</Button>
          </ActionGroup>
        </Frame>
      ))}
    </div>
  ),
};
