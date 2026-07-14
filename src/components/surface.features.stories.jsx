import { Button, Center, Container, EmptyState, Heading, Panel, SectionHeading, Surface, Text } from "../index";

export default {
  title: "Components/Surface/Features",
};

export const Tones = {
  render: () => (
    <div style={{ padding: 24, display: "grid", gap: 16, maxWidth: 720 }}>
      <Surface><Text>Default surface</Text></Surface>
      <Surface tone="raised"><Text>Raised surface</Text></Surface>
      <Surface tone="muted"><Text>Muted surface</Text></Surface>
    </div>
  ),
};

export const CenteredLayout = {
  render: () => (
    <Container size="md">
      <Center minHeight="320px">
        <Surface tone="raised" style={{ width: "min(100%, 420px)" }}>
          <Heading level={2}>Auth layout</Heading>
          <Text tone="muted">Container, Center, and Surface compose centered panels.</Text>
        </Surface>
      </Center>
    </Container>
  ),
};

export const PanelDefault = {
  name: "Panel",
  render: () => (
    <Panel>
      <SectionHeading eyebrow="League setup" title="Storybook Dynasty" />
      <p className="helper-text">Panels wrap major content regions across vote, commissioner, and results views.</p>
    </Panel>
  ),
};

export const SectionHeadingDefault = {
  name: "Section heading",
  render: () => (
    <SectionHeading eyebrow="Current voter" title="UCF Knights">
      <Button variant="secondary">Action</Button>
    </SectionHeading>
  ),
};

export const SectionHeadingCompact = {
  name: "Section heading — compact",
  render: () => <SectionHeading title="Poll rounds" compact />,
};

export const EmptyStateDefault = {
  name: "Empty state",
  render: () => (
    <EmptyState>
      <strong>Join or create a league before voting.</strong>
      <div className="subtle top-gap">Open a private invite link to join an existing league.</div>
    </EmptyState>
  ),
};
