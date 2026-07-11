import { Collapsible } from "./collapsible";

export default {
  title: "Components/Collapsible",
};

export const Playground = {
  args: {
    title: "Best offense",
    description: "Winner: Alabama",
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
          <div>1. Alabama — 8 ballots</div>
          <div>2. Georgia — 6 ballots</div>
          <div>3. Ohio State — 4 ballots</div>
        </div>
      </Collapsible>
    </div>
  ),
};
