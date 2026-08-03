# CLAUDE.md — Inkwell design system

Guidance for Claude Code sessions working in this repo. Read this before making
changes.

## What this is

A standalone design-system package published as
`@lagroon/inkwell-design-system`. It has its own tokens, styles, components,
Storybook, tests, and lib build.

It was originally seeded from an app, but that lineage is finished: the seed
application's CSS was deleted in v0.2.0 and nothing in the repo references it.
Treat this as a library with no upstream.

**Public API:** `import { Button, Table, ... } from "@lagroon/inkwell-design-system"`
plus one stylesheet import
(`import "@lagroon/inkwell-design-system/styles.css"`). Components render against
global classes in `inkwell.css`; there is no CSS-in-JS. Consumers opt into the
page canvas with `class="inkwell-page"`.

## Reference material

- [`docs/reference/relayfi-storybook.md`](docs/reference/relayfi-storybook.md) — structural reference for RelayFi's public design system (Telegraph). This is the shape Inkwell's docs should grow toward, at a smaller scale. Read before doing any docs/IA work.

## Directory map

| Path | What lives here |
|---|---|
| `src/components/*.tsx` | Typed component sources. Each has `.tsx`, `.stories.jsx`, `.features.stories.jsx`, `.test.tsx`. |
| `src/stories/components/*.mdx` | Docs pages that reference the component stories. |
| `src/styles/inkwell.css` | The global stylesheet. **See "CSS architecture" below.** |
| `src/styles/tokens.css` | Generated from `tokens/inkwell.tokens.json` — do not edit by hand. |
| `tokens/inkwell.tokens.json` | Token source of truth. `npm run tokens` regenerates `tokens.css`. |
| `src/index.ts` | Public barrel export. Every new component needs an entry here. |
| `.storybook/preview.jsx` | Imports `tokens.css` then `inkwell.css` into the Storybook preview. |

## Commands

```bash
npm run typecheck        # tsc --noEmit
npm run test             # vitest run
npm run test:watch       # vitest watch
npm run tokens           # regenerate tokens.css from tokens.json
npm run storybook        # dev server on port 6100 (runs tokens first)
npm run build-storybook  # static Storybook build
npm run build            # lib build → dist/ (JS + types + bundled CSS)
```

Before finishing any component change, run `npm run test && npm run typecheck`
and verify the rendered result in Storybook (see "Verification" below).

## CSS architecture

`inkwell.css` ships inside cascade layers, declared in `tokens.css` (which
loads first):

```css
@layer inkwell.tokens, inkwell.base, inkwell.components;
```

- `inkwell.tokens` — the generated custom properties, both themes.
- `inkwell.base` — `box-sizing` and the opt-in `.inkwell-page` canvas.
- `inkwell.components` — every component rule.

**Why it matters:** unlayered CSS beats layered CSS regardless of specificity, so
a consumer's own stylesheet overrides Inkwell by default. Never add a rule
outside a layer — it would outrank the whole system and be unoverridable.

**The page baseline is opt-in.** The stylesheet does not style `<body>` or
native `input`/`select`/`textarea`/`label` elements. Consumers add
`class="inkwell-page"` to adopt the canvas. Do not reintroduce bare element
selectors — they restyle every native control in the consuming app.

### Duplicate selectors

The old hazard was a block of raw seed-app CSS at the end of the file that
silently overrode curated rules at equal specificity. That block is gone, and a
pairwise scan reports no bottom-of-file restatements. The rule that replaced it:

**If a component's property needs a different value, change it at the
component's own definition. Never restate the selector later in the file.** A
reader should be able to trust the rule they are looking at.

Namespace generic names with `.ink-*` (`.ink-table`, `.ink-tabs`,
`.ink-avatar`, `.ink-divider`, `.ink-list`, `.ink-spinner`) so new components
cannot collide. Do not resolve a collision with `!important` or specificity
escalation — merge or rename.

If a rule is "not applying," check in this order: a duplicate definition later in
the file, a transition stuck at its start value on a freshly mounted element, and
only then HMR staleness.

## Conventions

- **TypeScript** for components (`*.tsx`); JSX for stories (`*.stories.jsx`) so
  Storybook's arg controls stay simple.
- **Test file per component**: `*.test.tsx` next to the component using Vitest +
  Testing Library.
- **A11y baseline**: full ARIA keyboard nav on `Tabs`, `Escape`-to-dismiss on
  `Tooltip`, `role="tooltip"` + `aria-describedby` wiring, `aria-sort` on Table
  headers. Focus indicators must clear 3:1 against their surface (WCAG 2.2
  SC 1.4.11) — verify with a real measurement, not by eye.
