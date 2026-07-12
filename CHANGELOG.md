# Changelog

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
