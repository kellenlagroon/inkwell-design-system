import { Badge } from "./badge";
import { IconButton } from "./ui";
import { IconTrophy } from "./icons.jsx";

export default {
  title: "Components/Badge/Features",
};

export const Tones = {
  name: "Tones",
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 24 }}>
      <Badge>3</Badge>
      <Badge tone="neutral">12</Badge>
      <Badge tone="danger">9</Badge>
      <Badge>99+</Badge>
    </div>
  ),
};

export const Dots = {
  name: "Dots",
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 24 }}>
      <Badge dot aria-label="New activity" />
      <Badge dot tone="neutral" aria-hidden="true" />
      <Badge dot tone="danger" aria-label="Attention needed" />
    </div>
  ),
};

export const OnAControl = {
  name: "On a control",
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 24 }}>
      <span style={{ position: "relative", display: "inline-flex" }}>
        <IconButton icon={<IconTrophy />} aria-label="Results" />
        <Badge
          dot
          aria-label="New results"
          style={{ position: "absolute", top: -3, right: -3 }}
        />
      </span>
      <span style={{ position: "relative", display: "inline-flex" }}>
        <IconButton icon={<IconTrophy />} aria-label="Results" />
        <Badge
          tone="danger"
          aria-label="3 new results"
          style={{ position: "absolute", top: -6, right: -6 }}
        >
          3
        </Badge>
      </span>
    </div>
  ),
};
