import { RichTextSafe } from "../index";

export default { title: "Components/RichTextSafe" };
export const Playground = {
  render: () => <RichTextSafe><h2>About this role</h2><p>Readable body copy with <a href="#details">a normal link</a> and <strong>explicit emphasis</strong>.</p></RichTextSafe>,
};
