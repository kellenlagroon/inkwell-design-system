import { Avatar } from "./avatar";

// Inline SVG data URI so the image renders without any network request.
const SAMPLE_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='88' height='88'>
       <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
         <stop offset='0' stop-color='#9a1f2b'/><stop offset='1' stop-color='#f0b429'/>
       </linearGradient></defs>
       <rect width='88' height='88' fill='url(#g)'/>
       <text x='50%' y='56%' text-anchor='middle' font-family='sans-serif' font-size='34' fill='white'>KL</text>
     </svg>`,
  );

export default {
  title: "Components/Avatar/Features",
};

export const Initials = {
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar name="Kellen Lagroon" />
      <Avatar name="Georgia Bulldogs" />
      <Avatar name="Ohio" />
    </div>
  ),
};

export const Image = {
  render: () => (
    <div style={{ padding: 24 }}>
      <Avatar name="Kellen Lagroon" src={SAMPLE_IMAGE} />
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar name="Kellen Lagroon" size="sm" />
      <Avatar name="Kellen Lagroon" size="md" />
      <Avatar name="Kellen Lagroon" size="lg" />
    </div>
  ),
};

export const Shapes = {
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar name="Kellen Lagroon" shape="circle" />
      <Avatar name="Team Logo" shape="square" src={SAMPLE_IMAGE} />
    </div>
  ),
};

export const WithName = {
  name: "Decorative beside a name",
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 8, alignItems: "center", color: "var(--color-text-primary)" }}>
      <Avatar name="Kellen Lagroon" decorative />
      <span>Kellen Lagroon</span>
    </div>
  ),
};
