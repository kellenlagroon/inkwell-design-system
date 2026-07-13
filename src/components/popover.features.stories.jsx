import { Button, Checkbox, Popover } from "../index";

export default {
  title: "Components/Popover/Features",
};

export const PositionedSurface = {
  render: () => (
    <div style={{ padding: 80 }}>
      <Popover
        placement="bottom-end"
        trigger={(props) => (
          <Button variant="secondary" {...props}>
            More filters
          </Button>
        )}
      >
        <div style={{ display: "grid", gap: 10 }}>
          <Checkbox label="Remote" />
          <Checkbox label="Recently updated" />
        </div>
      </Popover>
    </div>
  ),
};

export const TopPlacement = {
  render: () => (
    <div style={{ padding: 100 }}>
      <Popover
        placement="top-start"
        trigger={(props) => (
          <Button variant="secondary" {...props}>
            Open above
          </Button>
        )}
      >
        <span className="subtle">Popover content can be any surface content.</span>
      </Popover>
    </div>
  ),
};

