import { StatusBanner } from "./ui.jsx";

export default {
  title: "Components/StatusBanner/Features",
};

export const BannerSuccess = {
  render: () => <StatusBanner message="Changes saved successfully." tone="success" />,
};

export const BannerWarning = {
  render: () => <StatusBanner message="Sign in before joining this private project." tone="warning" />,
};

export const BannerError = {
  render: () => <StatusBanner message="That item is already linked to another account." tone="error" />,
};

export const BannerWithDismiss = {
  render: () => <StatusBanner message="Joined Sample Project. Finish setup to get started." tone="success" onDismiss={() => {}} />,
};

export const BannerNoMessage = {
  render: () => <StatusBanner message="" tone="success" />,
};
