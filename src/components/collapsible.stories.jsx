import { Collapsible } from "./collapsible";

export default {
  title: "Components/Collapsible",
};

export const Playground = {
  args: {
    title: "Project summary",
    description: "Last updated today",
    meta: "3 items",
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
          <div>Item one</div>
          <div>Item two</div>
          <div>Item three</div>
        </div>
      </Collapsible>
    </div>
  ),
};
