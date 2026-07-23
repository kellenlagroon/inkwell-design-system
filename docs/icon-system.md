# Inkwell icon system

The canonical, human-facing guidance lives in Storybook:
**Foundations → Icons**. This file is the contributor reference for changing
the icon set.

## Sources

- Interface icons: Solar Linear.
- Third-party brands: Simple Icons.

The approved, code-level exports are in `src/components/icons.jsx`. Their
component names describe the product meaning, rather than merely the drawing.

## Change checklist

When adding or replacing an icon:

1. Confirm an approved icon cannot express the same stable product concept.
2. Use Solar Linear for an interface icon or Simple Icons for a brand mark.
3. Preserve the source SVG's 24 × 24 viewBox and use `currentColor` unless a
   branded treatment explicitly requires a native color.
4. Export the icon through `src/components/icons.jsx` and add it to the
   Storybook Icons gallery.
5. Record the upstream name, source URL, version or retrieval date, and license
   in the change's pull request description. Verify the upstream license before
   distributing a new source asset.
6. Use the icon’s semantic name consistently across components and provide an
   accessible name on any icon-only control.

## Existing approved icons

### Solar Linear

`IconArrowDown`, `IconAward`, `IconCheck`, `IconClose`, `IconCopy`,
`IconDotsVertical`, `IconEye`, `IconList`, `IconLogout`, `IconRestart`,
`IconSettings`, `IconShirt`, `IconTrophy`, `IconUsers`

### Simple Icons

`IconGoogle`, `IconDiscord`
