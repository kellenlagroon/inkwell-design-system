# Inkwell CLI distribution

The `inkwell` command is a source-owned distribution path for personal React
projects. It is shipped by—not instead of—the versioned
`@lagroon/inkwell-design-system` npm package.

```bash
npx @lagroon/inkwell-design-system init
npx @lagroon/inkwell-design-system add button card action-group
```

`init` validates that the current directory is a React project, then creates:

- `inkwell.json`, containing the configurable component destination and stylesheet path.
- `src/components/inkwell/inkwell.css`, a single stylesheet with the generated
  token layer and opt-in base layer.
- `inkwell.ai.md`, a compact, user-owned guide for coding agents. Reference it
  from a project's `AGENTS.md`, `CLAUDE.md`, Cursor rules, or equivalent; the
  CLI never changes those instruction files.

The generated stylesheet references **Source Sans 3** for interface text and
**League Spartan** for display text, but does not bundle font files. Load both
families before the generated stylesheet. A Google Fonts setup can begin your
application CSS with:

```css
@import url("https://fonts.googleapis.com/css2?family=League+Spartan:wght@400..800&family=Source+Sans+3:wght@400..800&display=swap");
```

Self-hosting is also supported when the same family names and weights are
declared.

`add` copies production TypeScript source only. It follows registry-declared
source dependencies (for example, Button brings Spinner), appends the matching
CSS fragment inside `inkwell.components`, and installs any declared npm
dependencies. The current registry covers the action and content primitives:
Every non-icon public component export is available. Form entries copy the
shared `forms.tsx` module and its local icon dependency, preserving the source
module's existing relationships. Public icons remain catalogued separately in
Foundations/Icons and are copied only when a component needs them internally.

The first component added appends Inkwell's canonical layered component
stylesheet to the single stylesheet created by `init`. This deliberately favors
visual fidelity and one predictable CSS artifact over per-component CSS
pruning; later `add` commands do not rewrite that user-owned stylesheet.

## Ownership and safety

Every copied `.tsx` file is user-owned. `add` plans all target paths before it
writes and refuses if any target already exists. It also refuses to replace an
existing `inkwell.json` or initial stylesheet. Re-running `add` for a component
therefore fails rather than silently updating it. The stylesheet is additive:
new component fragments are appended and recorded in `inkwell.json`; existing
CSS is never replaced.

The generated stylesheet retains the library's layer order:
`inkwell.tokens`, `inkwell.base`, `inkwell.components`. The page canvas remains
opt-in with `className="inkwell-page"`.

## Configuration

Edit `inkwell.json` before adding components to choose a different destination:

```json
{
  "components": "src/ui/inkwell",
  "stylesheet": "src/ui/inkwell/inkwell.css",
  "installed": []
}
```

The installer keeps local component imports sibling-relative, so this works at
any configured destination.

## Migrating between paths

Choose one path for an individual component. To move from the npm package,
remove that component's package import, run
`npx @lagroon/inkwell-design-system add <component>`, import
from the copied local file, and replace the package stylesheet import with the
generated local stylesheet. Keep the npm package when its versioned, complete
catalog is the better fit; no existing package consumer needs to change.

Do not run `add` over a hand-created component with the same name. Rename or
move your file first if you intentionally want a fresh source copy, then review
and merge it yourself.
