import { useState } from "react";
import { Button, IconButton } from "./ui";
import { TextButton, TextDisclosure } from "./button";
import {
  IconArrowDown,
  IconAward,
  IconCheck,
  IconClose,
  IconCopy,
  IconDotsVertical,
  IconEye,
  IconLogout,
  IconRestart,
  IconSettings,
  IconTrophy,
  IconUsers,
} from "./icons.jsx";

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

export const TextButtonStory = {
  name: "Text button",
  render: () => <TextButton>Show full description</TextButton>,
};

function DescriptionDisclosure() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ display: "grid", gap: 8, maxWidth: 520 }}>
      <p id="review-description" hidden={!expanded} style={{ margin: 0 }}>
        Review the record, its attachments, and any open questions before
        marking the review complete.
      </p>
      <TextDisclosure
        expanded={expanded}
        controls="review-description"
        collapsedLabel="Show full description"
        expandedLabel="Show less"
        onExpandedChange={setExpanded}
      />
    </div>
  );
}

export const TextDisclosureStory = {
  name: "Text disclosure",
  render: () => <DescriptionDisclosure />,
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
      <Button variant="primary">Publish changes</Button>
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
        ["primary", [[IconAward, "View milestones"], [IconRestart, "Restart task"], [IconCheck, "Save changes"]]],
        ["secondary", [[IconEye, "View directory"], [IconSettings, "Settings"], [IconCopy, "Duplicate"]]],
        ["ghost", [[IconClose, "Cancel"], [IconLogout, "Sign out"], [IconArrowDown, "Show more"]]],
      ].map(([variant, items]) => (
        <div key={variant} style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {items.map(([Icon, label]) => (
            <Button key={label} variant={variant}>
              <Icon />{label}
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
        ["primary", [["View milestones", IconAward], ["Restart task", IconRestart], ["Save changes", IconCheck]]],
        ["secondary", [["View directory", IconEye], ["Settings", IconSettings], ["Duplicate", IconCopy]]],
        ["ghost", [["Cancel", IconClose], ["Sign out", IconLogout], ["Show more", IconArrowDown]]],
      ].map(([variant, items]) => (
        <div key={variant} style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {items.map(([label, Icon]) => (
            <Button key={label} variant={variant}>
              {label}<Icon />
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
            ["sm", "36px"],
            [undefined, "44px (default)"],
          ].map(([size, label]) => (
            <div key={label} style={{ display: "grid", gap: "6px", justifyItems: "center" }}>
              <IconButton icon={<IconDotsVertical />} size={size} aria-label="More actions" />
              <span style={{ fontSize: "10px", color: "var(--muted)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "8px" }}>Common icons</p>
        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {[
            ["View", IconEye], ["More actions", IconDotsVertical], ["Settings", IconSettings],
            ["Copy", IconCopy], ["Restart", IconRestart], ["View milestones", IconAward],
            ["Highlights", IconTrophy], ["Members", IconUsers], ["Cancel", IconClose],
            ["Confirm", IconCheck], ["Show more", IconArrowDown], ["Sign out", IconLogout],
          ].map(([label, Icon]) => (
            <IconButton key={label} icon={<Icon />} aria-label={label} />
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", marginBottom: "8px" }}>Disabled</p>
        <div style={{ display: "flex", gap: "4px" }}>
          <IconButton icon={<IconEye />} aria-label="View" disabled />
          <IconButton icon={<IconDotsVertical />} aria-label="More actions" disabled />
          <IconButton icon={<IconSettings />} aria-label="Settings" disabled />
        </div>
      </div>
    </div>
  ),
};
