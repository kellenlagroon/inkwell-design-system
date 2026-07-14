import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Nav } from "./nav";
import { IconAward, IconList, IconSettings, IconTrophy, IconUsers } from "./icons.jsx";

export default {
  title: "Components/Sidebar/Features",
  parameters: { layout: "fullscreen" },
};

const ITEMS = [
  { value: "overview", label: "Overview", icon: <IconList /> },
  { value: "players", label: "Players", icon: <IconUsers /> },
  { value: "ballot", label: "Ballot", icon: <IconAward /> },
  { value: "results", label: "Results", icon: <IconTrophy /> },
  { value: "settings", label: "Settings", icon: <IconSettings /> },
];

function Shell(props) {
  const [value, setValue] = useState("overview");
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar {...props}>
        <Nav orientation="vertical" items={ITEMS} value={value} onChange={setValue} aria-label="Primary" />
      </Sidebar>
      <main style={{ flex: 1, padding: 32, color: "var(--text)" }}>
        <p style={{ color: "var(--muted)" }}>Scrollable page content.</p>
      </main>
    </div>
  );
}

export const StartSide = { name: "Start (default)", render: () => <Shell /> };

export const EndSide = {
  name: "End side",
  render: () => (
    <div style={{ display: "flex", flexDirection: "row-reverse", minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar side="end">
        <Nav orientation="vertical" items={ITEMS} value="overview" onChange={() => {}} aria-label="Primary" />
      </Sidebar>
      <main style={{ flex: 1, padding: 32, color: "var(--text)" }}>Content</main>
    </div>
  ),
};

export const HeaderAndFooter = {
  name: "Header + footer slots",
  render: () => (
    <Shell
      header={<strong style={{ color: "var(--text)", fontFamily: "var(--font-display)" }}>Inkwell</strong>}
      footer={<a href="#logout" style={{ color: "var(--muted)", fontSize: "var(--font-size-sm)" }}>Sign out</a>}
    />
  ),
};

export const Fixed = {
  name: "Fixed positioning",
  render: () => (
    <Shell
      fixed
      header={<strong style={{ color: "var(--text)" }}>Fixed shell</strong>}
    />
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", gap: 24, minHeight: "100vh", background: "var(--bg)" }}>
      {["sm", "md", "lg"].map((size) => (
        <Sidebar key={size} size={size} header={<strong style={{ color: "var(--text)" }}>{size}</strong>}>
          <Nav orientation="vertical" items={ITEMS.slice(0, 3)} value="overview" onChange={() => {}} aria-label={size} />
        </Sidebar>
      ))}
    </div>
  ),
};
