import { Skeleton } from "./skeleton";

export default {
  title: "Components/Skeleton",
};

export const Playground = {
  args: { variant: "text", width: "", height: "", size: 40, lines: 1 },
  argTypes: {
    variant: { control: "inline-radio", options: ["text", "rect", "circle"] },
    width: { control: "text" },
    height: { control: "text" },
    size: { control: "number" },
    lines: { control: "number" },
  },
  render: ({ variant, width, height, size, lines }) => (
    <div style={{ padding: 24, maxWidth: 320 }}>
      <Skeleton
        variant={variant}
        width={width || undefined}
        height={height || undefined}
        size={size}
        lines={variant === "text" ? lines : undefined}
      />
    </div>
  ),
};
