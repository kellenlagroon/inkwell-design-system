import { Collapsible } from "./collapsible";

export default {
  title: "Components/Collapsible/Features",
};

const CATEGORIES = [
  { key: "offense", title: "Best offense", winner: "Alabama", count: 12 },
  { key: "defense", title: "Best defense", winner: "Georgia", count: 12 },
  { key: "surprise", title: "Biggest surprise", winner: "Indiana", count: 11 },
];

export const Stacked = {
  name: "Stacked (results)",
  render: () => (
    <div style={{ padding: 24, maxWidth: 520, display: "grid", gap: 4 }}>
      {CATEGORIES.map((c, i) => (
        <Collapsible
          key={c.key}
          title={c.title}
          description={`Winner: ${c.winner}`}
          meta={`${c.count} submissions`}
          defaultOpen={i === 0}
        >
          <div style={{ display: "grid", gap: 8, color: "var(--color-text-primary)" }}>
            <div>1. {c.winner} — 8 ballots</div>
            <div>2. Michigan — 5 ballots</div>
            <div>3. Oregon — 3 ballots</div>
          </div>
        </Collapsible>
      ))}
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
