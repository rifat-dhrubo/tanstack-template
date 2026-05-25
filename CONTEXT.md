# Context

## Glossary

### Template cleanup

Removing product-specific names, generated API artifacts, demo-only navigation, stale assets, and page copy from this repository so new applications start from a neutral TanStack Start template.

Template cleanup keeps generic starter examples only when they teach the template stack without implying a specific product domain.

### Orval scaffold

A neutral API generation setup that keeps Orval available as a first-class template integration without shipping a product-specific or public-demo API client.

The scaffold should make it easy for a new application to connect its OpenAPI specification, regenerate typed client code, and update the shared API client configuration.

### Internationalization scaffold

A neutral localization setup that keeps Paraglide available as a first-class template integration without shipping application-specific copy or locale assumptions.

The scaffold should make it easy for a new application to add locales, translate message files, switch languages, and keep localized URLs working across starter pages.

### Dependency modernization

Updating this template's package dependencies, tooling, lockfile, and related configuration so the project uses the latest stable releases wherever practical while preserving a working application.

This includes breaking major-version upgrades when they are handled as explicit, verified migration slices.

Existing prerelease or nightly dependencies are not expanded by default; they remain exceptions until a stable migration path is chosen.

## Tooling notes

### SSH agent

Run `eval "$(ssh-agent -s)" && ssh-add` before any `git push` or `gh` commands. The push remote uses SSH host alias `github.com-personal`.

### Fixing lint errors

Prefer `pnpm lint:fix` over manual edits — it runs `eslint --fix --cache` and `prettier --write` automatically.
