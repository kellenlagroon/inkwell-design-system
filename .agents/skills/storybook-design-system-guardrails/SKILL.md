---
name: storybook-design-system-guardrails
description: Preserve Inkwell’s Storybook information architecture, component contracts, token system, CSS conventions, accessibility baseline, and release quality when planning, reviewing, or implementing a design-system update. Use for changes to `src/components`, `src/stories`, `src/foundations`, `src/styles`, `tokens`, Storybook configuration, public exports, or component documentation.
---

# Inkwell Storybook Design-System Guardrails

Treat Storybook as the canonical product documentation and interaction contract. Preserve existing patterns unless the request explicitly changes the system’s architecture.

Before changing anything, read `references/storybook-structure.md` and the nearest comparable component implementation, its playground story, feature stories, MDX docs, and test. Read `CLAUDE.md` for the full repository rules.

## Required workflow

1. Classify the change: token-only, existing component, new component, docs/IA, foundation, or pattern.
2. Trace the impact chain before editing: token source → generated CSS → global styles → component source → stories → MDX docs → public export → status registry → tests.
3. Copy the closest established pattern. Do not introduce a new folder, filename scheme, Storybook title, docs order, or CSS strategy without an explicit architectural decision.
4. Keep public API changes intentional. Preserve prop names, defaults, DOM semantics, keyboard behavior, and exported types unless the requested change authorizes a breaking change.
5. Validate every affected layer. Run `npm run tokens` when token source changes; always run `npm run test`, `npm run typecheck`, and the relevant Storybook view. Build Storybook for IA/configuration changes.
6. For any stylesheet change, diff computed styles before and after across several viewport widths in both themes, and expect zero differences unless the change was meant to be visible. Check real exit codes — piping a command through `tail` reports the pipe's status, not the command's.

## Change rules

### Tokens and themes

- Edit `tokens/inkwell.tokens.json`, never generated `src/styles/tokens.css`.
- Prefer semantic tokens over primitives and component tokens over ad-hoc component literals. Add a missing token when a value represents a reusable design decision.
- Verify both light and dark themes after a token change; the preview toolbar controls `data-theme` on `<html>`.
- Treat legacy aliases as compatibility layers, not the preferred vocabulary for new work.

### Components and styles

- Implement component behavior in typed `src/components/<name>.tsx`; use JSX only for Storybook stories.
- Put styling in `src/styles/inkwell.css`; never add CSS-in-JS for production component styles.
- All shipped CSS lives in cascade layers (`inkwell.tokens`, `inkwell.base`, `inkwell.components`). Never add a rule outside a layer — it would outrank the entire system and be unoverridable by consumers.
- The page baseline is opt-in via `.inkwell-page`. Do not add bare `body`, `input`, `select`, `textarea`, or `label` selectors; they restyle every native control in the consuming app.
- Search `inkwell.css` before adding a selector. If a component's property needs a different value, change it at the component's own definition rather than restating the selector later in the file. Use a collision-resistant `.ink-<name>` class for generic names, and never resolve a collision with escalating specificity or `!important`.
- Use tokens rather than hard-coded color, spacing, radius, or duration values. Add reduced-motion handling for every new animation.
- Preserve semantic HTML, accessible labels, ARIA behavior, keyboard support, and the standard `outline: 2px solid var(--color-focus-ring)` focus treatment. Focus indicators must measure at least 3:1 against their surface — check the number, do not judge by eye.

### Storybook and docs

- Keep top-level titles within `Foundations`, `Tokens`, `Component Status`, `Patterns`, or `Components`, matching the configured sidebar order.
- For a documented component, maintain the three linked artifacts: `<name>.stories.jsx` for Playground controls, `<name>.features.stories.jsx` for focused variants, and `src/stories/components/<Name>.mdx` for docs.
- Use the component’s existing docs page as the local template. Preserve the normal flow: short purpose/status, when-to-use or primary example, API (`ArgTypes`), Features, Usage guidance, and Keyboard/accessibility.
- Update `src/stories/componentStatus/Status.mdx` whenever a shipped component, its maturity, a11y review state, or its documentation route changes. Preserve grouped-doc links where applicable.
- Keep conceptual guidance in Foundations, concrete token catalogs in Tokens, reusable compositions in Patterns, and API-bearing primitives in Components.

### Public package

- Export every newly shipped component and its public types from `src/index.ts`.
- Do not export internal helpers.
- Add a row to `src/stories/componentStatus/Status.mdx` for every barrel export, including ones documented inside another component's page.
- Ensure library consumers continue to need one stylesheet import: `@lagroon/inkwell-design-system/styles.css`.

## Review gate

Before declaring work ready, report: changed system layers, comparable artifact followed, API/a11y impact, Storybook pages affected, token/theme impact, duplicate-selector check, and commands run. Call out deliberate deviations and why they are necessary.

## Reusable implementation prompt

> Use `$storybook-design-system-guardrails` to make this Inkwell change: **<request>**. First read `CLAUDE.md` and `references/storybook-structure.md`; then inspect the closest existing component and its source, stories, MDX, test, CSS selectors, tokens, barrel export, and status entry. State the impact chain and any decisions requiring approval before editing. Follow the existing Storybook IA and artifact pattern exactly unless I explicitly authorize a structural change. Use tokens, preserve the public API and accessibility baseline, check for duplicate CSS selectors in `src/styles/inkwell.css`, and verify the relevant Storybook rendering in light and dark themes. Finish with tests/typecheck/build results and a concise list of changed layers and intentional deviations.
