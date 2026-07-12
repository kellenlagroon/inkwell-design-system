# Inkwell V1 Seed Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Seed a standalone `Inkwell` design-system package inside this workspace, with its own Storybook, tokens, styles, reusable components, and docs-first IA, without changing the current app's runtime behavior.

**Architecture:** Build `inkwell/` as an isolated package boundary rather than extracting in place. Copy only approved reusable UI into the new package, author a small token-generation layer, and create Storybook docs around `Foundations`, `Components`, and `Guidance`.

**Tech Stack:** React 19, Storybook 10, Vite, JSON token source, generated CSS custom properties

---

### Task 1: Create the standalone Inkwell package boundary

**Files:**
- Create: `inkwell/package.json`
- Create: `inkwell/.gitignore`
- Create: `inkwell/.storybook/main.js`
- Create: `inkwell/.storybook/preview.jsx`
- Create: `inkwell/README.md`

- [ ] Add package metadata and scripts for `storybook`, `build-storybook`, `tokens`, and `build`.
- [ ] Add Storybook config that only reads stories from `inkwell/src/**`.
- [ ] Add preview config that imports only Inkwell styles and sorts sidebar as `Foundations`, `Components`, `Guidance`.
- [ ] Add a minimal README that explains this folder is a standalone seed and does not affect the live app.

### Task 2: Add token source and generated foundation CSS

**Files:**
- Create: `inkwell/tokens/inkwell.tokens.json`
- Create: `inkwell/scripts/generate-tokens.mjs`
- Create: `inkwell/src/styles/tokens.css`
- Create: `inkwell/src/styles/inkwell.css`

- [ ] Define semantic token groups for color, typography, spacing, radius, shadow, and motion.
- [ ] Add a generator script that reads the JSON token source and writes `src/styles/tokens.css`.
- [ ] Author base layout, typography, and component class styling in `src/styles/inkwell.css`, consuming the generated CSS variables.
- [ ] Keep the CSS local to `inkwell/` so no live-app stylesheet is modified.

### Task 3: Port reusable component primitives

**Files:**
- Create: `inkwell/src/components/ui.jsx`
- Create: `inkwell/src/components/icons.jsx`
- Create: `inkwell/src/components/splitButton.jsx`

- [ ] Copy and normalize the approved reusable components: `Button`, `Panel`, `SectionHeading`, `EmptyState`, `ModalFrame`, `StatusBanner`, `Toast`, `ToastRegion`, `Pill`, `IconButton`, `Select`, `PopoverMenu`, and `SplitButton`.
- [ ] Remove product-only naming from examples where reasonable while preserving behavior.
- [ ] Keep component code self-contained inside `inkwell/src/components/**`.

### Task 4: Build the docs-first Storybook IA

**Files:**
- Create: `inkwell/src/components/*.stories.jsx`
- Create: `inkwell/src/components/*.features.stories.jsx`
- Create: `inkwell/src/stories/foundations/*.mdx`
- Create: `inkwell/src/stories/components/*.mdx`
- Create: `inkwell/src/stories/guidance/*.mdx`

- [ ] Add authored foundations docs for overview, tokens, color, typography, spacing, radius, shadows, and motion.
- [ ] Add authored component docs pages with `Docs`, `Playground`, and `Features` structure where useful.
- [ ] Keep `Panel` as `Docs + Features` only.
- [ ] Add guidance docs for action hierarchy, feedback, forms/controls, surfaces, and density/emphasis.
- [ ] Make examples product-generic so this reads as Inkwell rather than coaches-poll docs.

### Task 5: Verify the new package and app safety

**Files:**
- Verify: `inkwell/**`
- Verify: current app root remains unchanged except for docs/plan additions

- [ ] Run the token generator and confirm `inkwell/src/styles/tokens.css` is produced.
- [ ] Run `npm run build-storybook` from `inkwell/` and confirm the Storybook seed builds.
- [ ] Run `npm run build` from `inkwell/` and confirm the package build succeeds.
- [ ] Run `npm run build` from the current app root and confirm the live app still builds without Inkwell integration changes.
- [ ] Summarize any warnings separately from failures.
