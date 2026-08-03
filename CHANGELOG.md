# Changelog

## v0.2.2 - 2026-08-03

### Fixed

- Corrected npm executable metadata so the published package exposes the
  `inkwell` CLI command.

## v0.2.1 - 2026-08-03

### Added

- `inkwell.ai.md`, a compact design-and-accessibility guide for coding agents.
  `inkwell init` installs a user-owned copy at the adopter's project root, and
  the package exports the versioned source at
  `@lagroon/inkwell-design-system/ai.md`.
- The source-owned CLI now exposes `text-button`, restoring coverage for every
  public non-icon component export.

## v0.2.0 - 2026-08-02

Design-system review: the package stops fighting the apps that install it.

Everything here came out of a full review of the shipped components, the
stylesheet, and the Storybook IA. Verified throughout by diffing computed styles
before and after each change — 27–33 properties across up to 1050 element
snapshots, at several viewport widths, in both themes.

### Breaking

- `inkwell/styles.css` no longer styles `<body>`. The page background, text
  colour, and font are now opt-in: add `class="inkwell-page"` to your app root
  to keep the previous appearance.
- `inkwell/styles.css` no longer restyles native `<input>`, `<select>`,
  `<textarea>`, and `<label>` elements. Previously a bare
  `<input type="checkbox">` in a consuming app rendered 600px wide. Inkwell's own
  controls are unaffected.
- All shipped CSS now lives in cascade layers (`inkwell.tokens`,
  `inkwell.base`, `inkwell.components`). Unlayered CSS beats layered CSS, so
  your overrides now win by default — including from inside your own `@layer`,
  which previously lost. If you escalated specificity to override Inkwell, those
  rules still work but the escalation is no longer needed.
- Removed `PopoverMenu` and `PopoverGeneral`. Use `Popover` with
  `mode="menu"`.
- Removed `IconButton` `size="lg"`. It rendered identically to `"md"`; the
  sizes are `"sm"` (32px) and `"md"` (44px).
- Removed `ModalSize` `"picker"`. It mapped to the same classes as
  `"compact"`.
- `Popover`'s `className` prop is now `panelClassName`.
- `Text` defaults to `wrap="normal"` instead of `wrap="anywhere"`, so body
  copy no longer breaks mid-word. Pass `wrap="anywhere"` for user-generated
  strings such as URLs and ids.
- `Pagination` defaults to `compact="auto"` instead of `false`. On screens
  below 760px the page-number list is replaced by a short summary; a full row of
  44px targets could not fit a phone and pushed the page sideways.

### Accessibility

- Focus indicators now meet WCAG 2.2 SC 1.4.11. The default ring measured
  1.5:1 against dark surfaces and is now 3.5:1.
- Popover and SplitButton menu items had no focus indicator at all — keyboard
  focus was visually identical to hover. They now take a distinct ring.
- `StatusBanner` announces itself: `role="status"` for informational tones,
  `role="alert"` for danger, error, and warning. Add `live="off"` for a banner
  that is static on mount.
- `ModalFrame` derives `aria-labelledby` from `title` automatically, hides
  sibling content from assistive tech while open, and gains `ariaLabel`,
  `showCloseButton`, and `closeLabel`.
- `SplitButton` now has the keyboard behaviour its `role="menu"` claimed:
  arrow keys, Home/End, Escape, and focus return. Its trigger label is the new
  `menuLabel` prop rather than a hardcoded string.
- `Checkbox` inherits its surrounding `FormField`'s error, description, and
  required state, and gains `indeterminate`.
- `Table` renders inside a keyboard-reachable horizontal scroll container, so a
  wide table scrolls itself instead of widening the page. New
  `scrollAreaLabel`.
- `Select` gains `aria-labelledby`, a named listbox, and `aria-disabled`
  options that stay perceivable.
- `Pagination`'s result summary is a live region at every breakpoint, and its
  page-size control is labelled by its visible text.
