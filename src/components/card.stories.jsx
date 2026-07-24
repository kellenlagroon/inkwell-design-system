import { Card, CardActions } from "./card";
import { SectionHeading, Button } from "./ui.jsx";
import { Stack } from "./layout";

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
        <Stack>
          <SectionHeading eyebrow="Overview" title="Project summary" compact />
          <p className="subtle" style={{ margin: 0 }}>Last updated today</p>
          <CardActions>
            <Button variant="secondary">Cancel</Button>
            <Button>Save changes</Button>
          </CardActions>
        </Stack>
      </Card>
    </div>
  ),
};
