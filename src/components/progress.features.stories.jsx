import { Progress } from "./progress";

export default {
  title: "Components/Progress/Features",
};

export const Determinate = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 420, display: "grid", gap: 12 }}>
      <Progress value={0} label="Not started" />
      <Progress value={40} label="Uploading" />
      <Progress value={100} label="Complete" />
    </div>
  ),
};

export const Indeterminate = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <Progress label="Syncing" />
    </div>
  ),
};

export const Tones = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 420, display: "grid", gap: 12 }}>
      <Progress value={60} tone="brand" label="Brand" />
      <Progress value={60} tone="info" label="Info" />
      <Progress value={60} tone="success" label="Success" />
      <Progress value={60} tone="warning" label="Warning" />
      <Progress value={60} tone="danger" label="Danger" />
      <Progress value={60} tone="neutral" label="Neutral" />
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 420, display: "grid", gap: 12 }}>
      <Progress value={60} size="sm" label="Small" />
      <Progress value={60} size="md" label="Medium (default)" />
    </div>
  ),
};

export const NoLabel = {
  name: "No label",
  render: () => (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <Progress value={70} ariaLabel="Submission progress" />
    </div>
  ),
};
