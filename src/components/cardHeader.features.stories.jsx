import { Badge, Card, CardHeader } from "../index";

export default { title: "Components/CardHeader/Features" };
export const LongTitle = { render: () => <Card style={{ maxWidth: 420 }}><CardHeader title="A long title that wraps without separating its badges from the title" metadata="Updated yesterday" badges={<Badge>Interviewing</Badge>} /></Card> };
