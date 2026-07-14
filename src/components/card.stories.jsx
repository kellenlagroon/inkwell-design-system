import { Card, CardActions } from "./card";
import { SectionHeading, Button } from "./ui.jsx";

export default {
  title: "Components/Card",
};

export const Playground = {
  args: {
    variant: "plain",
    tone: "default",
  },
  argTypes: {
    variant: { control: { type: "select" }, options: ["plain", "outlined"] },
    tone: { control: { type: "select" }, options: ["default", "danger"] },
  },
  render: ({ variant, tone }) => (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <Card variant={variant} tone={tone}>
        <SectionHeading eyebrow="Review cycle" title="Quarterly Planning Review" compact />
        <p className="subtle" style={{ margin: 0 }}>2026 Season · 25-slot submission · top 25</p>
        <CardActions>
          <Button variant="secondary">Close voting</Button>
          <Button>Publish update</Button>
        </CardActions>
      </Card>
    </div>
  ),
};
