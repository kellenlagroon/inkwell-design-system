import "../src/styles/tokens.css";
import "../src/styles/inkwell.css";

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    layout: "fullscreen",
    options: {
      storySort: {
        order: ["Foundations", "Components", "Patterns"],
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
