# Inkwell CLI distribution

The `inkwell` command is a source-owned distribution path for personal React
projects. It is shipped by—not instead of—the versioned
`@lagroon/inkwell-design-system` npm package.

```bash
npx @lagroon/inkwell-design-system init
npx @lagroon/inkwell-design-system add button card action-group
npx @lagroon/inkwell-design-system version
npx @lagroon/inkwell-design-system diff button
```

For smaller source-owned CSS, choose fragment mode when initializing a new
installation:

```bash
npx @lagroon/inkwell-design-system init --css=fragments
npx @lagroon/inkwell-design-system add button
```

The default `full` mode keeps the complete component stylesheet. Fragment mode
appends generated CSS for each installed source module and its shared
dependencies to the same `inkwell.css` file. Later `add` commands append only
fragments that are not already installed. Both modes keep tokens, base styles,
and component styles in Inkwell's cascade layers. Set the mode during `init`;
changing `cssMode` after adding components is unsupported because the installed
stylesheet is user-owned. Fragment mode omits legacy app-only selectors that
are not part of exported components.

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

In Next.js, use `next/font/google` with `variable: "--font-source-sans"` and
`variable: "--font-league-spartan"`, then apply
both generated class names to the document root. Confirm the computed family
in devtools before shipping; Inkwell's semantic `--font-family-body` and
`--font-family-display` variables resolve those consumer-owned variables.

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

In default mode, the first component added appends Inkwell's canonical layered
component stylesheet to the file created by `init`; later `add` commands do
not rewrite it. Fragment mode keeps the same single-file ownership contract
with a smaller install. `inkwell diff` reviews either mode against the current
CLI package.

`version` reports the CLI package version, the recorded source version of each
installed component, and whether copied files or the stylesheet have changed
since installation. Installations created before provenance tracking show an
unknown source version. Shared source files keep the version from their first
install when another component uses them later. `diff` compares installed files and the stylesheet with
the current CLI package and prints a unified diff. Pass component names to
limit the source-file comparison; the stylesheet is always included because it
is shared. Both commands are read-only and work without registry access. Review
and merge changes yourself; neither command upgrades owned files.

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
  "cssMode": "full",
  "installed": [],
  "sourceVersions": {},
  "sourceFiles": {}
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