- **Focus rings** use `outline: 2px solid var(--color-focus-ring)` per the
  Inkwell convention (see `.ink-tab:focus-visible`).
- **Namespaced classes** for generic names (see CSS architecture above).
- **Tokens over literals**: never hardcode hex or px for surfaces/spacing when
  a token exists (`var(--space-3)`, `var(--line-soft)`, `var(--accent)`, etc.).
- **Reduced motion**: any animation should have a `@media (prefers-reduced-motion: reduce)` variant.
- **No CSS-in-JS**: all styles go in `inkwell.css`. Story files can use inline
  styles for layout scaffolding.

## Verification workflow

Any change to the stylesheet should be verified by diffing computed styles before
and after, not by looking at it. Snapshot a set of representative elements across
several viewport widths in both themes, make the change, snapshot again, and
expect zero differences unless the change was meant to be visible. This is what
caught two bad CSS-deletion passes that looked correct on a spot-check.

For any change observable in the browser:

```bash
npm run storybook   # starts on http://localhost:6100
```

Then open the relevant story and verify:

- **Structure**: DOM shape, roles, aria-* attributes (via
  `mcp__Claude_Browser__javascript_tool` running `document.querySelector` etc.)
- **Computed styles**: `getComputedStyle(el)` for dimensions, borders,
  backgrounds. Numbers > screenshots for measurable properties.
- **Screenshots**: use for visual confirmation of the final look.

The screenshot tool can time out on pages with lots of animations
(SMIL/keyframes). Pausing animations helps (`.pauseAnimations()` on SVGs, a
global `animation-play-state: paused` style, or navigating away and back).

## Adding a component (checklist)

1. Confirm scope/API with the user before building. Ask questions with
   `AskUserQuestion` when there's a real design decision.
2. Read the seed on `main` if there is one; check `inkwell.css` for duplicates.
3. Write `src/components/<name>.tsx` (typed).
4. Add CSS in `src/styles/inkwell.css` — namespace `.ink-<name>` if the name is
   collision-prone.
5. Add `src/components/<name>.stories.jsx` (Playground) and
   `<name>.features.stories.jsx` (variants).
6. Add `src/stories/components/<Name>.mdx` (docs page).
7. Add `src/components/<name>.test.tsx`.
8. Export from `src/index.ts` (component + all types).
9. Run `npm run test && npm run typecheck`.
10. Verify live in Storybook (structure, computed styles, screenshot).
11. Commit with a descriptive message. Include a `Co-Authored-By: Claude` trailer
    when the user asks for a commit.

## Confirm before building

The user prefers sign-off before each component build. Ask about scope,
features, and edge cases with `AskUserQuestion` rather than making silent
assumptions. Ask questions in batches (2–4 at once) so the flow isn't chatty.

## Common gotchas seen in this repo

- **Duplicate CSS rules in `inkwell.css`** — see CSS architecture above.
- **A transition can strand a value at its start.** An element that mounts already
  in its target state (a menu item focused the moment the menu opens) never runs
  the transition, so the computed value stays at the from-value. Symptom: the
  rule is in the stylesheet, matches, and wins the cascade, yet does nothing.
- **Vite HMR leaves stale `<style>` tags** for edited CSS during a session.
  This is *cosmetic* (a real page reload clears them). If a rule appears to not
  apply, check for an in-file duplicate first — it's more likely.
- **Storybook's indexer does not survive the working tree changing underneath
  it.** After a branch switch or bulk file rewrite, restart the dev server. The
  tell is that `build-storybook` succeeds while the running server reports
  "Something went wrong loading this Storybook".
- **Verify with real exit codes.** Piping a command through `tail` or `head`
  reports the pipe's status, not the command's — a failing typecheck can look
  green. Redirect to a file and check `$?` instead.
- **`align-self: stretch` with `height: 0` from a base rule computes to 0** on
  a flex item. Explicit `height: 100%` is more predictable when the parent has
  definite height.
- **`border-collapse: collapse` + `position: sticky` on `<th>`** loses the
  header's bottom border during scroll (the border is owned by the adjacent
  tbody cell, which scrolls away). Use `box-shadow: inset 0 -1px 0` on sticky
  `<th>` if this matters.
- **CSS variables in SVG attributes** don't resolve. Use `style={{ fill: "var(...)" }}`
  instead of `fill="var(...)"`.
- **SMIL animation in Chromium** can be finicky when combined with a base
  `patternTransform` and `additive="sum"`. Prefer CSS-driven approaches
  (`background-position` + `@keyframes` on a mask-composited element) when
  reliability matters.
