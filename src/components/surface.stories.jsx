import { Center, Container, Surface, Heading, Text } from "../index";

export default {
  title: "Components/Surface",
};

export const Playground = {
  render: () => (
    <Container size="md">
      <Center minHeight="360px">
        <Surface tone="raised" style={{ width: "min(100%, 420px)" }}>
          <div style={{ display: "grid", gap: 8 }}>
            <Heading level={2}>Sign in</Heading>
            <Text tone="muted">A framed panel for auth and compact workflows.</Text>
          </div>
        </Surface>
      </Center>
    </Container>
  ),
};