- `ToastRegion` moves `aria-atomic` onto each toast, so one change no longer
  re-announces the whole queue.
- `Tabs` sets `aria-orientation`; Up/Down no longer hijack page scroll.
- `Nav` gains `badgeLabel`, giving the notification dot a text alternative.
- Dark-mode `Badge` foregrounds fixed for the success, info, and danger tones,
  which measured 2.3–3.2:1. All twelve tone/theme combinations now pass AA.

### Added

- `ActionGroup` now encodes the action-row conventions: write the primary
  action last and it sits rightmost on wide screens, topmost when stacked.
  In browsers with `reading-flow`, sequential focus follows visual order; other
  browsers preserve matching DOM and visual order. New `align` prop, which
  resolves to end-alignment inside dialog and drawer footers.
- `Foundations/Overriding Inkwell` documents the override, theming, and layer
  positioning paths.
- `Layout/ActionGroup` stories and docs page.

### Fixed

- Types for `Panel`, `SectionHeading`, `EmptyState`, `Toast`, and
  `ToastRegion`, which shipped as `any`.
- `Panel` and `EmptyState` append `className` instead of replacing their base
  class.
- `IconButton`'s `size` prop, which had three values and two outcomes.
- `Tabs` no longer applies phone behaviour on desktop; full labels, no
  sideways scroll.
- `FileUpload`'s clear and remove controls had no hover or focus feedback — the
  rule referenced a mistyped variable.
- Six selectors were defined twice, with a rule at the end of the stylesheet
  silently overriding the component's own definition.
- `Spinner`, `Skeleton`, `Divider`, `Avatar`, `List`, `Progress`,
  `StatusBanner`, and `SplitButton` accept `className`, `style`, `data-*`,
  and other standard props, matching the rest of the library.

### Removed

- The seed application's CSS — roughly a third of the stylesheet, none of it
  referenced by any component. `dist/styles.css` is 157KB → 113KB.

### Changed

- Token tiers are consistent and documented: Tier 1 primitives, Tier 2 semantic,
  Tier 3 component. Labels previously used three different numbering schemes and
  no tier was ever called 2.

### Verification

- 241 tests passing, up from 135.
- TypeScript typecheck clean, library build and Storybook build green.

## v0.1.3 - 2026-07-14

Version-only release; no functional changes.

## v0.1.2 - 2026-07-12

Scoped npm package release.

- Renamed the package to `@lagroon/inkwell-design-system` because the unscoped `inkwell-design-system` name is already owned on npm.
- Kept the package contents unchanged from the npm-ready v0.1.1 build.
- Publish with `npm publish --access public`.

## v0.1.1 - 2026-07-12

Npm-ready package release.

- Removed the private package flag.
- Kept React and React DOM as peer dependencies only, so consumers provide their own React runtime.
- Verified the package with tests, typecheck, library build, and npm publish dry-run.

## v0.1.0 - 2026-07-12

Initial Inkwell design-system release.

### Included

- Token pipeline and generated CSS variables for color, spacing, radius, shadow, typography, and motion.
- Foundation docs for system overview, applying color, motion, tokens, and using tokens in code.
- Component Status docs with lifecycle definitions and maturity tracking.
- 32 shipped components and primitives:
  - Stable: Avatar, Badge, Button, Card, Checkbox, Collapsible, EmptyState, FormField, Grid, IconButton, Inline, ModalFrame, Panel, Pill, PopoverMenu, SectionHeading, Select, SplitButton, Stack, StatusBanner, Tabs, Textarea, TextInput, Toast, ToastRegion, Tooltip.
  - Beta: Divider, List, Progress, Skeleton, Spinner, Table.
- Storybook docs and examples for foundations, layout primitives, status pages, and component APIs.
- Library build boundary with package exports for the component barrel and bundled stylesheet.

### Verification

- Vitest suite passing: 86 tests.
- TypeScript typecheck clean with `tsc --noEmit`.
- Storybook preview verified for the CSS cleanup that preceded the tag.
