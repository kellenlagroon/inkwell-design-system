import { Collapsible } from "./collapsible";

export default {
  title: "Components/Collapsible",
};

export const Playground = {
  args: {
    title: "Best offense",
    description: "Winner: Northstar",
    meta: "12 submissions",
    defaultOpen: false,
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    meta: { control: "text" },
    defaultOpen: { control: "boolean" },
  },
  render: ({ title, description, meta, defaultOpen }) => (
    <div style={{ padding: 24, maxWidth: 480 }}>
      <Collapsible title={title} description={description} meta={meta} defaultOpen={defaultOpen}>
        <div className="results-list" style={{ display: "grid", gap: 8, color: "var(--color-text-primary)" }}>
          <div>1. Northstar — 8 submissions</div>
          <div>2. Summit — 6 submissions</div>
          <div>3. Harbor — 4 submissions</div>
        </div>
      </Collapsible>
    </div>
  ),
};
