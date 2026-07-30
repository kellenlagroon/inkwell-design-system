import { Card, CardActions } from "./card";
import { SectionHeading, Button, Pill } from "./ui";
import { Grid, Stack } from "./layout";

export default {
  title: "Components/Card/Features",
};

export const Variants = {
  name: "Variants",
  render: () => (
    <div style={{ display: "grid", gap: 20, padding: 24, maxWidth: 420 }}>
      <Card>
        <Stack>
          <SectionHeading eyebrow="plain (default)" title="Borderless, raised" compact />
          <p className="subtle" style={{ margin: 0 }}>A raised surface with no visible border.</p>
        </Stack>
      </Card>
      <Card variant="outlined">
        <Stack>
          <SectionHeading eyebrow="outlined" title="Subtle border" compact />
          <p className="subtle" style={{ margin: 0 }}>A defined edge for low-contrast surroundings.</p>
        </Stack>
      </Card>
    </div>
  ),
};

export const WithHeaderAndActions = {
  name: "Header + actions",
  render: () => (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <Card>
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

export const DangerTone = {
  name: "Danger tone",
  render: () => (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <Card tone="danger">
        <Stack>
          <SectionHeading title="Remove item" compact />
          <p className="subtle" style={{ margin: 0 }}>This action cannot be undone.</p>
          <CardActions>
            <Button variant="danger">Remove</Button>
          </CardActions>
        </Stack>
      </Card>
    </div>
  ),
};

export const InAGrid = {
  name: "In a grid",
  render: () => (
    <div style={{ padding: 24, maxWidth: 640 }}>
      <Grid columns={2} gap="md">
        {[
          ["Workspace", "active"],
          ["Design system", "draft"],
          ["Product brief", "active"],
          ["Content library", "published"],
        ].map(([name, status]) => (
          <Card key={name}>
            <Stack>
              <SectionHeading title={name} compact />
              <Pill tone={status === "active" ? "success" : status === "published" ? "neutral" : "warning"}>{status}</Pill>
            </Stack>
          </Card>
        ))}
      </Grid>
    </div>
  ),
};
