import { List } from "./list";

export default {
  title: "Components/List",
};

const ITEMS = [
  { id: "ala", item: "Northstar", owner: "Avery Stone", status: "12–1" },
  { id: "geo", item: "Summit", owner: "Jordan Lee", status: "11–2" },
  { id: "osu", item: "Harbor", owner: "Morgan Chen", status: "11–2" },
];

export const Playground = {
  args: {
    columns: "minmax(0, 1.1fr) minmax(0, 1fr) auto",
    density: "comfortable",
    bordered: true,
  },
  argTypes: {
    columns: { control: "text" },
    density: { control: "inline-radio", options: ["comfortable", "compact"] },
    bordered: { control: "boolean" },
  },
  render: ({ columns, density, bordered }) => (
    <div style={{ padding: 24, maxWidth: 560, color: "var(--color-text-primary)" }}>
      <List columns={columns} density={density} bordered={bordered}>
        {ITEMS.map((t) => (
          <List.Row key={t.id}>
            <div>
              <strong>{t.item}</strong>
              <div className="subtle">{t.owner}</div>
            </div>
            <div>{t.status}</div>
            <button type="button" className="ghost-button button--sm">Edit</button>
          </List.Row>
        ))}
      </List>
    </div>
  ),
};
