import { StatusSummaryCompact } from "./statusSummaryCompact";
import { Collapsible } from "./collapsible";
import { Inline } from "./layout";
import { Pill } from "./pill";

export default {
  title: "Components/StatusSummaryCompact/Features",
};

function StatusItem({ label, value, tone }) {
  return (
    <Inline gap="xs" wrap={false}>
      <span>{label}</span>
      <Pill tone={tone} appearance="bordered" className="pill--meta">{value}</Pill>
    </Inline>
  );
}

function Summary() {
  return (
    <StatusSummaryCompact>
      <StatusItem label="Sources" value="Healthy" tone="success" />
      <StatusItem label="ATS" value="2 stale" tone="warning" />
      <StatusItem label="Queue" value="Idle" tone="neutral" />
    </StatusSummaryCompact>
  );
}

export const SummaryOnly = {
  render: () => (
    <div style={{ padding: 24 }}>
      <Summary />
    </div>
  ),
};

export const WithDetail = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 680 }}>
      <Collapsible title="Details" meta={<Summary />}>
        <p className="subtle" style={{ margin: "var(--space-1) 0 0" }}>Last sync completed 4 minutes ago.</p>
      </Collapsible>
    </div>
  ),
};
