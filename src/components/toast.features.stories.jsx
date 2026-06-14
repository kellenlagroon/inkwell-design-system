import { ToastRegion } from "./ui.jsx";
import { toastExamples } from "../stories/storyData.jsx";

export default {
  title: "Components/Toast/Features",
};

export const ToneSet = {
  render: () => <ToastRegion toasts={toastExamples} onDismiss={() => {}} />,
};
