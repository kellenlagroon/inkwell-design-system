import { StatusSummaryCompact } from "./statusSummaryCompact";

export default {
  title: "Components/StatusSummaryCompact/Features",
};

const ITEMS = [
  { label: "Sources", value: "Healthy", tone: "success" },
  { label: "ATS", value: "2 stale", tone: "warning" },
  { label: "Queue", value: "Idle", tone: "neutral" },
];

export const SummaryOnly = {
  render: () => (
    <div style={{ padding: 24 }}>
      <StatusSummaryCompact items={ITEMS} />
    </div>
  ),
};

export const WithDetail = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 680 }}>
      <StatusSummaryCompact items={ITEMS} detail={<p className="subtle">Last sync completed 4 minutes ago.</p>} />
    </div>
  ),
};

