import { Badge, Button, CardHeader } from "../index";

export default { title: "Components/CardHeader" };
export const Playground = {
  render: () => <CardHeader title="Project brief" metadata="Updated today · Documentation" badges={<><Badge tone="brand">New</Badge><Badge>3 comments</Badge></>} actions={<Button size="sm">View</Button>} />,
};
