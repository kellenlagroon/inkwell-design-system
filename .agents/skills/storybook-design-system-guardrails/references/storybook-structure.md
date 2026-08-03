# Inkwell Storybook Structure

Use this repository-specific map as the source of truth for normal placement and relationships. Re-check the source files if a requested change appears to contradict this snapshot.

## System layers and sources

| Layer | Canonical location | Rule |
|---|---|---|
| Token source | `tokens/inkwell.tokens.json` | Edit here, then generate CSS. |
| Generated tokens | `src/styles/tokens.css` | Never edit manually. |
| Global component styles | `src/styles/inkwell.css` | Wrapped in cascade layers. Search for an existing definition before adding a selector. |
| Component implementation | `src/components/*.tsx` | TypeScript, colocated tests. |
| Component stories | `src/components/*.stories.jsx` | Playground controls and feature-focused stories. |
| Component docs | `src/stories/components/*.mdx` | MDX references the component’s stories. |
| Foundations/tokens docs | `src/foundations/*.stories.jsx`, `src/stories/foundations/*.mdx` | Use Foundations for concepts and Tokens for values. |
| Public API | `src/index.ts` | Export components and public types. |

## Sidebar IA

`.storybook/preview.jsx` sorts the sidebar in this order:

1. Foundations — conceptual guidance: Overview, Applying Color, Icons, Motion, Responsive, Overriding Inkwell.
2. Tokens — token reference and token use in code.
3. Component Status — `Status` and `Overview` maturity/a11y documentation.
4. Patterns — reusable compositions such as Modals and mobile-readiness flows.
5. Components — individual primitives and controls.

Keep the concepts-versus-APIs distinction: a Foundation page explains a cross-cutting decision, while a Component page documents a shippable API. Do not add a new top-level category casually.

## Standard component slice

For a standalone component named `Foo`, use:

```
src/components/foo.tsx                  implementation
src/components/foo.test.tsx             Vitest + Testing Library behavior tests
src/components/foo.stories.jsx          `title: "Components/Foo"`; Playground controls
src/components/foo.features.stories.jsx `title: "Components/Foo/Features"`; focused examples
src/stories/components/Foo.mdx          `<Meta of={FooStories} name="Docs" />`
src/index.ts                            component and public type exports
src/stories/componentStatus/Status.mdx  catalog row/status/docs link
```

Some components intentionally share a docs page: IconButton and ButtonLink with Button; EmptyState, Panel, SectionHeading, Container, Center, and Paper with Surface; CardActions with Card; PopoverMenuItem with Popover; ToastRegion with Toast. Text, Heading, and Link are filed under Tokens/Typography utilities by design. Preserve those relations rather than creating duplicate leaf pages.

## Docs anatomy

The local pattern is an H1 with a concise purpose and a status/a11y line, then a selection of:

1. `When to use` or primary example.
2. A primary `Canvas` using the Playground story.
3. `API` using `ArgTypes`.
4. `Features`, with focused `Canvas` examples.
5. `Usage guidance` with do/don’t content when useful.
6. `Keyboard and accessibility` behavior.

Keep docs examples tied to real exported stories. Use `sourceState="hidden"` consistently for component canvases.

## Component maturity contract

`src/stories/componentStatus/Status.mdx` is the active registry. `Stable` means API-safe and manually reviewed against Inkwell accessibility criteria; `Beta` means usable but open to API/a11y adjustments. The row’s documentation link is part of the catalog contract.

## CSS architecture and naming policy

`tokens.css` declares the layer order and `inkwell.css` fills it:

```css
@layer inkwell.tokens, inkwell.base, inkwell.components;
```

Unlayered CSS beats layered CSS whatever the specificity, which is what lets a consumer override Inkwell without a specificity fight. Never add a rule outside a layer.

The page baseline (`background`, `color`, `font-family`) is opt-in via `.inkwell-page`, and native form elements are deliberately unstyled. Do not add bare element selectors.

Before adding or changing a selector, search the full file. If a component's property needs a different value, change it where the component is defined; do not restate the selector later. For a collision-prone generic name, prefer `.ink-*` (for example `.ink-table`, `.ink-tabs`, `.ink-avatar`, `.ink-divider`, `.ink-list`, `.ink-spinner`).

Do not use `!important` or specificity escalation to mask a collision. Merge the duplicate or choose a safe namespace.

## Validation commands

```powershell
npm run tokens             # Required after token source changes
npm run test
npm run typecheck
npm run build-storybook    # Required for Storybook/config/IA changes; useful final integration check
npm run build              # Required for public package/export/style distribution changes
```

Run Storybook with `npm run storybook` to inspect the relevant component in both themes. Verify structure and computed styles in addition to visual appearance.

For a stylesheet change, snapshot computed styles for a representative set of elements across several viewport widths in both themes, make the change, snapshot again, and expect zero differences unless the change was meant to be visible. A spot-check will miss a regression that a diff catches.

Storybook's indexer does not survive the working tree changing underneath it. After a branch switch or bulk file rewrite, restart the dev server; the tell is that `build-storybook` succeeds while the running server reports a load error.
