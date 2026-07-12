# RelayFi Storybook — structural reference

Reference notes on `https://storybook.relayfi.design/` (RelayFi's public design
system, named **Telegraph**). This is the shape Inkwell's docs should evolve
toward — at a smaller scale. Captured 2026-07-12.

Purpose: avoid re-reading the site every time we plan Inkwell docs work. Update
if RelayFi's structure changes materially.

---

## Top-level sidebar (their IA)

```
Foundations
  Color
    Palettes
    Applying Color
  Spacing
  Typography            (parent group, not a single page)
  Layout
  Motion
  Responsive

Tokens
  Getting Started       (parent group)
  Color                 (parent group)
  Typography            (parent group)
  Size                  (parent group)
  Spacing               (leaf page)
  Shadow                (leaf page)
  Shape                 (parent group)

Component Status
  Status                (per-component status table)
  Overview              (defines the Beta/Stable/Healthy lifecycle)

Typography
  Heading
  Number
  Text

Layout
  Box
  Flex
  Inline
  PageLayout
  Spread
  Stack

Components
  AutocompleteSelect, Avatar, Badge, Banner, Breadcrumbs, Button, ButtonCard,
  Card, Checkbox, Command, ContextMessage, CurrencyInput, DatePicker, Divider,
  File Upload, Filter, Form, Icon, Icon Button, Link, List, Menu, Menu Canary,
  Modal, Multiselect, Native Select, Nav Sidebar, OTP Input, PageHeader,
  Pagination, PasswordInput, Payment Card, Payment Card Thumbnail, PhoneInput,
  Popover, Progress Badge, ProgressBar, Radio, RadioCard, Select, Side Panel,
  SideNav, SkeletonLoader, Splash Screen, SystemAlert, Table, Tabs, TextArea,
  TextInput, Toast, Toggle, ToggleGroup, Token, Toolbar, Tooltip
```

**Section notes:**

- **Foundations** = *conceptual* pages (principles, how to apply things,
  cross-cutting rules). Longer prose, fewer tables.
- **Tokens** = *the values themselves*. Copy-to-clipboard tables of token
  names, CSS variables, Tailwind classes, values, descriptions. Reference
  material, not narrative.
- **Component Status** is its own top-level section, not buried in Foundations.
  It's important enough to promote.
- **Typography** and **Layout** appear TWICE: once as Foundations pages
  (concepts) and once as leaf sections under primitive Components (per-primitive
  APIs like `Heading`, `Box`, `Flex`, `Stack`). Not a duplicate — they're
  concept vs. component.
- Every component name in their **Components** list is prefixed `Telegraph*` in
  the actual code (`TelegraphButton`, `TelegraphAvatar`, etc.). Inkwell has no
  equivalent prefix and shouldn't add one.

---

## Foundations — per-page anatomy

Each Foundations page uses a consistent H1 → H2 → H3 structure with prose,
inline code samples, and token tables.

### Foundations / Color / Applying Color

Headings: `Applying color` (H1) → `App framing` (H2) → `Backgrounds`, `Surfaces`,
`Fills` (H3) → `Interaction states` (H2) → `Hierarchy and roles` (H2) →
`General semantic usage` (H2).

Substance: "Color is deliberately used to reinforce meaning or content
hierarchy." The framing metaphor is 3 background types (backgrounds → surfaces
→ fills) as a *z-axis of the screen without explicit elevation*. Each subsection
has a token table with columns: **Sample · Token name · CSS Token · Tailwind
Class · Value · Description**.

**Inkwell take-away:** this is the model to steal for our own "Applying color"
page. We already have the tokens; we need the *narrative* explaining the
backgrounds → surfaces → fills stack and the interaction-state layering.

### Foundations / Motion

Headings: `Motion` → `Principles` (Intentional, Physical, Contextual,
Accessible) → `Use Cases` (Continuity, Progress, Attention, Physicality) →
`Examples` (Numbers, Expressive, Utilitarian, Macro/Entry/Next/Change,
Micro/Hover/Toggle/Feedback/Selection).

Substance: **Principles first, use-cases second, examples third.** Each
principle is a short paragraph (~3 sentences). Utilitarian vs. Expressive is
the key distinction they make. "If you are struggling to tie your use of motion
to a specific use case, it is likely unnecessary."

**Inkwell take-away:** motion is a *first-class Foundation* per our design doc,
and this three-tier structure (principles / use cases / examples) is what it
should look like. We have motion tokens (`--duration-fast`, `--ease-default`)
but no narrative yet.

### Foundations / Layout

Headings: `Layout` → `Viewport ranges` → `Breakpoints`.

Substance: two named viewport tokens (`size-viewport-narrow`, `-regular`,
`-wide`) that "drive layout and sizing changes in component props" — plus raw
`size-breakpoint-sm/md/lg/xl` for custom media queries. Explicit guidance:
"Prefer viewport ranges for most responsive layout decisions."

### Foundations / Responsive

Short page. One concept: **responsive prop values**. Primitives (Flex, Box,
Stack, Heading, etc.) accept either a scalar or an object keyed by viewport:

```jsx
<TelegraphFlex
  direction={{ narrow: 'col', regular: 'row' }}
  gap={{ narrow: 'space-100', regular: 'space-200', wide: 'space-400' }}
  justify={{ narrow: 'start', regular: 'start', wide: 'between' }}
/>
```

