# CLAUDE.md — Inkwell design system

Guidance for Claude Code sessions working in this repo. Read this before making
changes.

## What this is

A standalone design-system package (`inkwell/`) seeded from the CFB Coaches Poll
2.0 app. It has its own tokens, styles, components, Storybook, tests, and lib
build — deliberately isolated from the seed app so the app's runtime behavior
isn't affected.

**Public API:** `import { Button, Table, ... } from "inkwell"` plus one
stylesheet import (`import "inkwell/styles.css"`). Components render against the
global `.ink-*` / seeded classes; there is no CSS-in-JS.

## Directory map

| Path | What lives here |
|---|---|
| `src/components/*.tsx` | Typed component sources. Each has `.tsx`, `.stories.jsx`, `.features.stories.jsx`, `.test.tsx`. |
| `src/stories/components/*.mdx` | Docs pages that reference the component stories. |
| `src/styles/inkwell.css` | The global stylesheet. **See "The stylesheet trap" below.** |
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

## The seed app

Components are seeded from `../Dev/CFB Coaches Poll 2.0` (the "seed app"). The
seed app's `main` branch holds the reference CSS and JSX.

**Read the seed READ-ONLY via git.** The app's working tree is on a feature
branch — never `git checkout` inside it. Use `git show main:<path>` and
`git grep main` from that directory:

```bash
cd "../Dev/CFB Coaches Poll 2.0"
git show main:styles.css | grep -nE "\.roster-table|\.info-tooltip"
git show main:src/components/accessFlow.jsx | sed -n '90,120p'
git grep -n "className" main -- '*.jsx'
```

**Judge surfaces by how the app RENDERS, not by one CSS rule.** Multiple classes
compose; a border defined on `.card` may be visually overridden by a parent's
inherited style. When in doubt, ask the user "how does this look in the app?"
rather than reading three more CSS files.

## The stylesheet trap (critical)

`inkwell.css` contains **two layers**:

1. **Curated component blocks** at the top of the file — the current, intentional
   styles for each Inkwell component.
2. **Raw app CSS** copied from the seed app's `styles.css`, still sitting further
   down the file (e.g. `.roster-table`, `.info-tooltip`, `.header-account-*`,
   `.multi-category-*`, `.selection-*`, `#selectionSubmissionsModal`).

**When you build a new component whose seed class is in the raw block, you
create a duplicate. The raw copy is later in the file and wins on equal
specificity — silently overriding your curated rule.** This is what caused the
Tooltip to keep re-rendering with a border after I removed it, and would have
happened with the Collapsible if not caught.

**Before adding CSS for a new component:**

1. `grep -nE "\.info-tooltip|\.your-seed-class" src/styles/inkwell.css`
2. If the class exists in the raw block, delete it there before adding your
   curated version.
3. Alternatively, namespace your new class (`.ink-*`) so it can't collide — used
   for `.ink-avatar`, `.ink-divider`, `.ink-table`, `.ink-list`,
   `.ink-spinner`, `.ink-skeleton`, `.ink-progress`, `.ink-tabs`. Prefer this
   for generic names (avatar, divider, table, tabs, list, spinner, etc.).

If a rule is "not applying" or "keeps coming back," suspect a duplicate before
suspecting HMR.

## Conventions

- **TypeScript** for components (`*.tsx`); JSX for stories (`*.stories.jsx`) so
  Storybook's arg controls stay simple.
- **Test file per component**: `*.test.tsx` next to the component using Vitest +
  Testing Library.
- **A11y baseline**: components go beyond the app when the app lacked something.
  Examples: full ARIA keyboard nav on `Tabs`, `Escape`-to-dismiss on `Tooltip`,
  `role="tooltip"` + `aria-describedby` wiring, `aria-sort` on Table headers.
- **Focus rings** use `outline: 2px solid var(--color-focus-ring)` per the
  Inkwell convention (see `.ink-tab:focus-visible`).
- **Namespaced classes** for generic names (see stylesheet trap above).
- **Tokens over literals**: never hardcode hex or px for surfaces/spacing when
  a token exists (`var(--space-3)`, `var(--line-soft)`, `var(--accent)`, etc.).
- **Reduced motion**: any animation should have a `@media (prefers-reduced-motion: reduce)` variant.
- **No CSS-in-JS**: all styles go in `inkwell.css`. Story files can use inline
  styles for layout scaffolding.

## Verification workflow

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

- **Duplicate CSS rules in `inkwell.css`** — see stylesheet trap above.
- **Vite HMR leaves stale `<style>` tags** for edited CSS during a session.
  This is *cosmetic* (a real page reload clears them). If a rule appears to not
  apply, check for an in-file duplicate first — it's more likely.
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
