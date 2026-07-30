import "../src/styles/tokens.css";
import "../src/styles/inkwell.css";
import "./docs-theme.css";

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  globalTypes: {
    theme: {
      description: "Preview color theme",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "dark", title: "Dark" },
          { value: "light", title: "Light" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "dark",
  },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset.theme = context.globals.theme;
      return <Story />;
    },
  ],
  parameters: {
    layout: "fullscreen",
    options: {
      storySort: {
        order: ["Foundations", "Tokens", "Component Status", "Patterns", "Layout", "Components"],
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
