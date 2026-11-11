import { Badge } from "./badge";
import { IconButton } from "./ui";
import { IconTrophy } from "./icons.jsx";

export default {
  title: "Components/Badge/Features",
};

export const Tones = {
  name: "Tones",
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", alignItems: "center", padding: "var(--space-6)" }}>
      <Badge>Draft</Badge>
      <Badge tone="brand">3</Badge>
      <Badge tone="info">Info</Badge>
      <Badge tone="success">Ready</Badge>
      <Badge tone="warning">Review</Badge>
      <Badge tone="danger">99+</Badge>
    </div>
  ),
};

export const Dots = {
  name: "Dots",
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 24 }}>
      <Badge dot tone="brand" aria-label="New activity" />
      <Badge dot tone="neutral" aria-hidden="true" />
      <Badge dot tone="danger" aria-label="Attention needed" />
    </div>
  ),
};

const cornerBadge = {
  position: "absolute",
  top: "var(--space-0-5)",
  right: "var(--space-0-5)",
  transform: "translate(50%, -50%)",
};

export const OnAControl = {
  name: "On a control",
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 24 }}>
      <span style={{ position: "relative", display: "inline-flex" }}>
        <IconButton icon={<IconTrophy />} aria-label="Highlights" />
        <Badge
          dot
          tone="brand"
          aria-label="New highlights"
          style={cornerBadge}
        />
      </span>
      <span style={{ position: "relative", display: "inline-flex" }}>
        <IconButton icon={<IconTrophy />} aria-label="Highlights" />
        <Badge
          tone="danger"
          aria-label="3 new highlights"
          style={cornerBadge}
        >
          3
        </Badge>
      </span>
    </div>
  ),
};
