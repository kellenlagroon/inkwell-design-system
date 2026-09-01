import { IconList } from "./icons";
import { ControlTrigger } from "../index";

export default { title: "Components/ControlTrigger", component: ControlTrigger };

export const Playground = {
  args: { value: "All programs", count: 3 },
  render: (args) => <ControlTrigger {...args} leading={<IconList />} />,
};
