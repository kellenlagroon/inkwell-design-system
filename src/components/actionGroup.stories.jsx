import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ActionGroup, Inline } from "./layout";
import { Button } from "./ui";

const VIEWPORTS = {
  narrow420: { name: "420px — below sm", styles: { width: "420px", height: "760px" }, type: "mobile" },
  narrow479: { name: "479px — just below sm", styles: { width: "479px", height: "760px" }, type: "mobile" },
  wide520: { name: "520px — above sm", styles: { width: "520px", height: "760px" }, type: "tablet" },
  wide900: { name: "900px — wide", styles: { width: "900px", height: "760px" }, type: "desktop" },
};

export default {
  title: "Layout/ActionGroup",
  parameters: {
    layout: "fullscreen",
    viewport: { options: VIEWPORTS },
  },
};

/** Live width readout, so the difference is legible as numbers, not just shape. */
function Measured({ label, children }) {
  const ref = useRef(null);
  const [widths, setWidths] = useState([]);
  const [stacked, setStacked] = useState(false);
  const [order, setOrder] = useState([]);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const measure = () => {
      const group = node.querySelector(".ink-inline");
      const buttons = [...node.querySelectorAll("button")];
      setWidths(buttons.map((b) => Math.round(b.getBoundingClientRect().width)));
      const dir = group ? getComputedStyle(group).flexDirection : "row";
      setStacked(dir.startsWith("column"));
      // Visual order (top-to-bottom, then left-to-right) — the whole point of the
      // primary-last convention, and not visible from the DOM order alone.
      const sorted = [...buttons].sort((a, b) => {
        const ra = a.getBoundingClientRect();
        const rb = b.getBoundingClientRect();
        return ra.top - rb.top || ra.left - rb.left;
      });
      setOrder(sorted.map((b) => b.textContent));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    observer.observe(document.documentElement);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div style={{ display: "grid", gap: "var(--space-2)", minWidth: 0 }}>
      <p
        style={{
          margin: 0,
          fontSize: "0.72rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "var(--color-text-secondary)",
        }}
      >
        {label}
      </p>
      <div
        ref={ref}
        style={{
          padding: "var(--space-4)",
          border: "1px dashed var(--color-border-default)",
          borderRadius: "var(--radius-sharp)",
          background: "var(--color-surface-raised)",
        }}
      >
        {children}
      </div>
      <p style={{ margin: 0, fontSize: "0.72rem", fontFamily: "ui-monospace, monospace", color: "var(--color-text-secondary)" }}>
        {stacked ? "stacked" : "inline"} · {widths.join(" × ") || "—"} px
        {order.length ? " · order: " + order.join(" → ") : ""}
      </p>
    </div>
  );
}

function ViewportBadge() {
  const [w, setW] = useState(typeof window === "undefined" ? 0 : window.innerWidth);
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);
    const id = window.setInterval(onResize, 300);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearInterval(id);
    };
  }, []);
  const stacking = w < 480;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        padding: "var(--space-2) var(--space-3)",
        borderRadius: "var(--radius-sharp)",
        background: stacking ? "var(--color-brand-soft)" : "var(--color-info-soft)",
        color: "var(--color-text-primary)",
        fontSize: "0.78rem",
        fontFamily: "ui-monospace, monospace",
      }}
    >
      viewport {w}px — {stacking ? "below 480px, both stack" : "above 480px, both inline"}
    </div>
  );
}

const Note = ({ children }) => (
  <p style={{ margin: 0, maxWidth: "66ch", color: "var(--color-text-secondary)", fontSize: "0.84rem", lineHeight: 1.55 }}>
    {children}
  </p>
);