Marked in each Storybook argsTable. **Inkwell doesn't do this today** — our
layout primitives are scalar-prop only. A future direction, not a v1 need.

### Foundations / Color / Palettes

Raw color palette swatches (Sand, Green, etc.) — the "palette layer" beneath the
semantic Applying Color page. Analogous to our current
`src/foundations/colorPrimitives.stories.jsx`.

### Foundations / Spacing, Typography

Reference tables of the tokens with samples. Similar to our current
`src/foundations/spacing.stories.jsx`, `typography.stories.jsx`.

---

## Component Status system

RelayFi promotes **Component Status** to a top-level sidebar section with two
pages: **Status** (per-component tracker) and **Overview** (lifecycle
definitions).

### Lifecycle stages

They define four milestones. A component must meet **all criteria** to progress:

| Stage | Meaning |
|---|---|
| **Beta** | Functional, ready for preliminary use. May be missing secondary functionality, non-responsive, minimal docs, incomplete a11y. Initial usage encouraged for testing. |
| **Stable** | Meets most maturity criteria. Used in production in multiple places, API stable, keyboard nav implemented, responsive, usage guidelines cover most cases. |
| **Healthy** | Deeply embedded across products, long-term support expected. |
| **Deprecated** | (used on some entries like the old `Menu`) |

Each stage's definition covers 6 axes:

1. **Functionality** — primary/secondary use cases tested, production usage
2. **Implementation Strategy** — API stability, breaking-change risk, alignment
3. **Accessibility** — contrast/sizing (Beta) → keyboard nav (Stable) → full
4. **Responsiveness** — desktop-only OK for Beta, adapts to all sizes for Stable
5. **Documentation** — minimal (Beta) → usage guidelines + examples (Stable)
6. **Performance** — no regressions, well-tested

### Status table (per-component tracker)

Columns: **Component · Status · Accessibility Reviewed · Link (Figma)**

Rows show, e.g.:
- `TelegraphButton — Stable — Meets accessibility requirements — Open in Figma`
- `TelegraphCard — Beta — Not reviewed for accessibility — Open in Figma`
- `TelegraphMenu — Deprecated — Not reviewed for accessibility`

**Inkwell take-away:** adopt this as a Storybook doc page. Even without Figma
links, tracking Beta/Stable status per component is high-value and low-cost —
we already know which components meet Stable criteria (all 14 of them, with the
possible exception of Progress which is still under design iteration).

---

## Component doc anatomy (from `Components / Button`)

Standard structure for every component doc page:

```
H1: <ComponentName>              # short intro sentence
    Stable  ·  Meets a11y  ·  Open in Figma    # status badges
    <live example>
    <"Show code / Copy code" buttons>
    <ArgTypes-style prop table>
H2: Features
  H3: Variant, Size, Visuals, States, Full width, Rounded, Hover text
      (each shows a small demo + a code toggle)
H2: Usage guidelines
H2: Keyboard functionality
```

Prop-table columns: **Name · Description · Default**. Union types render as
stacked string literals: `'primary' | 'secondary' | ...`.

**Inkwell take-away:** our `.mdx` docs already loosely mirror this (Playground →
API → Features → Usage guidance → Keyboard/a11y). We should:

- Add a **status badge row** near the top (Beta/Stable + a11y note).
- Standardize the H2 order across all components. Currently some have "Features"
  before "API", some the other way — pick the RelayFi order (features under
  API) and normalize.

---

## Tokens section (their model)

Separate from Foundations. Each token category is a group with per-topic pages
inside. Every token is presented with **copy-to-clipboard buttons for both the
JS name and the CSS variable** (and Tailwind class where applicable).

**Inkwell take-away:** we have `src/foundations/*.stories.jsx` doing part of
this — but it's mixed with the conceptual Foundations. Splitting into two
sections (**Foundations** for concepts, **Tokens** for tables of values) is
cleaner and worth the small refactor when we do the docs pass.

---

## What to adopt for Inkwell v1 docs

Ranked by impact / effort ratio:

1. **Component Status page** — one table, one lifecycle Overview page. High
   value, ~2 hours of work.
2. **Standardize component doc anatomy** — normalize the H2 order across all
   14 `.mdx` files. Also standardize on status badges at the top.
3. **Foundations / Applying Color** narrative — write the backgrounds → surfaces
   → fills story using our existing `--color-background-*` tokens. Analog to
   RelayFi's Applying Color page.
4. **Foundations / Motion** narrative — three tiers: principles, use cases,
   examples. We have motion tokens already; we're missing the language for how
   to use them.
5. **Split Foundations vs. Tokens** — long-term cleanup. Move the raw token
   catalogs (color primitives, spacing, radius, shadow) into a separate
   `Tokens` top-level section; keep Foundations for narrative pages.
6. **Guidance section** — RelayFi doesn't have a separate top-level "Guidance"
   section (their cross-cutting guidance lives inside Foundations). Our design
   doc calls for a `Guidance` section. Reasonable read: fold it into
   Foundations rather than making it a separate root, matching RelayFi's shape.

## What NOT to adopt

- **`Telegraph*` prefix** — no equivalent needed. Inkwell components are just
  their name (`Button`, `Table`, etc.).
- **Responsive props on primitives** (`{narrow: 'col', regular: 'row'}`) — nice,
  but a much larger architectural change than Inkwell v1 warrants.
- **`Menu Canary` style "in-progress rewrite" entries** — noise for a small
  library. If we're rewriting a component, replace it in place.
