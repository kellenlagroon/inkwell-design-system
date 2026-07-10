import { Button, EmptyState, Panel, SectionHeading } from "./ui.jsx";

export default {
  title: "Components/Panel/Features",
};

export const PanelDefault = {
  render: () => (
    <Panel>
      <SectionHeading eyebrow="League setup" title="Storybook Dynasty" />
      <p className="helper-text">Panels wrap major content regions across vote, commissioner, and results views.</p>
    </Panel>
  ),
};

export const SectionHeadingDefault = {
  render: () => (
    <SectionHeading eyebrow="Current voter" title="UCF Knights">
      <Button variant="secondary">Action</Button>
    </SectionHeading>
  ),
};

export const SectionHeadingCompact = {
  render: () => <SectionHeading title="Poll rounds" compact />,
};

export const EmptyStateDefault = {
  render: () => (
    <EmptyState>
      <strong>Join or create a league before voting.</strong>
      <div className="subtle top-gap">Open a private invite link to join an existing league.</div>
    </EmptyState>
  ),
};
