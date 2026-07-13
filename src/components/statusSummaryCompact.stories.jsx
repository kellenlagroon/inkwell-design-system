import { StatusSummaryCompact } from "./statusSummaryCompact";

export default {
  title: "Components/StatusSummaryCompact",
};

export const Playground = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 680 }}>
      <StatusSummaryCompact
        items={[
          { label: "Sources", value: "Healthy", tone: "success" },
          { label: "ATS", value: "2 stale", tone: "warning" },
          { label: "Queue", value: "Idle", tone: "neutral" },
        ]}
        detail={<p className="subtle">Last sync completed 4 minutes ago.</p>}
      />
    </div>
  ),
};

