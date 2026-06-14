import "../src/styles/tokens.css";
import "../src/styles/inkwell.css";

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    layout: "padded",
    options: {
      storySort: {
        order: ["Foundations", "Components", "Guidance"],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
