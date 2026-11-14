import { Button, IconCheck, IconEye, StatusDetailsPopover } from "../index";

export default { title: "Components/StatusDetailsPopover/Features" };

export const NeedsReview = {
  name: "Needs review",
  render: () => (
    <div style={{ padding: 80 }}>
      <StatusDetailsPopover
        label="Needs review"
        icon={<IconEye />}
        tone="warning"
        summary="Two sources disagree"
        description="Review the source before deciding which record to use."
        evidence={<a href="#source">Open source record</a>}
        actions={<><Button size="xs">Confirm</Button><Button size="xs" variant="ghost">Reject</Button></>}
      />
    </div>
  ),
};

export const Compact = {
  render: () => (
    <div style={{ padding: 80 }}>
      <StatusDetailsPopover label="Verified" icon={<IconCheck />} tone="success" description="Evidence is available." />
    </div>
  ),
};
