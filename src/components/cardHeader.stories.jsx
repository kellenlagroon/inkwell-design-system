import { Badge, Button, CardHeader } from "../index";

export default { title: "Components/CardHeader" };
export const Playground = {
  render: () => <CardHeader title="Senior Product Designer" metadata="Remote · Full time" badges={<><Badge tone="brand">New</Badge><Badge>3 applicants</Badge></>} actions={<Button size="sm">View</Button>} />,
};