const Pair = ({ wrapped }) => {
  const kids = wrapped
    ? [
        <span key="a"><Button variant="secondary">Cancel</Button></span>,
        <span key="b"><Button>Save changes</Button></span>,
      ]
    : [
        <Button key="a" variant="secondary">Cancel</Button>,
        <Button key="b">Save changes</Button>,
      ];
  return (
    <div style={{ display: "grid", gap: "var(--space-4)", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
      <Measured label="ActionGroup"><ActionGroup>{kids}</ActionGroup></Measured>
      <Measured label={'Inline stackBelow="sm"'}><Inline stackBelow="sm">{kids}</Inline></Measured>
    </div>
  );
};

/**
 * Responds to the Viewport toolbar. Presets either side of the 480px breakpoint
 * are registered; the readout under each box reports the live measurement.
 */
export const ComparedWithInline = {
  name: "Compared with Inline",
  render: () => (
    <div style={{ padding: "var(--space-5)", display: "grid", gap: "var(--space-6)" }}>
      <div style={{ display: "grid", gap: "var(--space-3)", justifyItems: "start" }}>
        <ViewportBadge />
        <Note>
          Use the <strong>Viewport</strong> toolbar above — the presets sit either side of the
          480px breakpoint. Watch the numbers under each box, not just the shape.
        </Note>
      </div>

      <div style={{ display: "grid", gap: "var(--space-3)" }}>
        <Note>
          <strong>1 · Buttons as direct children.</strong> These two stay identical at every
          width. Stacking already stretches direct children, so ActionGroup&apos;s extra rule
          changes nothing here.
        </Note>
        <Pair />
      </div>

      <div style={{ display: "grid", gap: "var(--space-3)" }}>
        <Note>
          <strong>2 · Buttons wrapped in a span.</strong> Below 480px these diverge — and this
          is the only case where they do. ActionGroup still forces full width; Inline leaves the
          buttons at their natural size.
        </Note>
        <Pair wrapped />
      </div>
    </div>
  ),
};

/**
 * The two conventions ActionGroup encodes. Author the primary action last in the
 * markup; the component places it.
 */
export const Conventions = {
  name: "Conventions",
  render: () => (
    <div style={{ padding: "var(--space-5)", display: "grid", gap: "var(--space-6)" }}>
      <div style={{ display: "grid", gap: "var(--space-3)", justifyItems: "start" }}>
        <ViewportBadge />
        <Note>
          Both rows below are authored the same way — <code>Cancel</code> then{" "}
          <code>Save changes</code>, primary last. Cross 480px and watch the{" "}
          <strong>order</strong> readout flip: primary is rightmost when inline, topmost
          when stacked.
        </Note>
      </div>

      <div style={{ display: "grid", gap: "var(--space-3)" }}>
        <Note>
          <strong>Primary placement.</strong> Right on desktop, top on mobile.
        </Note>
        <Measured label="ActionGroup — primary written last">
          <ActionGroup>
            <Button variant="secondary">Cancel</Button>
            <Button>Save changes</Button>
          </ActionGroup>
        </Measured>
      </div>

      <div style={{ display: "grid", gap: "var(--space-3)" }}>
        <Note>
          <strong>Dialog footers right-align</strong> with no configuration — an
          ActionGroup inside a modal card or drawer footer picks it up. Set{" "}
          <code>align</code> explicitly to opt out.
        </Note>
        <div style={{ display: "grid", gap: "var(--space-4)", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <Measured label="Inside a dialog footer (align unset)">
            <div className="modal-card" style={{ padding: "var(--space-4)" }}>
              <ActionGroup>
                <Button variant="secondary">Cancel</Button>
                <Button>Save changes</Button>
              </ActionGroup>
            </div>
          </Measured>
          <Measured label="Outside a dialog (align unset)">
            <ActionGroup>
              <Button variant="secondary">Cancel</Button>
              <Button>Save changes</Button>
            </ActionGroup>
          </Measured>
        </div>
      </div>

      <div style={{ display: "grid", gap: "var(--space-3)" }}>
        <Note>
          <strong>align=&quot;between&quot;</strong> separates a destructive action from the rest.
        </Note>
        <Measured label={'align="between"'}>
          <ActionGroup align="between">
            <Button variant="danger">Delete project</Button>
            <Button>Save changes</Button>
          </ActionGroup>
        </Measured>
      </div>
    </div>
  ),
};

/** The one option Inline does not offer: opting out of stacking entirely. */
export const StackBelowOptions = {
  name: "stackBelow options",
  render: () => (
    <div style={{ padding: "var(--space-5)", display: "grid", gap: "var(--space-5)" }}>
      <div style={{ display: "grid", gap: "var(--space-3)", justifyItems: "start" }}>
        <ViewportBadge />
        <Note>
          <code>stackBelow</code> picks the breakpoint, or <code>&quot;never&quot;</code> to stay
          horizontal at every width. <code>Inline</code> has no equivalent of{" "}
          <code>&quot;never&quot;</code>. Narrow the viewport below 480px to separate them.
        </Note>
      </div>
      <div style={{ display: "grid", gap: "var(--space-4)", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        {["sm", "md", "never"].map((value) => (
          <Measured key={value} label={`stackBelow="${value}"`}>
            <ActionGroup stackBelow={value}>
              <Button variant="secondary">Cancel</Button>
              <Button>Save changes</Button>
            </ActionGroup>
          </Measured>
        ))}
      </div>
    </div>
  ),
};
