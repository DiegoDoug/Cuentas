# CLAUDE.md
This file defines strict operational rules for Claude Code when working in this repository.

Current State

This repository is specification-first.

It currently contains only:

docs/ → authoritative architectural contracts
README.md → placeholder

There is no application code yet.

The referenced “Version 1” is a separate React prototype used only as behavioral reference, never architectural guidance.

When introduced, it must be reverse engineered via:
docs/01_REVERSE_ENGINEERING.md

Authority Hierarchy (absolute precedence)

When conflicts arise, this order is binding:

docs/00_SYSTEM_CONTRACT
docs/02_ARCHITECTURE.md ⚠️ (corrected filename)
docs/03_DATA_LAYER.md
docs/04_DESIGN_SYSTEM.md
docs/05_QUALITY.md
docs/06_EXECUTION.md
docs/07_GIT_WORKFLOW.md
docs/08_DEVELOPMENT_PLAYBOOK.md
The codebase

Rule: Code is always wrong if it conflicts with docs.

Mandated Architecture

Strict layered architecture:

Presentation → Application → Domain → Infrastructure → Persistence
Dependency rules (non-negotiable)
Dependencies flow ONLY downward
No circular dependencies allowed
Domains are isolated units of business logic
Layer responsibilities
Presentation (app/, components/)
UI only
No business logic
No direct state mutations of domain state
Application layer
Orchestration of use cases
Command/query coordination
No domain rule definitions
Domain (domains/<domain>/)

Core business logic layer.

Each domain contains:

entities
validation
business rules
selectors
services (domain services only)
types
stores (if needed)

Rules:

Domains MUST NOT depend on each other directly
Shared logic must be explicitly extracted
Infrastructure (infrastructure/)
Repositories implementations
Dexie adapters
Sync mechanisms
Storage abstraction

Rules:

NO business logic
NO domain rules
Persistence (Dexie / IndexedDB)
Single source of truth
All writes must go through repositories
All schema changes require migrations
Required folder structure
src/
  app/
  components/{ui,layout,feedback,charts}/
  domains/<domain>/{components,hooks,services,repositories,models,types,validation,selectors,store}/
  shared/
  infrastructure/{database,repositories,sync,storage}/
  styles/{tokens,themes,typography}/
  lib/
  tests/
  workers/
Stack rules
React (functional components only)
TypeScript strict mode (NO any)
Zustand (UI state only)
Dexie (primary persistence layer)
React Query (ONLY future server-state sync)
State boundaries
Zustand → UI state only
Dexie → source of truth
React Query → reserved for remote sync only
Data flow (mandatory pipeline)
UI Event
 → Validation
 → Service
 → Repository
 → Dexie
 → Store update
 → Selectors
 → UI render

UI must NEVER:

access Dexie directly
contain business logic
compute derived state
Cross-module rules
shared/ cannot import from domains/
domains/ cannot import other domains directly
infrastructure/ cannot contain business logic
components/ cannot implement domain rules
all derived state MUST be computed in selectors
Non-negotiable constraints
No God Components
No God Stores
No duplicated business logic
No “temporary” production code
No TODOs without tracking reference
No shortcuts that degrade architecture
Git workflow

Branch format:

feature|fix|refactor|docs|test|chore|hotfix/<name>

Active branch for scaffold:

claude/init-zyvvmd

Rules:

One objective per branch
Squash & merge only
PRs < 500 LOC
Rebase before PR
Tooling assumptions
Vite (build system)
ESLint (strict rules)
TypeScript strict
Vitest (unit testing)

Testing pyramid:

70% unit
20% integration
10% E2E
Quality gates (future enforcement)

Every change must pass:

TypeScript strict
ESLint
Build
Tests
Accessibility checks
Guiding principle

Will this make the system easier to evolve in 5 years?

If not, it is not allowed.
