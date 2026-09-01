# Inkwell guidance for coding agents

Use this file when creating or changing an interface that uses Inkwell. It is
the compact decision guide; the package types are the source of truth for the
exact component API.

## System contract

- Load `Source Sans 3` and `League Spartan` at weights 400–800 before the
  Inkwell stylesheet. Inkwell references those family names but does not bundle
  font files. For Google Fonts, use
  `@import url("https://fonts.googleapis.com/css2?family=League+Spartan:wght@400..800&family=Source+Sans+3:wght@400..800&display=swap");`
  as the first line of application CSS; self-hosting the same families is also
  supported.
- For Next.js, expose the consumer-loaded variable fonts as
  `--font-source-sans` and `--font-league-spartan` with `next/font/google` and
  apply both generated class names to the document root. Verify computed
  styles; Inkwell resolves typography through `--font-family-body` and
  `--font-family-display`.
- Controls default to the shared 40px `md` density. Use
  `density="comfortable"` for 44px touch targets or `density="compact"` for
  pointer-heavy dense layouts.
- Import `@lagroon/inkwell-design-system/styles.css` once for package-based
  use. Source-owned installs instead import the stylesheet created by
  `inkwell init`.
- Inkwell does not style `body` or bare native controls. Add
  `className="inkwell-page"` to an application root only when the screen should
  adopt Inkwell's page canvas.
- Use Inkwell components before recreating their UI with custom HTML and CSS.
  Preserve their semantic HTML, props, labels, and keyboard behavior.
- Prefer semantic CSS tokens such as `var(--color-text-primary)`,
  `var(--color-surface-base)`, and `var(--space-3)` over raw values. Do not
  edit generated token CSS; change token source only in the design-system repo.
- All Inkwell CSS is layered (`inkwell.tokens`, `inkwell.base`, and
  `inkwell.components`). Application CSS intentionally overrides it without
  `!important`; use a local class or a token override rather than changing a
  component's internal selector.
- Support both the default dark theme and `data-theme="light"`. Do not hardcode
  dark-only colors, borders, or shadows around an Inkwell component.

## Component selection

- Use `Button` for an action and `ButtonLink` or `Link` for navigation. Do not
  use a click handler on a non-interactive element when a semantic control
  exists.
- Use `startIcon` and `endIcon` on `Button` for icon-and-label actions; keep
  icons decorative when the visible label supplies the accessible name.
- Use `TextButton` for a low-emphasis inline action and `TextDisclosure` for a
  controlled show/hide action. Point `controls` at content that remains in the
  DOM so the disclosure relationship resolves.
- `Badge` is neutral by default. Use `tone="brand"` only when brand emphasis is
  intentional; changing the app brand should not recolor ordinary statuses.
- Use `IconButton` only when its accessible name is clear. A text-labelled
  `Button` is preferred for important or unfamiliar actions.
- Use `FormField` with `TextInput`, `Textarea`, `Select`, `Checkbox`,
  `PasswordInput`, or `FileUpload` so labels, descriptions, required state,
  and errors remain connected.
- Use `StatusBanner` for persistent, meaningful feedback; use `Toast`/
  `ToastRegion` for transient feedback. Do not rely on color alone to convey a
  state.
- Use `ModalFrame` for a focused blocking task, `Drawer` for a contextual task,
  and `Popover` for compact contextual content. Ensure each has an explicit
  trigger and a way to dismiss it.
- Use `Stack`, `Inline`, `Grid`, `Container`, `Center`, and `Surface` for
  layout before inventing one-off flex/grid spacing. Use `ActionGroup` for an
  action row; place the primary action last in source order.
- Use `ControlTrigger` as the shared base for filter, select, and picker
  triggers, and `ControlGroup` for start/end form alignment. Use `CardHeader`
  for responsive title, metadata, badge, and action composition.
- For `Nav`, choose an explicit `fit`: `content`, `equal`, `scroll`, or `wrap`.
  `equalWidth` remains a compatibility alias and is overridden by `fit`.
- Use `Table` for comparable tabular data and provide meaningful column
  headers. For a simple feed or set of selectable rows, prefer `List`.

## Accessibility and interaction

- Keep visible labels wherever practical. Supply an accessible name for every
  icon-only control, input, dialog, and scrollable region.
- Do not remove or replace a component's focus treatment. New interactive UI
  must remain keyboard-operable and use the Inkwell focus-ring convention.
- Keep the component's controlled state in the application. For example,
  manage selected tabs, open overlays, selection, validation, loading, and
  sorting in React state rather than patching DOM state.
- Use a loading state for an async action and prevent accidental duplicate
  submissions. Pair a `Button` with its supported spinner/loading behavior
  rather than adding an unrelated overlay.
- Respect reduced motion for any new animation. Use existing components' built
  in interaction patterns rather than duplicating popover, dialog, menu, tab,
  or tooltip keyboard logic.

## Implementation preferences

- Compose components; do not fork installed component source merely to make a
  visual tweak. Start with props, composition, a wrapper class, or token
  overrides.
- Keep application styles outside Inkwell's named cascade layers. Avoid
  `!important` and escalating specificity.
- Treat copied source from `inkwell add` as application-owned. Preserve
  imports among copied modules and update it deliberately when adopting a new
  Inkwell version.
- Before introducing a component that is not already available, check the
  package exports and the design system’s component-status documentation.

## Working instruction

When asked to implement a UI with Inkwell: identify the semantic task first,
choose the existing Inkwell component or layout primitive that matches it,
write accessible React markup using its public API, use tokens for any new
styling, and preserve light and dark theme behavior. Ask before changing the
design system itself or copying a component implementation just to alter its
appearance.
