# Inkwell Design System Design

**Goal:** Define Inkwell v1 as a generic product design system seeded from the current app's strongest reusable UI, while keeping the current app untouched.

**System posture:** Inkwell should be generic in applicability but specific in taste. It should preserve most of the current visual identity, provide reusable UI foundation plus interaction guidance, and serve as a private/internal system for future apps.

## 1. Product Intent

Inkwell is not a public, neutral component library. It is a reusable internal design system for future apps built by the same owner. The system should:

- preserve the current dark, high-contrast, editorial visual language
- generalize naming and guidance so it is not tied to the coaches poll domain
- provide reusable components plus clear interaction guidance
- use Storybook as the primary engineering source of truth
- align cleanly with a future Figma library without making Figma a prerequisite for v1

Inkwell v1 is explicitly scoped as:

- UI foundation
- reusable components
- interaction guidance

It is explicitly not:

- a full application framework
- a product-specific component dump
- a public multi-team platform with heavy governance requirements

## 2. Visual Direction

Inkwell should keep most of the current look. The objective is not to neutralize the system or redesign it from scratch. The visual identity should remain:

- dark-forward
- typographically strong
- high-contrast
- slightly editorial rather than generic SaaS

What should change is not the personality, but the framing:

- remove domain-specific naming
- remove app-specific workflow assumptions
- define components and tokens around reusable product use rather than current screen ownership

This means Inkwell should feel like the same family as the current UI, but not like a “coaches poll kit.”

## 3. Consumer Model

Initial audience:

- just the owner, across future apps

That means v1 should optimize for:

- clarity
- portability
- consistency
- reasonable internal discipline

It does not need to optimize yet for:

- external publishability
- many-team governance
- broad framework support beyond the current stack

## 4. API Philosophy

Inkwell component APIs should be balanced:

- not overly rigid
- not fully unbounded

The system should provide a small, coherent set of variants, sizes, and interaction patterns while still being usable across multiple future apps.

Guiding rules:

- prefer a curated API surface over unlimited overrides
- keep variants semantic where possible
- keep the most common configuration paths easy
- allow flexibility where app contexts genuinely differ
- avoid exposing app-specific assumptions through props or naming

## 5. Naming Strategy

Inkwell v1 should use moderate cleanup.

Keep existing names when they are already generic and useful:

- `Button`
- `Panel`
- `ModalFrame`
- `Pill`
- `Select`
- `StatusBanner`
- `Toast`
- `PopoverMenu`
- `SplitButton`

Retain composition relationships rather than over-splitting:

- `IconButton` remains within the button system
- `SectionHeading` remains within the panel system
- `EmptyState` remains within the panel system
- `ToastRegion` is treated as infrastructure rather than a top-level component

Rename only when:

- a name is tied to the current app domain
- a name leaks implementation detail rather than system intent
- a name blocks reuse across future apps

## 6. V1 Scope

### Include

Foundations:

- tokens
- color
- typography
- spacing
- radius
- shadows
- motion, if the current system has enough coherent value to justify keeping it

Reusable assets:

- icons

Reusable components:

- `Button`
- `Panel`
- `ModalFrame`
- `Pill`
- `Select`
- `StatusBanner`
- `Toast`
- `PopoverMenu`
- `SplitButton`

Nested/supporting component coverage:

- `IconButton` under `Button`
- `SectionHeading` under `Panel`
- `EmptyState` under `Panel`
- `ToastRegion` documented as supporting infrastructure where useful
- keep all currently approved supporting candidates in scope for documentation and system framing

Documentation:

- component docs
- usage rules
- interaction guidance
- accessibility notes

### Exclude

Do not bring these into Inkwell v1:

- auth flows
- ballot flows
- results views
- app shell
- navigation pattern
- product-specific Storybook fixtures
- app bridge/state mocking infrastructure tied to the current product

## 7. Information Architecture

Recommended Storybook IA for Inkwell v1:

- `Foundations`
- `Components`
- `Guidance`

Do not include `Pages`.

Do not include `Patterns` in v1 unless a pattern is genuinely reusable across multiple future apps. Since the approved scope is UI foundation plus interaction guidance, `Guidance` is the correct top-level section instead of app-shaped patterns.

### Foundations

Recommended structure:

- Overview
- Tokens
- Using Tokens in Code
- Color
- Typography
- Spacing
- Radius
- Shadows
- Motion if retained

### Components

Each reusable component should default to:

- `Docs`
- `Playground` when it adds real value
- `Features`

