# Adoption review — 2026-10-14

This note records the code review behind the next Inkwell adoption work. The
Jobs app was read only; no Jobs source files were changed.

## Accessibility audit priority

| Component | Code review result | Still needed before “Meets standards” |
| --- | --- | --- |
| Drawer | Focus now enters the panel when no control exists, including when `open` changes after mount. Tab wraps at panel edges and from outside focus. The close control now has an explicit focus outline. | Keyboard and screen reader pass at desktop and mobile widths; verify focus return, custom headers, nested content, and backdrop behavior. |
| CheckboxSelect | The trigger, option group, and mobile dialog now share a name. Icon labels can provide `ariaLabel`. | Verify mobile dialog focus and close behavior in a browser; inspect search, no-results, disabled options, and screen reader announcements. |
| Table | Semantic table, column headers, sortable buttons, and `aria-sort` already exist. Sort buttons now have an explicit focus outline. | Confirm sort announcements, horizontal scroll keyboard behavior, and whether a non-overflowing table should add a tab stop. |
| RichTextSafe | Native links and heading markup are preserved when expanded. | Resolve clipped interactive descendants when `collapsed` is used, then test keyboard and screen reader behavior. The new expandable content component is the likely place to own this behavior. |

The status registry remains **Not reviewed** for all four. Unit tests cover the
specific fixes but do not substitute for the manual pass. The focus ring token
measures 3.35:1 over white in light theme and approximately 3.47:1 when its
72% dark-theme alpha is composited over the raised `#101010` surface. Rendered
focus indicators still need inspection, especially if consumers override tokens.

## Jobs responsive patterns

The Jobs page already uses Inkwell `Container`, `Card`, `Nav`, `FormField`,
`Select`, `TextInput`, `Checkbox`, and `Button`. The remaining layout is mostly
composition rather than a missing primitive:

- The header uses `Container` plus a flex row with wrap. This can be documented
  as a responsive header composition with `Inline` or `Stack`; a dedicated
  PageHeader component is not justified by one consumer.
- The filter area uses a `Nav` status row, a wrapping row of select and checkbox
  controls, then a single-column layout below 42rem. `Grid` can express the
  paired select columns; `Stack`/`Inline` can express the outer groups. The
  source/company filters have selection count, search, and a mobile sheet. They
  are a useful real-world fixture for `CheckboxSelect`, but Jobs currently has
  custom apply/close and summary behavior, so a direct replacement needs a
  parity review.
- The filter summary and action row becomes stacked on narrow screens. A
  Storybook **Patterns** example can show this composition using mock data,
  without introducing app routing, fetch logic, or status-specific labels.

Relevant Jobs source: `src/app/page.tsx`, `src/app/FilterBar.tsx`,
`src/app/CheckboxFilter.tsx`, and `src/app/globals.css` in the Jobs checkout.

## Component scopes proposed for approval

### Expandable content

Use a controlled or uncontrolled `expanded` state, a measured content region,
and a `TextDisclosure` trigger. Show the trigger only above a configurable
height threshold. Preserve the trigger's viewport position when collapsing and
respect reduced motion. Accept any React content, with `RichTextSafe` composed
by consumers for sanitized HTML. The component must keep clipped links out of
the keyboard sequence without hiding the visible excerpt from assistive
technology. Validate content changes, resize, short content, and focus already
inside content at collapse time. The Jobs `DescriptionPanel.tsx` is the behavior
reference; its HTML ingestion and 72px/160px thresholds remain app decisions.

### Status details popover

Provide a semantic trigger with status icon, label/summary, and a details
surface composed from title, description, evidence, and action slots. Keep
status names, verification rules, requests, and decisions in the app. Jobs uses
an interactive details panel, so the surface needs a named dialog contract at
desktop and mobile sizes, focus management, Escape, and return focus. Existing
Inkwell `Popover` supports a mobile dialog but desktop content mode has no
dialog role; decide whether to extend that primitive or build this component on
another accessible dialog foundation before implementing it.

Relevant Jobs source: `src/app/DescriptionPanel.tsx` and
`src/app/OfficialPostingPanel.tsx` in the Jobs checkout.

## Smaller source-owned CSS option

The selected fragment mode generates CSS from the canonical stylesheet using
explicit selector ownership by source module. `inkwell init --css=fragments`
opts in; the default still appends the complete component stylesheet. Shared
rules are installed once, and subsequent `add` commands append only new
fragments. App-only selectors without an exported component owner are omitted.
The canonical component CSS is about 111 KB before compression and 21 KB
gzipped; a Button install adds roughly 7 KB of component fragments before
compression. Tokens add about 18 KB before compression in either mode.
In a headless Chromium check, representative Button, Table, Drawer, Nav,
Popover, Select, CheckboxSelect, form, text, layout, status, and pagination
elements had zero computed-style differences between the complete stylesheet
and the generated fragment set at 320, 375, 768, and 1280px in both themes.
The CLI fixture also builds a Button-plus-Table fragment installation after an
incremental add. These checks cover the named samples; a final manual visual
pass remains useful before publication.
