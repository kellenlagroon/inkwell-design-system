import { Divider } from "./divider";

export default {
  title: "Components/Divider/Features",
};

export const Horizontal = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 420, color: "var(--color-text-primary)" }}>
      <p style={{ margin: "0 0 12px" }}>Final submissions are locked.</p>
      <Divider />
      <p style={{ margin: "12px 0 0" }}>Results publish at noon.</p>
    </div>
  ),
};

export const Labeled = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 420, display: "grid", gap: 16, color: "var(--color-text-primary)" }}>
      <button type="button" className="secondary-button">Continue with Google</button>
      <Divider label="or" />
      <button type="button" className="secondary-button">Continue with email</button>
    </div>
  ),
};

export const Vertical = {
  render: () => (
    <div style={{ padding: 24, color: "var(--color-text-primary)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, height: 24 }}>
        <span>Overview</span>
        <Divider orientation="vertical" />
        <span>Submissions</span>
        <Divider orientation="vertical" />
        <span>Results</span>
      </div>
    </div>
  ),
};
