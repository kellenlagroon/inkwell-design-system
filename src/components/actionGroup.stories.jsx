import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ActionGroup, Inline } from "./layout";
import { Button } from "./ui";

export default {
  title: "Layout/ActionGroup",
  parameters: { layout: "fullscreen" },
};

/**
 * Renders children inside a real iframe of a fixed width.
 *
 * ActionGroup's stacking is driven by a viewport media query, so a narrow *div*
 * on a wide screen would not stack. An iframe gives the content its own viewport,
 * which lets both widths sit side by side on one page — no viewport toolbar
 * needed, and nothing locked.
 */
function Viewport({ width, height = 150, children }) {
  const frameRef = useRef(null);
  const [body, setBody] = useState(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;

    const sync = () => {
      const doc = frame.contentDocument;
      if (!doc) return;
      doc.head.innerHTML = "";
      // Copy the preview's stylesheets so tokens and component CSS apply inside.
      document.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => {
        doc.head.appendChild(node.cloneNode(true));
      });
      doc.documentElement.dataset.theme = document.documentElement.dataset.theme || "dark";
      doc.body.style.margin = "0";
      doc.body.className = "inkwell-page";
      setBody(doc.body);
    };

    sync();
    frame.addEventListener("load", sync);
    // Keep the iframe in step with the theme toolbar and with Vite HMR style updates.
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    observer.observe(document.head, { childList: true });
    return () => {
      frame.removeEventListener("load", sync);
      observer.disconnect();
    };
  }, []);

  return (
    <iframe
      ref={frameRef}
      title={`${width}px viewport`}
      style={{
        width,
        height,
        border: "1px dashed var(--color-border-default)",
        borderRadius: "var(--radius-sharp)",
        background: "var(--color-surface-raised)",
        display: "block",
      }}
    >
      {body ? createPortal(<div style={{ padding: 16 }}>{children}</div>, body) : null}
    </iframe>
  );
}

const Label = ({ children }) => (
  <p
    style={{
      margin: 0,
      fontSize: "0.72rem",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "var(--color-text-secondary)",
    }}
  >
    {children}
  </p>
);

const Note = ({ children }) => (
  <p style={{ margin: 0, maxWidth: "64ch", color: "var(--color-text-secondary)", fontSize: "0.84rem", lineHeight: 1.55 }}>
    {children}
  </p>
);

const Actions = ({ Component, wrapped }) =>
  wrapped ? (
    <Component>
      <span>
        <Button variant="secondary">Cancel</Button>
      </span>
      <span>
        <Button>Save changes</Button>
      </span>
    </Component>
  ) : (
    <Component>
      <Button variant="secondary">Cancel</Button>
      <Button>Save changes</Button>
    </Component>
  );

/** Both components at 420px (stacked) and 900px (inline), side by side. */
function Row({ title, wrapped }) {
  return (
    <div style={{ display: "grid", gap: "var(--space-3)" }}>
      <Label>{title}</Label>
      <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ display: "grid", gap: "var(--space-2)" }}>
          <Label>ActionGroup · 420px</Label>
          <Viewport width={420}>
            <Actions Component={ActionGroup} wrapped={wrapped} />
          </Viewport>
        </div>
        <div style={{ display: "grid", gap: "var(--space-2)" }}>
          <Label>Inline stackBelow=&quot;sm&quot; · 420px</Label>
          <Viewport width={420}>
            <Actions Component={(p) => <Inline stackBelow="sm" {...p} />} wrapped={wrapped} />
          </Viewport>
        </div>
      </div>
    </div>
  );
}

export const ComparedWithInline = {
  name: "Compared with Inline",
  render: () => (
    <div style={{ padding: "var(--space-5)", display: "grid", gap: "var(--space-6)" }}>
      <Note>
        Each box below is a real 420px viewport, so both components stack here
        regardless of your window size. Nothing to change in the toolbar.
      </Note>

      <Row title="1 · Buttons as direct children — identical" />

      <Note>
        Identical. Stacking already stretches direct children, so ActionGroup&apos;s
        extra <code>width: 100%</code> rule changes nothing.
      </Note>

      <Row title="2 · Buttons wrapped in a span — the only difference" wrapped />

      <Note>
        This is the entire difference between the two components: when a button sits
        inside another element, ActionGroup still forces it to full width and Inline
        leaves it at its natural width.
      </Note>

      <div style={{ display: "grid", gap: "var(--space-3)" }}>
        <Label>3 · Above the breakpoint (900px) — all identical</Label>
        <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ display: "grid", gap: "var(--space-2)" }}>
            <Label>ActionGroup · 900px</Label>
            <Viewport width={900} height={110}>
              <Actions Component={ActionGroup} />
            </Viewport>
          </div>
          <div style={{ display: "grid", gap: "var(--space-2)" }}>
            <Label>Inline · 900px</Label>
            <Viewport width={900} height={110}>
              <Actions Component={(p) => <Inline stackBelow="sm" {...p} />} />
            </Viewport>
          </div>
        </div>
      </div>
    </div>
  ),
};

/** The one option Inline does not offer: opting out of stacking entirely. */
export const StackBelowOptions = {
  name: "stackBelow options",
  render: () => (
    <div style={{ padding: "var(--space-5)", display: "grid", gap: "var(--space-5)" }}>
      <Note>
        <code>stackBelow</code> picks the breakpoint, or <code>&quot;never&quot;</code> to stay
        horizontal at every width. <code>Inline</code> has no equivalent of{" "}
        <code>&quot;never&quot;</code>. Each box is a 420px viewport.
      </Note>
      {["sm", "md", "never"].map((value) => (
        <div key={value} style={{ display: "grid", gap: "var(--space-2)" }}>
          <Label>stackBelow=&quot;{value}&quot;</Label>
          <Viewport width={420}>
            <ActionGroup stackBelow={value}>
              <Button variant="secondary">Cancel</Button>
              <Button>Save changes</Button>
            </ActionGroup>
          </Viewport>
        </div>
      ))}
    </div>
  ),
};
