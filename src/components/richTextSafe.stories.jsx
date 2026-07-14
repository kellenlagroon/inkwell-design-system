import { RichTextSafe } from "./richTextSafe";

export default {
  title: "Components/RichTextSafe",
};

export const Playground = {
  args: {
    collapsed: false,
  },
  argTypes: {
    collapsed: { control: "boolean" },
  },
  render: ({ collapsed }) => (
    <div style={{ padding: 24, maxWidth: 620 }}>
      <RichTextSafe collapsed={collapsed}>
        <h2>About the role</h2>
        <p>This container styles sanitized HTML owned by the consuming app.</p>
        <ul>
          <li>Write production React components.</li>
          <li>Work with design systems and accessibility.</li>
        </ul>
        <p><a href="https://example.com">Read more</a></p>
      </RichTextSafe>
    </div>
  ),
};
