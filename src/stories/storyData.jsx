import {
  IconAward,
  IconCopy,
  IconDotsVertical,
  IconEye,
  IconList,
  IconRestart,
  IconSettings,
  IconShirt,
} from "../components/icons.jsx";

export const selectOptions = [
  { value: "daily", label: "Daily digest" },
  { value: "weekly", label: "Weekly summary" },
  { value: "monthly", label: "Monthly snapshot" },
  { value: "custom", label: "Custom cadence", disabled: true },
];

export const toastExamples = [
  { id: "a1", message: "Changes published", tone: "success" },
  { id: "b2", message: "Review required", tone: "warning" },
  { id: "c3", message: "Publish failed", tone: "error" },
];

export const splitButtonItems = [
  {
    label: "New campaign",
    description: "Start from a blank project",
    icon: <IconAward />,
    iconBg: "rgba(216, 97, 93, 0.14)",
    iconColor: "#ef7d77",
  },
  {
    label: "Import structure",
    description: "Bring in an existing outline",
    icon: <IconList />,
    iconBg: "rgba(124, 161, 196, 0.14)",
    iconColor: "#9bc1e7",
  },
  {
    label: "Template starter",
    description: "Use a prebuilt setup",
    icon: <IconShirt />,
    iconBg: "rgba(103, 190, 138, 0.14)",
    iconColor: "#9fe2bb",
  },
];

export const iconGallery = [
  <IconEye key="eye" />,
  <IconDotsVertical key="dots" />,
  <IconSettings key="settings" />,
  <IconCopy key="copy" />,
  <IconRestart key="restart" />,
];
