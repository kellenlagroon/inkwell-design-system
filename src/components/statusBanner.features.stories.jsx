import { StatusBanner } from "./ui.jsx";

export default {
  title: "Components/StatusBanner/Features",
};

export const BannerSuccess = {
  render: () => <StatusBanner message="Ballot saved successfully." tone="success" />,
};

export const BannerWarning = {
  render: () => <StatusBanner message="Sign in before joining this private league invite." tone="warning" />,
};

export const BannerError = {
  render: () => <StatusBanner message="That team is already linked to another account." tone="error" />,
};

export const BannerWithDismiss = {
  render: () => <StatusBanner message="Joined Storybook Dynasty. Finish your team setup to start voting." tone="success" onDismiss={() => {}} />,
};

export const BannerNoMessage = {
  render: () => <StatusBanner message="" tone="success" />,
};
