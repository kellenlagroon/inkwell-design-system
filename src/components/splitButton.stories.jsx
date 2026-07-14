import { SplitButton } from "./splitButton";

const ROUND_ITEMS = [
  {
    label: "Review cycle",
    description: "Reviewers prioritize submitted items",
    icon: "ti-award",
    iconBg: "rgba(200,63,74,0.14)",
    iconColor: "#c83f4a",
  },
  {
    label: "Multi-category review",
    description: "Choose across multiple categories",
    icon: "ti-layout-list",
    iconBg: "rgba(111,143,181,0.14)",
    iconColor: "#6f8fb5",
  },
  {
    label: "Item selection review",
    description: "Reviewers choose from a shared directory",
    icon: "ti-shirt",
    iconBg: "rgba(122,176,137,0.14)",
    iconColor: "#7ab089",
  },
];

export default {
  title: "Components/SplitButton",
};

export const Playground = {
  args: {
    primaryLabel: "New review cycle",
    disabled: false,
  },
  argTypes: {
    primaryLabel: { control: "text", name: "Primary label" },
    disabled: { control: "boolean" },
  },
  render: ({ primaryLabel, disabled }) => (
    <div style={{ padding: "40px" }}>
      <SplitButton
        primaryLabel={primaryLabel}
        onPrimaryClick={() => {}}
        items={disabled ? [] : ROUND_ITEMS}
        disabled={disabled}
      />
    </div>
  ),
};
