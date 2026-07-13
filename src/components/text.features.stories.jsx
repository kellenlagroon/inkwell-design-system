import { Heading, Link, Text } from "./text";

export default {
  title: "Components/Text/Features",
};

export const TextTones = {
  render: () => (
    <div style={{ padding: 24, display: "grid", gap: 8 }}>
      <Text>Primary text</Text>
      <Text tone="muted">Muted text</Text>
      <Text tone="strong">Strong text</Text>
      <Text tone="danger">Danger text</Text>
      <Text tone="success">Success text</Text>
      <Text tone="warning">Warning text</Text>
    </div>
  ),
};

export const HeadingSizes = {
  render: () => (
    <div style={{ padding: 24, display: "grid", gap: 12 }}>
      <Heading size="xl">XL heading</Heading>
      <Heading size="lg">Large heading</Heading>
      <Heading>Medium heading</Heading>
      <Heading size="sm">Small heading</Heading>
    </div>
  ),
};

export const InlineLinks = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 560 }}>
      <Text>
        Read the <Link href="https://example.com" external>external posting</Link> before applying.
      </Text>
    </div>
  ),
};
