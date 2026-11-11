import { Text, Heading, Link } from "./text";

export default {
  title: "Tokens/Typography/Utilities",
};

export const Playground = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 620, display: "grid", gap: 12 }}>
      <Heading level={1} size="xl">Record details</Heading>
      <Text tone="muted">Review notes, attachments, and next steps for this record.</Text>
      <Text>
        This is body text with an <Link href="https://example.com" external>external link</Link>.
      </Text>
      <Text tone="strong">Strong text</Text>
      <Text tone="danger">Danger text</Text>
    </div>
  ),
};
