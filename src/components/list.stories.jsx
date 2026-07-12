import { List } from "./list";

export default {
  title: "Components/List",
};

const TEAMS = [
  { id: "ala", team: "Alabama", coach: "Kalen DeBoer", record: "12–1" },
  { id: "geo", team: "Georgia", coach: "Kirby Smart", record: "11–2" },
  { id: "osu", team: "Ohio State", coach: "Ryan Day", record: "11–2" },
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
        {TEAMS.map((t) => (
          <List.Row key={t.id}>
            <div>
              <strong>{t.team}</strong>
              <div className="subtle">{t.coach}</div>
            </div>
            <div>{t.record}</div>
            <button type="button" className="ghost-button button--sm">Edit</button>
          </List.Row>
        ))}
      </List>
    </div>
  ),
};
