import { SplitButton } from "./splitButton";

const ROUND_ITEMS = [
  {
    label: "Poll round",
    description: "Coaches rank teams 1–25",
    icon: "ti-award",
    iconBg: "rgba(200,63,74,0.14)",
    iconColor: "#c83f4a",
  },
  {
    label: "Multi-category poll",
    description: "Vote across multiple categories",
    icon: "ti-layout-list",
    iconBg: "rgba(111,143,181,0.14)",
    iconColor: "#6f8fb5",
  },
  {
    label: "Team selection poll",
    description: "Coaches pick a team roster",
    icon: "ti-shirt",
    iconBg: "rgba(122,176,137,0.14)",
    iconColor: "#7ab089",
  },
];

export default {
  title: "Components/SplitButton/Features",
};

export const Default = {
  render: () => (
    <div style={{ padding: "40px" }}>
      <SplitButton
        primaryLabel="New poll round"
        onPrimaryClick={() => {}}
        items={ROUND_ITEMS}
      />
    </div>
  ),
};

export const SideBySideWithPrimary = {
  name: "Side-by-side hierarchy",
  render: () => (
    <div style={{ padding: "40px", display: "flex", alignItems: "center", gap: "12px" }}>
      <button className="primary-button">Save ballot</button>
      <SplitButton
        primaryLabel="New poll round"
        onPrimaryClick={() => {}}
        items={ROUND_ITEMS}
      />
    </div>
  ),
};
