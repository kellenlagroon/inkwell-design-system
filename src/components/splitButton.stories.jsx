import { SplitButton } from "./splitButton.jsx";
import { splitButtonItems } from "../stories/storyData.jsx";

export default {
  title: "Components/Split Button",
};

export const SplitButtonPlayground = {
  name: "Playground",
  args: {
    primaryLabel: "Create new",
  },
  render: ({ primaryLabel }) => (
    <SplitButton primaryLabel={primaryLabel} onPrimaryClick={() => {}} items={splitButtonItems} />
  ),
};