Exception:

- `Panel` may remain `Docs + Features` only if a standalone playground adds no real value

### Guidance

This section should capture cross-component standards such as:

- action hierarchy
- feedback usage
- form/control patterns
- density and emphasis rules
- when to use modal vs inline surfaces
- when to use toast vs banner vs pill

## 8. Documentation Model

Component docs should follow the RelayFi-inspired structure that was chosen during brainstorming, without a metadata strip.

Each major component docs page should include:

- short intro
- when to use
- primary example
- API table
- grouped feature sections
- usage guidance
- keyboard and accessibility notes when relevant

This keeps Storybook as both:

- a developer reference
- a design and interaction guidance surface

## 9. Relationship to Figma

Inkwell v1 should be built so it can map cleanly to a Figma library later, but it does not need a formal Figma dependency on day one.

That means:

- tokens should be named and structured with future design-tool alignment in mind
- components should be documented as stable reusable pieces
- visual and behavioral guidance should be clear enough to translate into a future Figma system

Figma alignment is a forward-compatibility requirement, not a v1 implementation blocker.

In practical terms, Figma alignment means:

- token names should be stable enough to become future Figma variables without renaming the system later
- component docs should describe variants, states, hierarchy, and interaction expectations clearly enough to mirror in a Figma component set
- spacing, typography, color, radius, and motion decisions should be expressed consistently so a future Figma library can inherit the same rules
- Storybook should function as the current source of truth, with future Figma work expected to map to Storybook rather than redefine the system independently

## 10. Extraction Strategy

The current app should remain unchanged.

The correct approach is to branch off or seed Inkwell from the current system rather than extract and refactor the current app in place.

Implications:

- copy, do not move
- treat the current app as source material
- build Inkwell as its own system boundary
- do not optimize for zero-diff extraction from the current app

This makes the work materially safer and allows cleaner organization decisions for Inkwell.

Recommended system boundary:

- use a separate repository for Inkwell
- treat the current app as a reference source, not as the long-term home of the design system
- copy only approved reusable assets, components, tokens, and docs patterns into the new repo
- keep app-specific flows, state logic, routing, and shell concerns behind in the current app

This gives Inkwell clean ownership, avoids accidental coupling to product code, and makes future reuse across other apps materially easier.

## 11. Token Strategy

Inkwell should use structured token files as the source of truth, with generated CSS variables as the runtime output.

Recommended format:

- define tokens in structured data files such as JSON
- generate CSS custom properties from those token files for use in components and docs
- keep naming semantic and reusable rather than screen-specific

Why this direction:

- it keeps the authored source portable across future tools and apps
- it makes future Figma variable alignment materially easier
- it preserves a simple CSS-variable consumption model in the browser while avoiding hard-coding the design language directly into CSS files

The system should avoid making raw CSS files the only canonical token source, because that creates more friction when the system later expands into broader tooling or design-library alignment.

## 12. Motion Strategy

Motion should remain in scope for Inkwell v1 as a first-class foundation.

The intention is not animation for its own sake. Motion here means reusable interaction behavior such as:

- hover and press feedback
- focus transitions
- menu, popover, and modal open-close timing
- toast entry and exit behavior
- reduced-motion handling

Motion guidance should define:

- standard durations
- easing choices
- where motion adds clarity
- where motion should be suppressed or minimized

This keeps microinteractions consistent across future apps and makes the system feel authored rather than purely static.

## 13. Success Criteria

Inkwell v1 is successful if:

- the current app remains untouched as a product codebase
- Inkwell has a coherent reusable foundation
- visual identity remains strong and recognizable
- component names and docs are generic enough for future apps
- Storybook documents both components and interaction rules
- future apps can adopt Inkwell without inheriting coaches-poll-specific workflows

## 14. Resolved Planning Decisions

The following direction is now decided for planning:

- repo shape: separate repository
- token source: structured token files with generated CSS variables
- motion: included as a first-class foundation
- reusable candidates retained: `IconButton`, `SectionHeading`, `EmptyState`, `ToastRegion`, and `SplitButton`
- Figma alignment: represented through naming, variant/state documentation, and Storybook-as-source-of-truth until a dedicated Figma library exists

Remaining implementation planning work is operational rather than directional:

- define the initial repo scaffold for the new Inkwell repository
- choose the exact token file schema and generation approach
- decide which approved components are ported in wave 1 versus wave 2
- define the first set of guidance pages to author in Storybook
