import { ExpandableContent, RichTextSafe } from "../index";

export default { title: "Components/ExpandableContent/Features" };

export const ShortContent = {
  name: "Short content",
  render: () => <ExpandableContent><p>This fits without a disclosure control.</p></ExpandableContent>,
};

export const RichContent = {
  name: "Rich content with links",
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <ExpandableContent collapsedHeight={72} collapseThreshold={120}>
        <RichTextSafe>
          <p>The first paragraph stays visible in the excerpt.</p>
          <p>Longer details continue below the fold and can include <a href="#requirements">requirements</a>.</p>
          <ul><li>Work across teams</li><li>Document decisions</li><li>Keep improving the experience</li></ul>
        </RichTextSafe>
      </ExpandableContent>
    </div>
  ),
};
