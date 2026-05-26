<div align="center">

# TanStack Template

<p align="center">
    A clean, opinionated TanStack Start template with React 19, Vite, and shadcn/ui.
</p>

[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TanStack Start](https://img.shields.io/badge/TanStack_Start-FF4154?logo=reactrouter&logoColor=white)](https://tanstack.com/start)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-FF7F50?logo=reactrouter&logoColor=white)](https://tanstack.com/router)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![TanStack Form](https://img.shields.io/badge/TanStack_Form-0EA5E9?logo=reacthookform&logoColor=white)](https://tanstack.com/form)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-4.0-06B4D6?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Orval](https://img.shields.io/badge/Orval-FF9E0F?logo=openapiinitiative&logoColor=white)](https://orval.dev/)
[![Zod](https://img.shields.io/badge/Zod-3068B7?logo=zod&logoColor=white)](https://zod.dev/)

</div>

## Overview

A neutral, opinionated starting point for building applications with the TanStack ecosystem. Pre-configured with common tooling so you can start building features on day one — without shipping product-specific or demo artifacts.

### Key Features

- **TanStack Start**: Full-stack SSR application powered by TanStack Router.
- **Type-Safe Routing**: File-based routing with full type safety via TanStack Router.
- **Data Fetching**: Server state management with TanStack Query.
- **Form Validation**: TanStack Form + Zod for type-safe, validated forms.
- **Internationalization (i18n)**: Paraglide JS for compile-time message translation with `en`/`de` locale scaffold and localized URL patterns.
- **Auth Scaffold**: Sign-in / sign-up pages using TanStack Form + Zod with shadcn/ui blocks — ready to wire to any backend.
- **API Scaffold**: Orval configured to generate typed API clients from your OpenAPI spec.
- **Modern Styling**: Tailwind CSS v4 and shadcn/ui for accessible, composable components.
- **Feature-Based Architecture**: Domain-oriented folder structure that scales.
- **Deploy Scaffold**: GitHub Actions build artifact workflow with optional SSH deployment.
- **Release Ready**: Semantic Release workflow included for automated versioning.

## Architecture

### Folder Structure

```
src/
├── components/         # Shared UI components (shadcn/ui primitives)
│   └── ui/             # shadcn/ui components
├── features/           # Feature modules (auth, home…)
│   ├── auth/
│   │   ├── components/ # Feature-specific components
│   │   ├── schemas/    # Zod validation schemas
│   │   └── types/      # TypeScript types
│   └── home/
│       └── components/ # Home page components
├── hooks/              # Shared React hooks
├── integrations/       # Third-party integration configs (Orval, etc.)
├── lib/                # Utility functions and shared helpers
├── routes/             # File-based route definitions
├── services/           # API service layer
├── styles.css          # Global styles / Tailwind imports
└── types/              # Shared TypeScript types
```

### Styling Strategy

- **Tailwind CSS v4**: Primary styling engine.
- **shadcn/ui**: Re-usable, accessible components built with Radix UI and Tailwind.
- **Icons**: Lucide React for inline icons; custom SVGs can be placed in `public/`.

### State Management

- **Server State**: TanStack Query. Avoid putting API data in global stores.
- **Client State**: Local React state (`useState`) for UI state. Use **Zustand** for complex global client state.

### API Integration (Orval Scaffold)

Orval is available but **no product-specific API client is generated**. The template ships with a neutral Orval configuration (`orval.config.mjs`) ready for your OpenAPI spec.

To wire Orval to your API:

- [ ] Place your OpenAPI spec at the path referenced in `orval.config.mjs`.
- [ ] Run `pnpm run generate` to produce typed hooks and types.
- [ ] Update the shared API client configuration in `src/services/api-client.ts`.
- [ ] Commit the generated output.

### Authentication Scaffold

Sign-in and sign-up pages use **TanStack Form** with **Zod** validation schemas and shadcn/ui form components. This is a neutral scaffold — no authentication provider is pre-configured. Wire this to your own auth backend or swap in Clerk, Supabase Auth, Auth0, etc.

### Internationalization Scaffold

The template uses **Paraglide JS** (`@inlang/paraglide-js`) for internationalization — a lightweight, compile-time i18n runtime that generates tree-shakeable message functions. Paraglide is the only i18n library in the template; no react-i18next, react-intl, or other runtime alternatives are included.

#### Default Locales

Two locales are pre-configured with `en` as the source language:

| Locale | Code | Message File |
|--------|------|--------------|
| English | `en` | `messages/en.json` |
| German | `de` | `messages/de.json` |

To add a new locale:

- [ ] Add the language tag to `languageTags` in `project.inlang/settings.json`.
- [ ] Create `messages/{languageTag}.json` with a `$locale` display name and the required message keys.
- [ ] Translate each key from `messages/en.json`.
- [ ] Verify with `pnpm run build` (Paraglide validates messages at build time).

Durable message files live at the repository root under `messages/`. The `project.inlang/settings.json` defines the path pattern as `./messages/{languageTag}.json`.

#### Using Messages in UI Code

Paraglide generates typed message functions at build time. Import them from the generated output:

```tsx
import * as m from '@/paraglide/messages';

function Welcome() {
  return <h1>{m.welcome()}</h1>;
}
```

Message keys in `messages/*.json` become functions on the `m` import. The active locale is determined by the Paraglide runtime — no manual locale passing is needed.

> **Note:** `@/paraglide` points to `src/paraglide/`, a generated directory produced by the Vite plugin at `vite.config.ts:134`. This directory is listed in `.gitignore` and excluded from ESLint — only the durable message files in `messages/` and the Inlang project config in `project.inlang/` are committed to version control.

#### Localized URLs

Routes follow a locale-prefixed pattern: the locale is embedded in the URL path so that links remain shareable and the selected locale survives page reloads.

| Internal Route | English URL | German URL |
|----------------|-------------|------------|
| `/` | `/en` | `/de` |
| `/sign-in` | `/en/sign-in` | `/de/sign-in` |
| `/sign-up` | `/en/sign-up` | `/de/sign-up` |

The Paraglide runtime rewrites URLs on input (delocalizing `/en/sign-in` → `/sign-in` for the router) and on output (localizing internal paths to the active locale). The root document's `lang` attribute is set from the active locale for accessibility and translation tooling.

#### Verification

- `pnpm run build` — validates Paraglide messages and produces the generated runtime.
- `pnpm test` — exercises routing tests for locale extraction, URL localization, and message key coverage.
- `pnpm run dev` and navigate to `/en`, `/de`, `/en/sign-in`, `/de/sign-in` to verify localized rendering.

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- pnpm (v9 or higher)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd <your-project-name>
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set environment variables (if needed):**

    Create a `.env` file for local application variables such as `VITE_API_BASE_URL`.

### Running Locally

```bash
pnpm run dev
```

The app will be available at `http://localhost:3210`.

## Available Scripts

| Script                     | Description                            |
| -------------------------- | -------------------------------------- |
| `pnpm run dev`             | Start the development server           |
| `pnpm run build`           | Build for production + type check      |
| `pnpm run serve`           | Preview the production build           |
| `pnpm test`                | Run tests with Vitest                  |
| `pnpm run lint`            | Lint code with ESLint                  |
| `pnpm run lint:fix`        | Fix lint and format issues             |
| `pnpm run format`          | Format code with Prettier              |
| `pnpm run type:check`      | Type-check the project with TypeScript |
| `pnpm run check`           | Format and lint all files              |
| `pnpm run generate`        | Generate API client from OpenAPI spec  |
| `pnpm run lucide:generate` | Optimize and install used Lucide icons |
| `pnpm run commit`          | Commit changes using Commitizen        |

## Workflows

This template includes GitHub Actions for release automation and a configurable deployment scaffold.

- **Deploy**: Builds the TanStack Start `.output` directory, uploads it as a workflow artifact, and optionally deploys it to an SSH host.
- **Release**: Automates versioning and changelog generation using Semantic Release on pushes to `main`.

### Deployment Scaffold

The deploy workflow always verifies the app and uploads `.output` as an artifact. To enable the optional SSH deployment job:

- [ ] Set repository variable `DEPLOY_TARGET=ssh`.
- [ ] Set repository variable `DEPLOY_PATH` to the target directory on your server.
- [ ] Optionally set repository variable `DEPLOY_RESTART_COMMAND` to restart your app process after sync.
- [ ] Optionally set repository variable `VITE_API_BASE_URL` for production builds.
- [ ] Set repository secret `DEPLOY_SSH_HOST`.
- [ ] Set repository secret `DEPLOY_SSH_USER`.
- [ ] Set repository secret `DEPLOY_SSH_KEY` to a private key with write access to `DEPLOY_PATH`.
- [ ] Optionally set repository secret `DEPLOY_SSH_PORT`; it defaults to `22`.

The scaffold deploys the complete TanStack Start `.output` directory. Configure your server process manager to run the built server entry from that directory according to your hosting setup.

## Contributing

1.  Create a feature branch (`git checkout -b feature/amazing-feature`).
2.  Commit your changes (`pnpm run commit`).
3.  Push to the branch (`git push origin feature/amazing-feature`).
4.  Open a Pull Request.
