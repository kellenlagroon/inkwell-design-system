# Inkwell

Inkwell is a standalone design-system seed created from the strongest reusable UI in the current app.

This folder is intentionally isolated from the live app:

- it has its own `package.json`
- it has its own Storybook config
- it has its own token source and styles
- it does not change the current app's imports, routing, state, or runtime behavior

## Commands

```bash
npm install
npm run tokens
npm run storybook
npm run build-storybook
npm run typecheck
npm run test
```

## Themes and tokens

Inkwell ships with dark mode as the default theme and supports light mode via
the `data-theme` attribute. Apply it at the application root:

```tsx
document.documentElement.dataset.theme = "light";
```

Set the value to `"dark"` to return to the default theme. In Storybook, use
the paintbrush toolbar control to switch the preview canvas between Dark and
Light; the Storybook navigation and Docs chrome remain unchanged.

The token source of truth is
[`tokens/inkwell.tokens.json`](tokens/inkwell.tokens.json). Run `npm run tokens`
after changing it. `src/styles/tokens.css` is generated output and should not
be edited by hand.

## Install

```bash
npm install @lagroon/inkwell-design-system
```

Import the stylesheet once at your app root:

```tsx
import "@lagroon/inkwell-design-system/styles.css";
```

Then import components from the package entry point:

```tsx
import { Button, TextInput } from "@lagroon/inkwell-design-system";
```
