import { List } from "./list";

export default {
  title: "Components/List/Features",
};

const ROWS = [
  { id: "a", primary: "Northstar", secondary: "Core", meta: "12–1" },
  { id: "b", primary: "Summit", secondary: "Core", meta: "11–2" },
  { id: "c", primary: "Harbor", secondary: "Growth", meta: "11–2" },
];

export const Basic = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 480, color: "var(--color-text-primary)" }}>
      <List columns="minmax(0, 1fr) minmax(0, 1fr) auto">
        {ROWS.map((r) => (
          <List.Row key={r.id}>
            <strong>{r.primary}</strong>
            <span className="subtle">{r.secondary}</span>
            <span>{r.meta}</span>
          </List.Row>
        ))}
      </List>
    </div>
  ),
};

export const Compact = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 480, color: "var(--color-text-primary)" }}>
      <List columns="minmax(0, 1fr) auto" density="compact">
        {ROWS.map((r) => (
          <List.Row key={r.id}>
            <span>{r.primary}</span>
            <span className="subtle">{r.meta}</span>
          </List.Row>
        ))}
      </List>
    </div>
  ),
};

export const Unbordered = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 480, color: "var(--color-text-primary)" }}>
      <List columns="1fr auto" bordered={false}>
        {ROWS.map((r) => (
          <List.Row key={r.id}>
            <span>{r.primary}</span>
            <span className="subtle">{r.meta}</span>
          </List.Row>
        ))}
      </List>
    </div>
  ),
};
