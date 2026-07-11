import { Avatar } from "./avatar";

export default {
  title: "Components/Avatar",
};

export const Playground = {
  args: {
    name: "Kellen Lagroon",
    src: "",
    size: "md",
    shape: "circle",
  },
  argTypes: {
    name: { control: "text" },
    src: { control: "text" },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    shape: { control: "inline-radio", options: ["circle", "square"] },
  },
  render: ({ name, src, size, shape }) => (
    <div style={{ padding: 24 }}>
      <Avatar name={name} src={src || undefined} size={size} shape={shape} />
    </div>
  ),
};
