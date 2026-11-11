import { SplitButton } from "./splitButton";
import { IconAward, IconList, IconShirt } from "./icons.jsx";

const TEMPLATE_ITEMS = [
  {
    label: "Project plan",
    description: "Outline milestones and assign owners",
    icon: <IconAward />,
    iconBg: "rgba(200,63,74,0.14)",
    iconColor: "#c83f4a",
  },
  {
    label: "Task list",
    description: "Group work into categories",
    icon: <IconList />,
    iconBg: "rgba(111,143,181,0.14)",
    iconColor: "#6f8fb5",
  },
  {
    label: "Design brief",
    description: "Describe goals and list deliverables",
    icon: <IconShirt />,
    iconBg: "rgba(122,176,137,0.14)",
    iconColor: "#7ab089",
  },
];

export default {
  title: "Components/SplitButton",
};

export const Playground = {
  args: {
    primaryLabel: "New project",
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
        items={disabled ? [] : TEMPLATE_ITEMS}
        disabled={disabled}
      />
    </div>
  ),
};
