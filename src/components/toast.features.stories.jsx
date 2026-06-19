import { Toast, ToastRegion } from "./ui.jsx";

export default {
  title: "Components/Toast/Features",
};

export const ToastSuccess = {
  render: () => <Toast id="t1" message="Ballot saved." tone="success" onDismiss={() => {}} />,
};

export const ToastError = {
  render: () => <Toast id="t2" message="Something went wrong. Try again." tone="error" onDismiss={() => {}} />,
};

export const ToastWarning = {
  render: () => <Toast id="t3" message="Invite link will expire in 72 hours." tone="warning" onDismiss={() => {}} />,
};

export const ToastRegionMultiple = {
  render: () => (
    <ToastRegion
      toasts={[
        { id: "t1", message: "Ballot saved.", tone: "success" },
        { id: "t2", message: "League created.", tone: "success" },
        { id: "t3", message: "Session expired.", tone: "error" },
      ]}
      onDismiss={() => {}}
    />
  ),
};

export const ToastRegionEmpty = {
  render: () => <ToastRegion toasts={[]} onDismiss={() => {}} />,
};
