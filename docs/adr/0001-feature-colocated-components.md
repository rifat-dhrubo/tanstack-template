# ADR 0001: Feature-Colocated Components

## Status

Accepted

## Context

Feature implementation was drifting across global folders such as shared components, hooks, lib files, and route files. This makes feature ownership unclear and encourages accidental coupling between unrelated app areas.

The app uses file-based routes, so route files still need to live under the router's route tree. Most feature implementation code does not need to live there.

## Decision

Feature-owned code lives under `src/features/<feature>/`. A feature may contain nested subfeatures when the domain area is broad. Use `src/features/<feature>/<subfeature>/` for independently owned slices such as `src/features/auth/sign-in/` or `src/features/lexicon/lexicon-search/`.

Each feature may contain folders such as:

- `components/`
- `hooks/`
- `lib/`
- `api/`
- `types/`

Route files stay in `src/routes/` and should be thin. They import feature behavior from `src/features/<feature>/` or `src/features/<feature>/<subfeature>/` instead of owning substantial feature UI or logic.

Feature components live under that feature's `components/` folder. If a component has meaningful subcomponents, make it a directory with a barrel export. The barrel should expose only the public component API needed by other files.

For broad features, put components at the narrowest ownership level. Shared-within-feature components can live at `src/features/<feature>/components/`; subfeature-specific components should live at `src/features/<feature>/<subfeature>/components/`.

Example shape:

```txt
src/features/lexicon/
  lexicon-search/
    components/
      lexicon-search/
        index.ts
        lexicon-search.tsx
        search-loading-state.tsx
        search-error-state.tsx
    hooks/
    lib/
    index.ts
  index.ts

src/features/auth/
  sign-in/
    components/
      sign-in-form/
        index.ts
        sign-in-form.tsx
        sign-in-error.tsx
    lib/
    index.ts
  sign-up/
    components/
    index.ts
```

## Consequences

- Feature ownership is easier to see from the filesystem.
- Broad feature areas can still be split into independently owned subfeatures.
- Components that are only used by one feature do not pollute global component folders.
- Subcomponents can change without expanding the feature's public API.
- Shared design-system primitives still live under shared UI folders.
- A component should move to shared UI only when multiple features genuinely need the same reusable primitive.
