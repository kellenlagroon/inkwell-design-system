import { RichTextSafe } from "../index";

export default { title: "Components/RichTextSafe/Features" };
export const DefensiveNesting = {
  render: () => <RichTextSafe dangerouslySetInnerHTML={{ __html: "<h2>Responsibilities</h2><ul><li><p>Nested block content stays body-sized.</p></li></ul><blockquote><p>Content remains consumer-owned.</p></blockquote><p><a href='#role'>Link</a> <b>bold</b></p>" }} />,
};
