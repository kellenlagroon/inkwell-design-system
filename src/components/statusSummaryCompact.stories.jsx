import { StatusSummaryCompact } from "./statusSummaryCompact";
import { Inline } from "./layout";
import { Pill } from "./pill";

function StatusItem({ label, value, tone }) {
  return (
    <Inline gap="xs" wrap={false}>
      <span>{label}</span>
      <Pill tone={tone} appearance="bordered" className="pill--meta">{value}</Pill>
    </Inline>
  );
}

export default {
  title: "Components/StatusSummaryCompact",
};

export const Playground = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 680 }}>
      <StatusSummaryCompact
      >
        <StatusItem label="Sync" value="Healthy" tone="success" />
        <StatusItem label="Index" value="2 pending" tone="warning" />
        <StatusItem label="Queue" value="Idle" tone="neutral" />
      </StatusSummaryCompact>
    </div>
  ),
};
