import { Button } from "./ui.jsx";

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
      options: ["primary", "secondary", "ghost", "danger"],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    disabled: { control: "boolean" },
  },
  render: ({ children, variant, size, disabled }) => (
    <Button className={`${variant}-button${size !== "md" ? ` button--${size}` : ""}`} disabled={disabled}>
      {children}
    </Button>
  ),
};
