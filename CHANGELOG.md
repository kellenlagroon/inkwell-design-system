# Changelog

## Unreleased

### Removed

- **Breaking:** `Paper` is gone. It was a bare `export const Paper = Surface`
  alias with no CSS and no behavior of its own. Replace `Paper` with `Surface`;
  the props are identical.
- Delete the seed application's leftover CSS from `inkwell.css`: 45 rules and
  58 grouped selectors covering classes such as `.league-card`,
  `.picker-team-button`, `.ballot-ranks`, `.invite-card` and `.workspace-header`,
  plus every `#id` selector (`#settingsModal`, `#ballotPickerModal`, …). A
  design system ships no id selectors, and none of these could match a
  consumer's markup. Also removed the unnamespaced `.grid` and `.stacked-form`,
  which no component rendered and which could silently restyle a consuming app.
- Remove the seed names that the CLI fragment owner map was routing into
  component stylesheets: `.selector-button`, `.selector-list`, `.status-inline`
  and `.wide-modal`.
- Retire the `Patterns/Modals` page. A danger confirmation is a `ModalFrame`
  plus a danger `Button`; that guidance now lives on the ModalFrame docs page.
- Retire the `Patterns/Record Browser` page and its private stylesheet. It was
  an application template with no test coverage, not a component API.
- Remove `.callout`. No component, story, or docs page rendered it, and
  `StatusBanner` (a boxed notice with a tone) and `Surface` (a framed block)
  already cover what it did.
- Remove `.modal-host > .modal`. It was half of a rule pair whose other half —
  the seed application's device-preview overlay — was deleted in the previous
  cleanup, leaving a rule that targeted a wrapper nothing renders and set
  `pointer-events` to the value it already had.
- Remove the bare `label` / `input` / `select` / `textarea` element selectors
  that were stranded in the dead container block below. Inkwell's own controls
  are already sized by the `.input` / `.textarea` rules.

### Changed

- Rename the `Patterns` Storybook section to `Compositions` and add an overview
  page stating that nothing in it is a supported API. `Filter bar` and
  `Mobile readiness` stay — they carry real play-function coverage.
- `inkwell.css` no longer declares `.panel` twice. The first declaration was
  fully overridden by the second and contributed nothing. `.section-heading`
  was likewise declared twice inside the phone block; the two are now one rule.
- `Nav`'s `mobileDocked` is documented as a viewport behavior rather than a
  container one, and has a story: `Components/Nav/Features → Mobile-docked
  bottom bar`.
- **Native controls follow the theme.** `color-scheme` appeared exactly twice
  in the stylesheet, both times forcing `dark` on `.modal` regardless of the
  active theme, so a modal rendered dark scrollbars and spin buttons in light
  mode — and everywhere outside a modal, in either theme, the browser drew its
  own widgets at the user agent's default instead of Inkwell's. Both overrides
  are gone, replaced by `[data-theme="dark"]` / `[data-theme="light"]` in the
  `inkwell.base` layer. Keyed to an explicit `data-theme` rather than `:root`,
  so importing the stylesheet still changes nothing in a host application that
  has not opted into an Inkwell theme. One of the two removed rules also
  restated `.modal`, which was already declared earlier in the file.
- **Type sizes no longer fall back to browser defaults.** `.subtle`,
  `.helper-text` and `.section-heading h2` declared no `font-size` anywhere, so
  above 760px they rendered at user-agent sizes and only picked up a token
  below it — type got *smaller* crossing onto a phone. They now have a base
  size at every width, and the phone rule keeps only the step that differs:
  - `.subtle` / `.helper-text`: `--font-size-base` (13.44px), identical to
    `Text`, with no phone override. Was 16px above 760px and 14.4px below.
  - `.section-heading h2`: `--font-size-xl` (20.48px) with
    `--line-height-display`, identical to `Heading`, stepping to
    `--font-size-lg` (17.28px) on phones — `Heading size="sm"`. Was the user
    agent's 24px above 760px. The phone rule no longer overrides weight or
    letter-spacing, so a section title is bold at every width instead of
    dropping to 600 on phones.
  - `.pill` / `.mini-label` stay at `--font-size-xs` (11.52px) on phones
    instead of dropping to `--font-size-2xs` (9.92px). They share a base rule
    with `.eyebrow`, which the phone rule never covered, so the three now stay
    in step.

