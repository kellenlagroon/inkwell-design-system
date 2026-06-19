import { Button, IconButton } from "./ui.jsx";

export default {
  title: "Components/Button/Features",
};

export const PrimaryButton = {
  render: () => <Button>Save ballot</Button>,
};

export const SecondaryButton = {
  render: () => <Button className="secondary-button">Manage teams</Button>,
};

export const GhostButton = {
  render: () => <Button className="ghost-button">Cancel</Button>,
};

export const DangerButton = {
  render: () => <Button className="danger-button">Delete league</Button>,
};

export const DisabledButton = {
  render: () => <Button disabled>Save ballot</Button>,
};

export const ButtonSizes = {
  render: () => (
    <div style={{ display: "grid", gap: "24px" }}>
      {["primary-button", "secondary-button", "ghost-button", "danger-button"].map((variant) => (
        <div key={variant}>
          <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "8px" }}>
            {variant.replace("-button", "")}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {["xs", "sm", "md", "lg", "xl"].map((size) => (
              <div key={size} style={{ display: "grid", gap: "4px", justifyItems: "center" }}>
                <Button className={`${variant}${size !== "md" ? ` button--${size}` : ""}`}>
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
      <Button className="primary-button">Publish results</Button>
      <Button className="secondary-button">Manage roster</Button>
      <Button className="ghost-button">Cancel</Button>
      <span style={{ flex: 1 }} />
      <Button className="ghost-button" style={{ color: "var(--color-danger, #c83f4a)" }}>Delete round</Button>
    </div>
  ),
};

export const TextIconLeft = {
  name: "Text + icon — left",
  render: () => (
    <div style={{ display: "grid", gap: "16px" }}>
      {[
        ["primary-button", [["ti-plus", "New round"], ["ti-send", "Publish results"], ["ti-check", "Save changes"]]],
        ["secondary-button", [["ti-pencil", "Edit roster"], ["ti-settings", "Settings"], ["ti-download", "Export"]]],
        ["ghost-button", [["ti-x", "Cancel"], ["ti-trash", "Remove"], ["ti-arrow-left", "Back"]]],
      ].map(([variant, items]) => (
        <div key={variant} style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {items.map(([icon, label]) => (
            <Button key={label} className={variant}>
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
        ["primary-button", [["New round", "ti-plus"], ["Publish results", "ti-send"], ["Continue", "ti-arrow-right"]]],
        ["secondary-button", [["Edit roster", "ti-pencil"], ["Settings", "ti-settings"], ["Export", "ti-download"]]],
        ["ghost-button", [["Cancel", "ti-x"], ["Remove", "ti-trash"], ["Next", "ti-arrow-right"]]],
      ].map(([variant, items]) => (
        <div key={variant} style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {items.map(([label, icon]) => (
            <Button key={label} className={variant}>
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
              <IconButton icon="ti-dots-vertical" size={size} />
              <span style={{ fontSize: "10px", color: "var(--muted)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "8px" }}>Common icons</p>
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {["ti-eye", "ti-dots-vertical", "ti-pencil", "ti-trash", "ti-settings", "ti-copy", "ti-share", "ti-refresh", "ti-plus", "ti-x", "ti-check", "ti-arrow-right"].map((icon) => (
            <IconButton key={icon} icon={icon} />
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "8px" }}>Disabled</p>
        <div style={{ display: "flex", gap: "4px" }}>
          <IconButton icon="ti-eye" disabled />
          <IconButton icon="ti-dots-vertical" disabled />
          <IconButton icon="ti-pencil" disabled />
        </div>
      </div>
    </div>
  ),
};
