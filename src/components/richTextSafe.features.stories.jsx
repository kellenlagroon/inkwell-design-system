import { RichTextSafe } from "./richTextSafe";

export default {
  title: "Components/RichTextSafe/Features",
};

const CONTENT = (
  <>
    <h2>About the role</h2>
    <p>This container styles sanitized rich HTML without owning sanitization.</p>
    <h3>What you will do</h3>
    <ul>
      <li>Build accessible interfaces.</li>
      <li>Collaborate with design systems.</li>
    </ul>
    <p><a href="https://example.com">External posting</a></p>
  </>
);

export const Default = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 620 }}>
      <RichTextSafe>{CONTENT}</RichTextSafe>
    </div>
  ),
};

export const Collapsed = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 620 }}>
      <RichTextSafe collapsed>{CONTENT}</RichTextSafe>
    </div>
  ),
};
