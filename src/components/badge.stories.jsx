import { Badge } from "./badge";

export default {
  title: "Components/Badge",
};

export const Playground = {
  args: {
    children: "3",
    tone: "neutral",
    dot: false,
  },
  argTypes: {
    children: { control: "text", name: "Content" },
    tone: { control: { type: "select" }, options: ["neutral", "brand", "info", "success", "warning", "danger"] },
    dot: { control: "boolean" },
  },
  render: ({ children, tone, dot }) => (
    <div style={{ padding: 24 }}>
      <Badge tone={tone} dot={dot} aria-label={dot ? "New activity" : undefined}>
        {children}
      </Badge>
    </div>
  ),
};
