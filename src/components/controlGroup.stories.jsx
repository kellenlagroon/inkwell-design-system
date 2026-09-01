import { Button, ControlGroup, TextInput } from "../index";

export default { title: "Layout/ControlGroup" };
export const Playground = { render: () => <ControlGroup start={<TextInput aria-label="Search" placeholder="Search" />} end={<Button>Reset</Button>} /> };
