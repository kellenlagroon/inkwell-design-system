import { ToastRegion } from "./ui.jsx";
import { toastExamples } from "../stories/storyData.jsx";

export default {
  title: "Components/Toast",
};

export const ToastPlayground = {
  name: "Playground",
  render: () => <ToastRegion toasts={[toastExamples[0]]} onDismiss={() => {}} />,
};
