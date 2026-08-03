# Inkwell

Inkwell is a React design system: typed components, a three-tier token pipeline,
and one stylesheet. It is published as `@lagroon/inkwell-design-system` and is
designed to sit inside an application without taking over its styling.

- Components are typed and render against a global stylesheet — no CSS-in-JS.
- Tokens are generated from a single JSON source and themed via `data-theme`.
- All shipped CSS lives in cascade layers, so your own CSS overrides it without
  a specificity fight. See [Overriding](#overriding-and-theming).
- Nothing outside your own markup is styled unless you opt in.

## Commands

```bash
npm install
npm run tokens           # regenerate tokens.css from the JSON source
npm run storybook        # dev server on port 6100
npm run build-storybook  # static Storybook
npm run build            # library build to dist/ (JS, types, bundled CSS)
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

### Source-owned CLI (personal projects)

For a project that should own and freely edit its Inkwell component source, use
the package's CLI command:

```bash
npx @lagroon/inkwell-design-system init
npx @lagroon/inkwell-design-system add button card action-group
```

`init` creates `inkwell.json`, a single layered stylesheet at
`src/components/inkwell/inkwell.css`, and `inkwell.ai.md`: compact guidance
for coding agents. Reference that user-owned file from your project's
`AGENTS.md`, `CLAUDE.md`, Cursor rules, or equivalent; the CLI never alters
those project instruction files. `add` copies only production `.tsx`
source (plus declared source dependencies such as Button's Spinner) into
`src/components/inkwell`; it never writes tests or Storybook files. Import that
stylesheet once at the application root. The configuration can change both
paths before the first `add`.

Installed component files are yours. The CLI refuses to overwrite an existing
component or configuration; it only appends new, registry-owned CSS fragments
to the stylesheet it created. See [CLI distribution](docs/cli.md) for migration
guidance and limitations.

### npm package (versioned dependency)

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

That styles Inkwell's components and nothing else. The stylesheet deliberately
does not touch your `<body>` or your native form controls. To adopt Inkwell's
page canvas — its background, text colour, and font — opt in on your app root:

```html
<body class="inkwell-page">
```

Leave it off and the rest of your page is untouched.

## Overriding and theming

Everything Inkwell ships lives in a cascade layer, and unlayered CSS beats
layered CSS whatever the specificity. Your application's own CSS therefore wins
by default:

```css
/* One class. No !important. Beats Inkwell. */
.primary-button { border-radius: 999px; }
```

If your app organises its own CSS into layers, position Inkwell explicitly:

```css
@layer reset, vendor, app;
@import url("@lagroon/inkwell-design-system/styles.css") layer(vendor);
```

To re-skin rather than restyle, override a token — one change reaches every
component that uses it:

```css
:root { --color-brand: rebeccapurple; }
```

The layers are `inkwell.tokens`, `inkwell.base`, and `inkwell.components`,
namespaced so they cannot collide with layers of your own. Full detail is in
Storybook under **Foundations → Overriding Inkwell**.

## Documentation

Run `npm run storybook` and start at **Foundations → Overview**. Token structure
is under **Tokens → Getting Started**; component APIs are under **Components**.

For AI coding tools, the versioned guidance is also available in the installed
package at `@lagroon/inkwell-design-system/ai.md`. Source-owned installations
receive the same content as `inkwell.ai.md` at the project root.

Release history and breaking changes are in [CHANGELOG.md](CHANGELOG.md).
