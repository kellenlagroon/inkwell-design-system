import { Button, IconButton } from "./ui.jsx";
import { iconGallery } from "../stories/storyData.jsx";

export default {
  title: "Components/Button/Features",
};

export const PrimaryButton = {
  render: () => <Button>Save changes</Button>,
};

export const SecondaryButton = {
  render: () => <Button className="secondary-button">Review draft</Button>,
};

export const GhostButton = {
  render: () => <Button className="ghost-button">Cancel</Button>,
};

export const DangerButton = {
  render: () => <Button className="danger-button">Delete item</Button>,
};

export const ButtonSizes = {
  render: () => (
    <div style={{ display: "grid", gap: "24px" }}>
      {["primary-button", "secondary-button", "ghost-button", "danger-button"].map((variant) => (
        <div key={variant}>
          <p className="eyebrow">{variant.replace("-button", "")}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {["xs", "sm", "md", "lg", "xl"].map((size) => (
              <Button key={size} className={`${variant}${size !== "md" ? ` button--${size}` : ""}`}>
                {size}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const IconButtonStory = {
  name: "Icon button",
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
      {iconGallery.map((icon, index) => (
        <IconButton key={index} icon={icon} aria-label={`Action ${index + 1}`} />
      ))}
    </div>
  ),
};
