import { Button, IconButton } from "./ui.jsx";

export default {
  title: "Components/Button/Features",
};

export const PrimaryButton = {
  render: () => <Button>Save changes</Button>,
};

export const SecondaryButton = {
  render: () => <Button variant="secondary">Manage items</Button>,
};

export const GhostButton = {
  render: () => <Button variant="ghost">Cancel</Button>,
};

export const DangerButton = {
  render: () => <Button variant="danger">Delete project</Button>,
};

export const DisabledButton = {
  render: () => <Button disabled>Save changes</Button>,
};

export const ButtonSizes = {
  render: () => (
    <div style={{ display: "grid", gap: "24px" }}>
      {["primary", "secondary", "ghost", "danger"].map((variant) => (
        <div key={variant}>
          <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "8px" }}>
            {variant}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {["xs", "sm", "md", "lg", "xl"].map((size) => (
              <div key={size} style={{ display: "grid", gap: "4px", justifyItems: "center" }}>
                <Button variant={variant} size={size}>
                  Label
                </Button>
                <span style={{ fontSize: "10px", color: "var(--muted)" }}>{size}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const ButtonHierarchy = {
  name: "Hierarchy — primary / secondary / ghost",
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Button variant="primary">Publish results</Button>
      <Button variant="secondary">Manage directory</Button>
      <Button variant="ghost">Cancel</Button>
      <span style={{ flex: 1 }} />
      <Button variant="ghost" style={{ color: "var(--color-danger, #c83f4a)" }}>Delete cycle</Button>
    </div>
  ),
};

export const TextIconLeft = {
  name: "Text + icon — left",
  render: () => (
    <div style={{ display: "grid", gap: "16px" }}>
      {[
        ["primary", [["ti-plus", "New item"], ["ti-send", "Publish results"], ["ti-check", "Save changes"]]],
        ["secondary", [["ti-pencil", "Edit directory"], ["ti-settings", "Settings"], ["ti-download", "Export"]]],
        ["ghost", [["ti-x", "Cancel"], ["ti-trash", "Remove"], ["ti-arrow-left", "Back"]]],
      ].map(([variant, items]) => (
        <div key={variant} style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {items.map(([icon, label]) => (
            <Button key={label} variant={variant}>
              <i className={`ti ${icon}`} />{label}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const TextIconRight = {
  name: "Text + icon — right",
  render: () => (
    <div style={{ display: "grid", gap: "16px" }}>
      {[
        ["primary", [["New item", "ti-plus"], ["Publish results", "ti-send"], ["Continue", "ti-arrow-right"]]],
        ["secondary", [["Edit directory", "ti-pencil"], ["Settings", "ti-settings"], ["Export", "ti-download"]]],
        ["ghost", [["Cancel", "ti-x"], ["Remove", "ti-trash"], ["Next", "ti-arrow-right"]]],
      ].map(([variant, items]) => (
        <div key={variant} style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {items.map(([label, icon]) => (
            <Button key={label} variant={variant}>
              {label}<i className={`ti ${icon}`} />
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const IconButtonStory = {
  name: "Icon button",
  render: () => (
    <div style={{ display: "grid", gap: "24px" }}>
      <div>
        <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "8px" }}>Sizes</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "16px" }}>
          {[
            ["sm", "28px"],
            [undefined, "36px (default)"],
            ["lg", "44px"],
          ].map(([size, label]) => (
            <div key={label} style={{ display: "grid", gap: "6px", justifyItems: "center" }}>
              <IconButton icon={<i className="ti ti-dots-vertical" />} size={size} aria-label="More actions" />
              <span style={{ fontSize: "10px", color: "var(--muted)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "8px" }}>Common icons</p>
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {["ti-eye", "ti-dots-vertical", "ti-pencil", "ti-trash", "ti-settings", "ti-copy", "ti-share", "ti-refresh", "ti-plus", "ti-x", "ti-check", "ti-arrow-right"].map((icon) => (
            <IconButton key={icon} icon={<i className={`ti ${icon}`} />} aria-label={icon.replace("ti-", "")} />
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "8px" }}>Disabled</p>
        <div style={{ display: "flex", gap: "4px" }}>
          <IconButton icon={<i className="ti ti-eye" />} aria-label="View" disabled />
          <IconButton icon={<i className="ti ti-dots-vertical" />} aria-label="More" disabled />
          <IconButton icon={<i className="ti ti-pencil" />} aria-label="Edit" disabled />
        </div>
      </div>
    </div>
  ),
};
