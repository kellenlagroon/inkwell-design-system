import { StatusBanner } from "./ui.jsx";

export default {
  title: "Components/Status Banner/Features",
};

export const DefaultBanner = {
  render: () => <StatusBanner message="Changes are saved automatically." onDismiss={() => {}} />,
};

export const WarningBanner = {
  render: () => <StatusBanner message="This configuration needs review before publishing." tone="warning" onDismiss={() => {}} />,
};

export const ErrorBanner = {
  render: () => <StatusBanner message="We could not complete the request." tone="error" onDismiss={() => {}} />,
};
