import { Button, Checkbox, Popover, PopoverMenuItem } from "../index";

const PLACEMENTS = [
  "top-start", "top", "top-end",
  "right-start", "right", "right-end",
  "bottom-start", "bottom", "bottom-end",
  "left-start", "left", "left-end",
];

export default {
  title: "Components/Popover",
};

export const Playground = {
  args: {
    mode: "content",
    placement: "bottom-start",
    mobileSheet: false,
    triggerLabel: "Filters",
    ariaLabel: "Filter options",
  },
  argTypes: {
    mode: { control: "inline-radio", options: ["content", "menu"] },
    placement: { control: "select", options: PLACEMENTS },
    mobileSheet: { control: "boolean" },
    triggerLabel: { control: "text" },
    ariaLabel: { control: "text", name: "Accessible label" },
  },
  render: ({ mode, placement, mobileSheet, triggerLabel, ariaLabel }) => (
    <div style={{ padding: 80 }}>
      <Popover
        mode={mode}
        placement={placement}
        mobileSheet={mobileSheet}
        ariaLabel={ariaLabel}
        trigger={({ ref, open, onToggle, ...triggerProps }) => (
          <Button ref={ref} variant="secondary" {...triggerProps} aria-expanded={open} onClick={onToggle}>
            {triggerLabel}
          </Button>
        )}
      >
        {mode === "menu" ? (
          <>
            <PopoverMenuItem>Save view</PopoverMenuItem>
            <PopoverMenuItem>Share view</PopoverMenuItem>
          </>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            <Checkbox label="Remote" />
            <Checkbox label="Recently updated" />
            <Button size="sm">Apply</Button>
          </div>
        )}
      </Popover>
    </div>
  ),
};
