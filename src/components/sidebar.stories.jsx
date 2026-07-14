import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Nav } from "./nav";
import { Avatar } from "./avatar";
import { IconAward, IconList, IconSettings, IconTrophy, IconUsers } from "./icons.jsx";

export default {
  title: "Components/Sidebar",
  parameters: { layout: "fullscreen" },
};

const ITEMS = [
  { value: "overview", label: "Overview", icon: <IconList /> },
  { value: "members", label: "Members", icon: <IconUsers />, badge: 12 },
  { value: "submission", label: "Submission", icon: <IconAward />, badge: true },
  { value: "results", label: "Results", icon: <IconTrophy /> },
  { value: "settings", label: "Settings", icon: <IconSettings /> },
];

function AppShell({ side = "start", size = "md" }) {
  const [value, setValue] = useState("overview");
  return (
    <div style={{ display: "flex", flexDirection: side === "end" ? "row-reverse" : "row", minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar
        side={side}
        size={size}
        header={<strong style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>Inkwell</strong>}
        footer={
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar name="Kellen L" size="sm" />
            <div style={{ minWidth: 0 }}>
              <div style={{ color: "var(--text)", fontSize: "var(--font-size-sm)", fontWeight: 600 }}>Kellen L</div>
              <div style={{ color: "var(--muted)", fontSize: "var(--font-size-2xs)" }}>Administrator</div>
            </div>
          </div>
        }
      >
        <Nav orientation="vertical" items={ITEMS} value={value} onChange={setValue} aria-label="Primary" />
      </Sidebar>
      <main style={{ flex: 1, padding: 32, color: "var(--text)" }}>
        <h1 style={{ marginTop: 0 }}>Content region</h1>
        <p style={{ color: "var(--muted)" }}>
          The Sidebar frames primary navigation and pins a header/footer around a
          scrollable middle. Drop any content into the main slot.
        </p>
      </main>
    </div>
  );
}

export const SidebarPlayground = {
  name: "Playground",
  args: { side: "start", size: "md" },
  argTypes: {
    side: { control: { type: "inline-radio" }, options: ["start", "end"], name: "Side" },
    size: { control: { type: "inline-radio" }, options: ["sm", "md", "lg"], name: "Size" },
  },
  render: (args) => <AppShell {...args} />,
};
