<!-- repository: projects/wedding | kind: PROJECT_NEXTJS | stack: nextjs -->

# wedding — Skill: Next.js Project Development

> Workflow for wedding (projects/wedding). Execute this workflow before, during, and
> after changes in this repository.

## Repository Facts

- Kind: Next.js Project
- Package: `wedding (Next.js)` (version: ?)
- Runtime: Next.js 16 + React 19 + TypeScript
- Description: Omnixys Wedding frontend (Next.js 16, MUI, next-intl, Vitest).
- Architecture: src/app (App Router), src/components, src/config, src/data, src/hooks, src/i18n; messages/; docs/; reports/
- Database: n/a; Migrations: n/a
- API: none (no GraphQL dependency detected)
- Messaging: n/a
- Tests: vitest (pnpm test = vitest run)


## Workflow

### 1. Understand the change

- This is a client-side Next.js 16 + React 19 + TypeScript project (App Router).
- Respect the server/client boundary: components and hooks must mark `"use client"`
  when they rely on browser-only APIs.

### 2. Implement

- Preserve responsive behavior and accessibility (semantic HTML, focus states,
  keyboard navigation, adequate contrast).
- Follow the existing component and directory conventions in `src/app (App Router), src/components, src/config, src/data, src/hooks, src/i18n; messages/; docs/; reports/`.
- For Apollo/graphql-codegen projects: never hand-edit generated GraphQL output —
  regenerate with the repository's codegen command and commit only when the repository
  convention requires it.

### 3. Write tests

  - Unit/component tests: `pnpm test (vitest run)`.


### 4. Validate

## Validation

Run each applicable check and record the result as `PASS`, `FAIL`, `PRE-EXISTING
FAILURE`, or `NOT RUN` (with a reason). Never convert `NOT RUN` into `PASS`.

  - `pnpm install --frozen-lockfile`
  - `pnpm exec biome check .  (check-only; never run `biome check --write` against existing work)`
  - `pnpm exec biome check .  (check-only)`
  - `pnpm exec tsc --noEmit`
  - `pnpm test (vitest run)`
  - `pnpm build (next build)`
  - `pnpm lint && pnpm exec tsc --noEmit && pnpm build`

## Commit

- Use Conventional Commits (`<type>(<scope>): <summary>`), e.g. `feat`, `fix`, `refactor`, `test`, `docs`, `build`, `ci`, `perf`.
- Stage only files belonging to the logical change. Run `git diff --check` before committing.
- Commit locally; never push.

## Definition of Done

See the "Definition of Done" section in `AGENTS.md`. Before finishing, confirm
`AGENTS.md` and `SKILL.md` remain accurate for this repository.
