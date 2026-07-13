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
npm run storybook
npm run build-storybook
```

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
