import { Button, EmptyState, Panel, SectionHeading } from "./ui.jsx";

export default {
  title: "Components/Panel/Features",
};

export const SectionHeadingFeature = {
  name: "Section heading",
  render: () => (
    <Panel>
      <SectionHeading eyebrow="Overview" title="Workspace summary" copy="Use a panel to hold grouped content, then add a section heading when the content needs title, copy, or actions." />
    </Panel>
  ),
};

export const WithActions = {
  render: () => (
    <Panel>
      <SectionHeading eyebrow="Actions" title="Release plan">
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Button>Publish</Button>
          <Button className="secondary-button">Preview</Button>
        </div>
      </SectionHeading>
      <p>Use panel sections to group content and adjacent actions without introducing a full page pattern.</p>
    </Panel>
  ),
};

export const EmptyStateFeature = {
  name: "Empty state",
  render: () => (
    <Panel>
      <EmptyState>
        <h3 style={{ margin: 0 }}>No collaborators yet</h3>
        <p style={{ margin: 0 }}>Empty states should explain what is missing and what the next useful action is.</p>
        <Button>Invite people</Button>
      </EmptyState>
    </Panel>
  ),
};
