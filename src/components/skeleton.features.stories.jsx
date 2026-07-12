import { Skeleton } from "./skeleton";

export default {
  title: "Components/Skeleton/Features",
};

export const Variants = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 320, display: "grid", gap: 16 }}>
      <Skeleton variant="text" />
      <Skeleton variant="rect" height={80} />
      <Skeleton variant="circle" size={48} />
    </div>
  ),
};

export const TextLines = {
  name: "Multi-line text",
  render: () => (
    <div style={{ padding: 24, maxWidth: 320 }}>
      <Skeleton variant="text" lines={3} />
    </div>
  ),
};

export const AvatarWithText = {
  name: "Composed row",
  render: () => (
    <div style={{ padding: 24, maxWidth: 360, display: "flex", gap: 12, alignItems: "center" }}>
      <Skeleton variant="circle" size={40} />
      <div style={{ flex: 1, display: "grid", gap: 6 }}>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" height={10} />
      </div>
    </div>
  ),
};
