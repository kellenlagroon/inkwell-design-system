import { ExpandableContent, RichTextSafe } from "../index";

export default { title: "Components/ExpandableContent" };

export const Playground = {
  args: {
    collapsedHeight: 96,
    collapseThreshold: 160,
    collapsedLabel: "Show more",
    expandedLabel: "Show less",
  },
  argTypes: {
    collapsedHeight: { control: { type: "number", min: 0 } },
    collapseThreshold: { control: { type: "number", min: 0 } },
    collapsedLabel: { control: "text" },
    expandedLabel: { control: "text" },
  },
  render: (args) => (
    <div style={{ maxWidth: 520 }}>
      <ExpandableContent {...args}>
        <RichTextSafe>
          <h2>Project overview</h2>
          <p>The team is updating the shared resource library so people can find the guides they need.</p>
          <p>The first phase will organize existing materials and identify gaps. The second will add new guides and test the navigation.</p>
          <p>Read the <a href="#project-plan">project plan</a> for milestones, owners, and upcoming review dates.</p>
        </RichTextSafe>
      </ExpandableContent>
    </div>
  ),
};
