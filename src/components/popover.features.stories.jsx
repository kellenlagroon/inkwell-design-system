import { Button, Checkbox, Heading, Popover, PopoverMenuItem, Text } from "../index";

const MOBILE_VIEWPORTS = {
  mobile320: {
    name: "Mobile 320",
    styles: { width: "320px", height: "568px" },
    type: "mobile",
  },
};

function Trigger({ label, ...props }) {
  return (
    <Button variant="secondary" {...props}>
      {label}
    </Button>
  );
}

function PlacementDemo({ label, placement, style }) {
  return (
    <div style={{ position: "absolute", ...style }}>
      <Popover
        defaultOpen
        placement={placement}
        ariaLabel={`${label} placement`}
        trigger={({ ref, open, onToggle, ...triggerProps }) => (
          <Trigger ref={ref} {...triggerProps} aria-expanded={open} onClick={onToggle} label={label} />
        )}
      >
        <div style={{ display: "grid", gap: 4, maxWidth: 156 }}>
          <strong>{label}</strong>
          <span className="subtle">Anchored on the {label.toLowerCase()} side.</span>
        </div>
      </Popover>
    </div>
  );
}

export default {
  title: "Components/Popover/Features",
  parameters: {
    viewport: { options: MOBILE_VIEWPORTS },
  },
};

export const Content = {
  render: () => (
    <div style={{ padding: 80 }}>
      <Popover
        ariaLabel="More filters"
        trigger={({ ref, open, onToggle, ...triggerProps }) => (
          <Trigger ref={ref} {...triggerProps} aria-expanded={open} onClick={onToggle} label="More filters" />
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

export const Menu = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "flex-end", padding: 80 }}>
      <Popover
        mode="menu"
        placement="bottom-end"
        ariaLabel="Account actions"
        trigger={({ ref, open, onToggle, ...triggerProps }) => (
          <Trigger ref={ref} {...triggerProps} aria-expanded={open} onClick={onToggle} label="Account" />
        )}
      >
        <div className="ink-popover-label">
          <strong>Account</strong>
          <span>Manage profile and access</span>
        </div>
        <PopoverMenuItem>Profile settings</PopoverMenuItem>
        <PopoverMenuItem>Sign out</PopoverMenuItem>
      </Popover>
    </div>
  ),
};

export const ComposedFilterList = {
  name: "Composed filter list",
  render: () => (
    <div style={{ padding: 80 }}>
      <Popover
        overflow="visible"
        ariaLabel="Program filters"
        trigger={({ ref, open, onToggle, ...triggerProps }) => (
          <Trigger ref={ref} {...triggerProps} aria-expanded={open} onClick={onToggle} label="Filter programs" />
        )}
      >
        <div style={{ display: "grid", gap: 8, width: 280 }}>
          <Text size="sm" tone="secondary">The list owns its scroll area; the panel stays visible.</Text>
          <div style={{ maxHeight: 180, overflow: "auto", display: "grid", gap: 4 }}>
            {Array.from({ length: 12 }, (_, index) => <Checkbox key={index} label={`Program ${index + 1}`} />)}
          </div>
          <Button size="sm">Apply filters</Button>
        </div>
      </Popover>
    </div>
  ),
};

export const AllSides = {
  render: () => (
    <div style={{ display: "grid", placeItems: "center", padding: 48 }}>
      <div style={{ position: "relative", width: "min(100%, 720px)", minHeight: 540 }}>
        <PlacementDemo label="Top" placement="top" style={{ top: 208, left: "50%", transform: "translateX(-50%)" }} />
        <PlacementDemo label="Right" placement="right" style={{ top: 270, left: "calc(50% + 104px)" }} />
        <PlacementDemo label="Bottom" placement="bottom" style={{ top: 332, left: "50%", transform: "translateX(-50%)" }} />
        <PlacementDemo label="Left" placement="left" style={{ top: 270, right: "calc(50% + 104px)" }} />
        <span
          style={{
            position: "absolute",
            top: 282,
            left: "50%",
            display: "grid",
            width: 72,
            height: 72,
            placeItems: "center",
            transform: "translateX(-50%)",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: "var(--radius-sharp)",
            color: "var(--color-text-secondary)",
            fontSize: "var(--font-size-sm)",
            fontWeight: "var(--font-weight-semibold)",
          }}
        >
          Anchor
        </span>
      </div>
    </div>
  ),
};

export const MobileSheet = {
  globals: { viewport: { value: "mobile320", isRotated: false } },
  render: () => (
    <div style={{ padding: 80 }}>
      <Popover
        mobileSheet
        ariaLabel="Filter options"
        trigger={({ ref, open, onToggle, ...triggerProps }) => (
          <Trigger ref={ref} {...triggerProps} aria-expanded={open} onClick={onToggle} label="Open filters" />
        )}
      >
        <div className="ink-popover-mobile-sheet__body">
          <div className="ink-popover-mobile-sheet__heading">
            <div>
              <Heading level={2} size="sm">Filters</Heading>
              <Text size="sm" tone="secondary">Choose the results you want to see.</Text>
            </div>
            <Button variant="ghost" size="sm">Clear</Button>
          </div>
          <Checkbox label="Remote" />
          <Checkbox label="Recently updated" />
        </div>
        <div className="ink-popover-mobile-sheet__footer">
          <Text size="sm" tone="secondary">2 filters available</Text>
          <Button size="sm">Apply filters</Button>
        </div>
      </Popover>
    </div>
  ),
};
