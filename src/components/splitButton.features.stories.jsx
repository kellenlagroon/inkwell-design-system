import { Button } from "./ui.jsx";
import { SplitButton } from "./splitButton.jsx";
import { splitButtonItems } from "../stories/storyData.jsx";

export default {
  title: "Components/Split Button/Features",
};

export const Default = {
  render: () => <SplitButton primaryLabel="Create new" onPrimaryClick={() => {}} items={splitButtonItems} />,
};

export const SideBySideHierarchy = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
      <Button>Publish</Button>
      <SplitButton primaryLabel="Create new" onPrimaryClick={() => {}} items={splitButtonItems} />
    </div>
  ),
};
