import { Button } from "./ui";
import { IconArrowDown, IconList } from "./icons";

export default {
  title: "Components/Button",
};

export const ButtonPlayground = {
  name: "Playground",
  args: {
    children: "Save changes",
    variant: "primary",
    size: "md",
    disabled: false,
  },
  argTypes: {
    children: { control: "text", name: "Label" },
    variant: {
      control: { type: "select" },
      name: "Variant",
      options: ["primary", "secondary", "ghost", "danger"],
    },
    size: {
      control: { type: "select" },
      name: "Size",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    disabled: { control: "boolean" },
  },
  render: ({ children, variant, size, disabled }) => (
    <Button variant={variant} size={size} disabled={disabled}>
      {children}
    </Button>
  ),
};

export const IconSlots = {
  name: "Leading and trailing icons",
  render: () => <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
    <Button startIcon={<IconList />}>Search</Button>
    <Button variant="secondary" endIcon={<IconArrowDown />}>More</Button>
  </div>,
};
