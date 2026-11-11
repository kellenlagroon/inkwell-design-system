import { useState } from "react";
import { Nav } from "./nav";
import { IconAward, IconList, IconSettings, IconTrophy, IconUsers } from "./icons.jsx";

export default {
  title: "Components/Nav",
};

const ITEMS = [
  { value: "library", label: "Library", icon: <IconAward /> },
  { value: "reports", label: "Reports", icon: <IconTrophy />, badge: 3 },
  { value: "settings", label: "Settings", icon: <IconSettings /> },
];

const VERTICAL_ITEMS = [
  { value: "overview", label: "Overview", icon: <IconList /> },
  { value: "members", label: "Members", icon: <IconUsers />, badge: 12 },
  { value: "reports", label: "Reports", icon: <IconTrophy /> },
  { value: "settings", label: "Settings", icon: <IconSettings /> },
];

export const NavPlayground = {
  name: "Playground",
  args: {
    orientation: "horizontal",
    shape: "rounded",
    fit: "content",
    withBadges: true,
    withIcons: true,
  },
  argTypes: {
    orientation: {
      control: { type: "inline-radio" },
      options: ["horizontal", "vertical"],
      name: "Orientation",
    },
    withBadges: { control: "boolean", name: "Show badges" },
    withIcons: { control: "boolean", name: "Show icons" },
    shape: { control: "inline-radio", options: ["rounded", "pill"] },
    fit: { control: "inline-radio", options: ["content", "equal", "scroll", "wrap"] },
  },
  render: ({ orientation, shape, fit, withBadges, withIcons }) => {
    function PlaygroundNav() {
      const source = orientation === "vertical" ? VERTICAL_ITEMS : ITEMS;
      const [value, setValue] = useState(source[0].value);
      const items = source.map((item) => ({
        ...item,
        icon: withIcons ? item.icon : undefined,
        badge: withBadges ? item.badge : undefined,
      }));
      return (
        <div style={{ padding: 32, display: "flex", justifyContent: "center" }}>
          <Nav
            items={items}
            value={value}
            onChange={setValue}
            orientation={orientation}
            shape={shape}
            fit={fit}
            aria-label="Primary"
          />
        </div>
      );
    }
    return <PlaygroundNav />;
  },
};
