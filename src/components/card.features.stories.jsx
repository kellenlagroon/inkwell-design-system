import { Card, CardActions } from "./card";
import { SectionHeading, Button, Pill } from "./ui.jsx";
import { Grid } from "./layout";

export default {
  title: "Components/Card/Features",
};

export const Variants = {
  name: "Variants",
  render: () => (
    <div style={{ display: "grid", gap: 20, padding: 24, maxWidth: 420 }}>
      <Card>
        <SectionHeading eyebrow="plain (default)" title="Borderless, raised" compact />
        <p className="subtle" style={{ margin: 0 }}>The common app surface — no border, sits above the canvas.</p>
      </Card>
      <Card variant="outlined">
        <SectionHeading eyebrow="outlined" title="Subtle border" compact />
        <p className="subtle" style={{ margin: 0 }}>A hard edge for when there's no background contrast to rely on.</p>
      </Card>
    </div>
  ),
};

export const WithHeaderAndActions = {
  name: "Header + actions",
  render: () => (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <Card>
        <SectionHeading eyebrow="Poll round" title="Week 8 Coaches Poll" compact />
        <p className="subtle" style={{ margin: 0 }}>2026 Season · 25-slot ballot · top 25</p>
        <CardActions>
          <Button variant="secondary">Close voting</Button>
          <Button>Publish round</Button>
        </CardActions>
      </Card>
    </div>
  ),
};

export const DangerTone = {
  name: "Danger tone",
  render: () => (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <Card tone="danger">
        <SectionHeading title="Delete league" compact />
        <p className="subtle" style={{ margin: 0 }}>This permanently removes the league and every poll in it.</p>
        <CardActions>
          <Button variant="danger">Delete league</Button>
        </CardActions>
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
          ["Dynasty League", "open"],
          ["CFB Open", "closed"],
          ["Rivalry Bowl", "open"],
          ["Playoff Poll", "published"],
        ].map(([name, status]) => (
          <Card key={name}>
            <SectionHeading title={name} compact />
            <Pill tone={status === "open" ? "success" : status === "published" ? "default" : "warning"}>{status}</Pill>
          </Card>
        ))}
      </Grid>
    </div>
  ),
};
