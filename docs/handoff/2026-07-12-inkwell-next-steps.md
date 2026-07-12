# Handoff: Inkwell next steps

**From:** Claude Code (Opus 4.7)
**Date:** 2026-07-12
**Repo:** https://github.com/kellenlagroon/inkwell-design-system (branch `main`, up to date with origin)
**Latest commit at handoff:** `0b77fa3` — quieter Status table

---

## Read these first

Before touching anything, read these three files in order. They contain everything you need to know about the conventions and traps in this repo.

1. **`CLAUDE.md`** — repo root. Directory map, commands, conventions, the stylesheet trap (critical), a11y baseline, verification workflow, gotchas from this project.
2. **`docs/reference/relayfi-storybook.md`** — the structural reference we're modeling our docs on. Explains the Foundations vs Tokens split, the Component Status system, and the component doc anatomy.
3. **`CLAUDE.md`'s "Reference material" section** points to (2), so you'll get there naturally.

If you can't read `CLAUDE.md` before starting work, you *will* create duplicate CSS rules that get silently overridden. This has happened multiple times in the current session. See "Stylesheet trap" below.

---

## Where the project stands

- **Foundation, layout primitives, and 32 components all shipped** on `main`. See the Component Status table at Storybook path `component-status-status--docs`.
- **Docs pass complete**: Foundations narratives (Overview, Applying Color, Motion), Tokens/Foundations split, Component Status pages, normalized component `.mdx` anatomy across all 28 component doc files.
- **Storybook Docs theming** patched via `.storybook/docs-theme.css` — required because Storybook's default Docs mode paints white under our cream-on-dark components. Don't remove it.
- **86 tests passing** (`npm run test`); `tsc --noEmit` clean.
- **Not yet published to npm.** Package boundary in `package.json` is set up (`exports`, `files: ["dist"]`, `peerDependencies`), but `react` is currently in both `dependencies` and `peerDependencies` so Storybook can install it. Move to peerDeps-only before first publish.

---

## The task queue (ranked by impact/effort)

Do them in this order unless the user redirects. Each is self-contained; commit after each so the user can review as you go.

### 1. Clean up raw seed CSS in `src/styles/inkwell.css` ⭐ **do first**

**Why:** the file contains ~1000 lines of un-curated app CSS copied verbatim from the seed app (region roughly starting after the curated component blocks; look for `.roster-*`, `.selection-*`, `#selectionSubmissionsModal`, `.multi-category-*`). These raw rules **duplicate** classes used by shipped Inkwell components and, being later in the file, silently override them on equal specificity. This trap has already caused real bugs (Tooltip's border kept reappearing until we found and deleted the duplicate; Collapsible was almost bitten too).

**Approach:**

1. `grep -nE "^\.roster|^\.selection-|^#selection|^\.multi-category|^\.header-|^\.commissioner" src/styles/inkwell.css` to find the raw block.
2. For each rule, decide:
   - **Delete** if it's not tied to any shipped Inkwell component (most of them).
   - **Namespace and move** to the curated section if a component depends on it.
3. Preserve the two classes that ARE dependencies: `.header-account-avatar` and `.split-button-divider` (used by the `Avatar` and `SplitButton` components respectively — verify by grepping `src/components/`).
4. Run `npm run test && npm run typecheck` after the delete pass.
5. Verify live in Storybook: open `avatar--interactive`, `collapsible--playground`, `tooltip--playground`, `list--playground` — the four most likely to break from a stray dependency.
6. Commit as one clean diff. Suggested message: `Remove raw seed CSS block from inkwell.css`.

**Watch out for:**
- The `.info-tooltip-trigger:focus-visible` shared focus rule (around line ~2740 in inkwell.css at time of writing) — it's a grouped selector with several other app-specific focus targets. If you delete the whole rule, keep the `.info-tooltip-trigger:focus-visible` bit or move it into the curated Tooltip block.
- Some raw rules reference tokens that DO still exist (`--line-soft`, `--space-3`, etc.). Deleting the rule doesn't break the token.

### 2. Tag `v0.1.0` and write brief release notes

**Why:** the library is coherent enough to pin against. A tag lets the user (and any future consumer) reference this state.

**Approach:**

1. Verify current state is clean: `git status` clean, tests green, tsc clean.
2. Ask the user for a version bump preference. If they say "just tag it" without a version, default to `v0.1.0`.
3. `git tag -a v0.1.0 -m "Inkwell v0.1.0"` then `git push origin v0.1.0`.
4. Create a short `CHANGELOG.md` at the repo root (if none exists) listing what's in v0.1 — pull from the Component Status table + the Foundations pages.
5. Commit `CHANGELOG.md`.

**Don't:** actually publish to npm without explicit user permission. That's a hard-to-undo shared-state action.

### 3. Docs gap-fills

Small polish, low risk, high scannability payoff.

- **Panel.mdx is missing `## API`** — every other component doc has one. Look at how `Button.mdx` structures its API section (`<ArgTypes>` + a short prose paragraph) and match. Panel's props are simple; you can read them from `src/components/ui.jsx` where Panel is defined.
- **7 component docs are missing `## Usage guidance`**: Avatar, Divider, List, Progress, Skeleton, Spinner, Table. Add a short 2–4 bullet section between `## Features` and `## Keyboard and accessibility`. Look at `Button.mdx` or `Tabs.mdx` for the tone.

Commit as `Docs: fill missing API and Usage guidance sections`.

### 4. Light theme (bigger effort — half a day)

The token pipeline already has the `[data-theme]` seam (Phase 1 of foundation work — see `inkwell-foundation-plan` memory or `scripts/generate-tokens.mjs` for the pipeline shape). Only `dark` currently exists.

**Approach:**

1. Read `tokens/inkwell.tokens.json` — note the `themes.dark` structure.
2. Add `themes.light` with a light-mode palette. Since Inkwell was designed on a dark canvas, pick surface/text/line values that mirror the dark theme's contrast relationships (don't just invert). A reasonable starting point: cream canvas, ink text, subtle borders.
3. Run `npm run tokens` to regenerate `src/styles/tokens.css`. It should emit a `:root, [data-theme="light"]` seam.
4. Add `color-scheme: dark` and `color-scheme: light` per theme so native controls follow.
5. Add a Storybook toolbar toggle via `parameters.backgrounds` or a decorator. `.storybook/preview.jsx` is where this goes.
6. Test every component in light mode. Some may need extra tokens for hover states etc.