### Fixed

- `scripts/generate-cli-css-fragments.mjs` now fails the build when any class
  root in `inkwell.css` has no component owner, instead of printing a count and
  continuing. This is how the seed CSS above survived three cleanup passes.
- `cli/styles/base.css` is generated from the `inkwell.base` layer in
  `src/styles/inkwell.css` instead of being maintained by hand, and is now
  gitignored alongside the other generated CLI assets. It was the one stylesheet
  the `--css=fragments` install mode could not pick changes up from, and it had
  already drifted: the `color-scheme` fix above had to be written into it
  separately. `scripts/build-cli-assets.mjs` throws if the layer is missing.
- **`Nav`'s `mobileDocked` prop now does something.** Its styling lived in two
  `@container app (...)` blocks, and nothing in the library or in a consuming
  app ever declared `container-name: app`, so every rule in them was inert.
  They are `@media` queries now. The docked bar is fixed to the bottom of the
  viewport at 760px and below, and the same conversion also switches on the
  phone adaptations for `.panel`, `.section-heading`, `.pill`, `.mini-label`,
  `.helper-text`, `.subtle`, `.empty-state`, the modal shells, and the
  buttons' `min-width`.

### Verification

The CSS deletions are behavior-neutral apart from the `Paper` removal: 30,912
computed-style comparisons across 84 elements, four viewport widths and both
themes show zero differences before and after.

The container-query conversion is deliberately *not* neutral — switching off a
dead query is the point. 770,960 computed-style comparisons across 16,760
elements, five viewport widths and both themes isolate the change precisely:
**zero differences at 1280px**, and every one of the 277 differing
element/property pairs falls inside the two converted breakpoints. No story
gains horizontal overflow at 320px or 375px.

The type-size change is visible by design and was measured directly at 375px
and 1280px rather than asserted neutral; a further 204,160 comparisons across
9,280 elements confirm it moves nothing beyond the three classes named above
and the elements they size.

The `color-scheme` change was measured the same way: 77,763 comparisons across
3,703 elements in both themes move `color-scheme` on 424 elements — `normal`
to `dark` or `light` where there was no scheme at all, and `dark` to `light`
inside a modal in light theme — and change no layout. The only other property
to move is the user agent's default text colour on elements that specify none,
which is what declaring a scheme is for.

## v0.3.0 - 2026-10-14

### Changed

- Standardize interactive controls on a shared 40px `md` density with compact
  and comfortable variants, semantic font-family/weight tokens, and explicit
  Button icon slots.
- Add `ControlTrigger`, `CardHeader`, and `ControlGroup` primitives; add Nav
  `fit` modes with `equalWidth` compatibility and strengthen mobileSheet sizing.
- Make RichText typography defensive and document Google Fonts plus Next.js
  `next/font` loading and computed-style verification.
- Package and source-owned installation guidance now explicitly loads Source
  Sans 3 and League Spartan before Inkwell's stylesheet; `inkwell init` also
  calls out the requirement.
- `Badge` now defaults to the neutral tone; branded badges require
  `tone="brand"`, so ordinary statuses and counts no longer inherit app brand.
- Nav active surfaces default to `--color-overlay-strong`; list Nav uses the
  same dedicated Nav role instead of the legacy brand accent.
- Pagination current-page colors now use dedicated pagination tokens instead
  of Nav tokens.
- Align migration and responsive guidance plus Button feature examples with
  the current density and icon-slot contracts.
- Add a Next.js package-consumer example for font, theme, and token checks.
- Record source-owned component provenance and provide read-only `inkwell version`
  and `inkwell diff` commands for reviewing updates.
- Add opt-in source-owned CSS fragments with `inkwell init --css=fragments`;
  existing full-stylesheet installs remain the default.
- Improve Drawer and CheckboxSelect focus/name behavior and add visible focus
  outlines to Drawer close and Table sort controls.

### Added

- `TextDisclosure`, a controlled text-style disclosure trigger with label
  switching and `aria-expanded` / `aria-controls` wiring.
- Stock Mantine migration mappings and live light/dark token-override examples.

### Fixed

- CLI verification now expects the npm-compatible binary path shipped in
  v0.2.2.

### Removed

- Unused `--notification-dot-bg`; Nav notification badges use
  `--nav-notification-bg`.

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
