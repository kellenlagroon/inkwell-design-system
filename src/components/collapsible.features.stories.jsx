import { Collapsible } from "./collapsible";

export default {
  title: "Components/Collapsible/Features",
};

const CATEGORIES = [
  { key: "overview", title: "Overview", description: "Summary and recent activity", count: 3 },
  { key: "notifications", title: "Notifications", description: "Email and product preferences", count: 2 },
  { key: "security", title: "Security", description: "Access and sign-in settings", count: 4 },
];

export const Stacked = {
  name: "Stacked (results)",
  render: () => (
    <div style={{ padding: 24, maxWidth: 520, display: "grid" }}>
      {CATEGORIES.map((c, i) => (
        <Collapsible
          key={c.key}
          title={c.title}
          description={c.description}
          meta={`${c.count} items`}
          defaultOpen={i === 0}
          divided
        >
          <div style={{ display: "grid", gap: 8, color: "var(--color-text-primary)" }}>
            <div>Item one</div>
            <div>Item two</div>
            <div>Item three</div>
          </div>
        </Collapsible>
      ))}
    </div>
  ),
};

export const Divided = {
  name: "Divided vs. plain",
  render: () => (
    <div style={{ padding: 24, maxWidth: 480, display: "grid", gap: 32 }}>
      <div>
        <p className="subtle" style={{ margin: "0 0 8px" }}>divided</p>
        <Collapsible title="Project summary" meta="3 items" divided>
          <p className="subtle" style={{ margin: 0 }}>Hairline divider under the row.</p>
        </Collapsible>
      </div>
      <div>
        <p className="subtle" style={{ margin: "0 0 8px" }}>plain (default)</p>
        <Collapsible title="Project summary" meta="3 items">
          <p className="subtle" style={{ margin: 0 }}>No divider.</p>
        </Collapsible>
      </div>
    </div>
  ),
};

export const NoMeta = {
  name: "Title only",
  render: () => (
    <div style={{ padding: 24, maxWidth: 480 }}>
      <Collapsible title="Advanced options">
        <p className="subtle" style={{ margin: 0 }}>Extra settings revealed on demand.</p>
      </Collapsible>
    </div>
  ),
};

export const CustomStyling = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 480 }}>
      <Collapsible
        title="Advanced options"
        description="A compact disclosure treatment"
        meta="3 items"
        divided
        style={{
          "--ink-collapsible-trigger-min-height": "48px",
          "--ink-collapsible-trigger-padding-block": "var(--space-2)",
          "--ink-collapsible-chevron-size": "28px",
          "--ink-collapsible-divider-color": "var(--color-border-strong)",
        }}
      >
        <p className="subtle" style={{ margin: 0 }}>Extra settings revealed on demand.</p>
      </Collapsible>
    </div>
  ),
};
