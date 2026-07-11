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
    <div style={{ padding: 24, maxWidth: 520, display: "grid" }}>
      {CATEGORIES.map((c, i) => (
        <Collapsible
          key={c.key}
          title={c.title}
          description={`Winner: ${c.winner}`}
          meta={`${c.count} submissions`}
          defaultOpen={i === 0}
          divided
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

export const Divided = {
  name: "Divided vs. plain",
  render: () => (
    <div style={{ padding: 24, maxWidth: 480, display: "grid", gap: 32 }}>
      <div>
        <p className="subtle" style={{ margin: "0 0 8px" }}>divided</p>
        <Collapsible title="Best offense" meta="12 submissions" divided>
          <p className="subtle" style={{ margin: 0 }}>Hairline divider under the row — matches the app.</p>
        </Collapsible>
      </div>
      <div>
        <p className="subtle" style={{ margin: "0 0 8px" }}>plain (default)</p>
        <Collapsible title="Best offense" meta="12 submissions">
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
