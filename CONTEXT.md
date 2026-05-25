# Context

## Glossary

### Dependency modernization

Updating this template's package dependencies, tooling, lockfile, and related configuration so the project uses the latest stable releases wherever practical while preserving a working application.

This includes breaking major-version upgrades when they are handled as explicit, verified migration slices.

Existing prerelease or nightly dependencies are not expanded by default; they remain exceptions until a stable migration path is chosen.

## Tooling notes

### SSH agent

Run `eval "$(ssh-agent -s)" && ssh-add` before any `git push` or `gh` commands. The push remote uses SSH host alias `github.com-personal`.

### Fixing lint errors

Prefer `pnpm lint:fix` over manual edits — it runs `eslint --fix --cache` and `prettier --write` automatically.