**Don't** just invert colors — the interaction states, focus rings, and semantic tones (accent, success, warning, danger) each need per-theme tuning to preserve contrast.

### 5. Publish to npm (or private registry)

Only after user explicitly asks.

Before publishing:
- Move `react` and `react-dom` from `dependencies` to `peerDependencies` only. They're currently in both so Storybook works locally.
- Run `npm run build` and inspect `dist/` — should have `index.js`, `index.d.ts`, `styles.css`.
- `npm publish --dry-run` first to see what would be published.
- Confirm with user before real publish.

### 6. Deferred component work

- **Interactive/selectable Card variant** — noted in memory. The app has `.overview-summary-card` which is really a `<button>` with a selected state. When time allows, add an `interactive` prop to `Card` similar to what `Avatar` has.
- **Table refinements** — the API is intentionally minimal. Extend only when a real consumer needs something.

---

## Conventions (repeated from CLAUDE.md, but critical)

- **TypeScript for components** (`*.tsx`); **JSX for stories** (`*.stories.jsx`).
- **Test per component**: `*.test.tsx` with Vitest + Testing Library.
- **Tokens over literals**: never hardcode hex or px for surface/spacing when a token exists.
- **Reduced motion**: every animation gets a `@media (prefers-reduced-motion: reduce)` variant.
- **Namespaced classes** (`.ink-*`) for collision-prone names (avatar, divider, table, list, tabs, spinner, skeleton, progress).
- **Focus rings**: `outline: 2px solid var(--color-focus-ring)` — see `.ink-tab:focus-visible`.
- **A11y baseline**: components should go beyond the app when the app lacked something (full ARIA keyboard nav, Escape dismiss, etc.).
- **No CSS-in-JS**. All styles in `inkwell.css`. Stories can use inline styles for scaffolding.

## Verification workflow

For any change observable in the browser:

1. `npm run storybook` (port 6100).
2. Use browser DevTools / a browser MCP to check computed styles, ARIA, roles — numbers > screenshots for measurable properties.
3. Screenshots for visual confirmation only.

Storybook Docs pages are in an iframe. To read them: `document.querySelector('iframe').contentDocument`.

## Warnings from this session

- **The "Reads a file that's identical to what's on disk" trap:** the Edit tool tracks Read state per file. If a session interrupt happens between Read and Edit, you'll get "File has not been read yet" errors on the Edit. Re-Read then Edit.
- **Screenshot tool intermittently hangs** on pages with heavy animation (SMIL patterns, many `@keyframes`). Pause animations with `document.querySelectorAll('svg').forEach(s => s.pauseAnimations())` + a global CSS `animation-play-state: paused !important` before screenshotting.
- **CSS variables in SVG attributes don't resolve.** Use `style={{ fill: "var(--accent)" }}`, not `fill="var(--accent)"`.
- **SMIL animation in Chromium** is finicky when combined with `patternTransform` + `additive="sum"`. Prefer CSS `background-position` + `@keyframes` on a mask-composited element for reliability.
- **`align-self: stretch` with `height: 0` from a base rule computes to 0** on a flex item. Explicit `height: 100%` is more predictable when the parent has definite height.
- **`border-collapse: collapse` + `position: sticky` on `<th>`** loses the header's bottom border during scroll. Use `box-shadow: inset 0 -1px 0` on sticky `<th>` if the divider matters.

## What NOT to do

- **Don't `git checkout` in the seed app** at `../Dev/CFB Coaches Poll 2.0`. Its working tree is on a feature branch; use `git show main:<path>` or `git grep main` from that directory (read-only).
- **Don't add new raw app CSS to `inkwell.css`.** If you need styles for a new component, put them in the curated section at the top of the file. If you're seeding from the app, copy just the rules you need, namespace them if collision-prone, and delete any raw duplicates.
- **Don't add features, refactor, or add abstractions beyond what the task requires.** A bug fix doesn't need surrounding cleanup.
- **Don't `npm publish` without explicit user permission.**
- **Don't push force to main** — see `CLAUDE.md`'s git safety notes.

## Confirm-before-building

The user prefers sign-off before each substantive build step. Ask focused questions in batches of 2–4 with `AskUserQuestion` (or your equivalent) rather than making silent assumptions. Explicit binary calls ("A or B?") work better than open-ended ones.

## When you're stuck

- If a CSS rule "keeps not applying" or "keeps coming back", the answer is almost always a duplicate in `inkwell.css`. Grep the file for the class before assuming HMR is stale.
- If a Storybook story slug is wrong, click through the sidebar in the browser and copy the actual URL — the slug pattern isn't always what you'd guess from the `title:` string.
- If the test suite fails after a CSS-only change, it's usually the `.className` selector in a test targeting an SVG element (which uses `SVGAnimatedString`, not a plain string). Switch to `getAttribute("class")`.

---

Good luck. The user's a designer with strong opinions and a good visual eye — trust their feedback, they'll catch what you miss.
