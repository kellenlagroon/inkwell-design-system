import { Button, ControlGroup, TextInput } from "../index";

export default { title: "Layout/ControlGroup/Features" };
export const Responsive = { render: () => <ControlGroup stackBelow="md" start={<TextInput aria-label="Keyword" />} end={<Button>Apply</Button>} /> };
