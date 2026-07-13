import { Center, Container, Heading, Surface, Text } from "../index";

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

