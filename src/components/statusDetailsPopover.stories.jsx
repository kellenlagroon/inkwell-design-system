import { Button, IconCheck, StatusDetailsPopover } from "../index";

export default { title: "Components/StatusDetailsPopover" };

export const Playground = {
  args: {
    label: "Verified",
    summary: "Reference verified",
    tone: "success",
  },
  argTypes: {
    label: { control: "text" },
    summary: { control: "text" },
    tone: { control: "inline-radio", options: ["neutral", "success", "warning", "danger"] },
  },
  render: (args) => (
    <div style={{ padding: 80 }}>
      <StatusDetailsPopover
        {...args}
        icon={<IconCheck />}
        description="The saved record matches its reference."
        evidence={<a href="#reference">View reference</a>}
        actions={<Button size="xs" variant="secondary">Recheck</Button>}
      />
    </div>
  ),
};
