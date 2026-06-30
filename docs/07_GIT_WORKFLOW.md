> Project: **Cuentas**
>
> Version: 2.0
>
> Status: Git Workflow Standard
>
> This document defines the mandatory Git workflow for Cuentas. Every contributor, whether human or AI-assisted, must follow these conventions to maintain a clean, understandable, and scalable project history.

---

# 1. Purpose

The Git history is part of the project's documentation.

A good Git history should allow anyone to understand:

- what changed
- why it changed
- when it changed
- how it evolved

Git is not only a backup system.

Git is the historical record of the architecture.

---

# 2. Branching Strategy

The project follows a simplified GitHub Flow.

```
main
    │
    ├── feature/*
    ├── fix/*
    ├── refactor/*
    ├── docs/*
    ├── chore/*
    ├── test/*
    └── hotfix/*
```

Only **main** represents production-ready code.

---

# 3. Main Branch

Rules:

- Always deployable.
- Protected.
- No direct commits.
- No force pushes.
- Changes only through Pull Requests.

---

# 4. Branch Naming Convention

Branch names should be short, descriptive, and lowercase.

Format:

```
<type>/<description>
```

---

## Feature

```
feature/transaction-domain

feature/dashboard-redesign

feature/monthly-budget

feature/offline-sync

feature/analytics-v2
```

---

## Bug Fix

```
fix/account-balance

fix/date-picker

fix/dashboard-crash
```

---

## Refactoring

```
refactor/data-layer

refactor/button-component

refactor/domain-services
```

---

## Documentation

```
docs/system-contract

docs/design-system

docs/testing-guide
```

---

## Tests

```
test/transaction-service

test/dashboard

test/repositories
```

---

## Chores

```
chore/update-eslint

chore/dependencies

chore/project-config
```

---

## Hotfix

Reserved for production issues.

```
hotfix/build-error

hotfix/security-patch
```

---

# 5. Branch Lifetime

Branches should be short-lived.

Recommended duration:

- 1–3 days
- Single feature
- Single objective

Avoid long-running branches.

---

# 6. One Branch = One Objective

Each branch should solve exactly one problem.

Good:

```
feature/transaction-search
```

Bad:

```
feature/dashboard-and-settings-and-reports
```

---

# 7. Commit Philosophy

Commits should represent logical milestones.

A commit should compile successfully whenever possible.

Avoid "checkpoint" commits.

---

# 8. Commit Message Convention

Cuentas adopts the **Conventional Commits** specification.

Format:

```
type(scope): description
```

---

## Feature

```
feat(transactions): add recurring transaction support
```

---

## Fix

```
fix(accounts): prevent negative balance calculation
```

---

## Refactor

```
refactor(database): extract transaction repository
```

---

## Documentation

```
docs(architecture): update domain boundaries
```

---

## Tests

```
test(budgets): add selector coverage
```

---

## Chore

```
chore(deps): update React dependencies
```

---

## Style

```
style(ui): normalize spacing tokens
```

---

## Performance

```
perf(dashboard): optimize summary calculations
```

---

## Build

```
build(ci): update GitHub workflow
```

---

# 9. Commit Rules

A commit should:

- compile
- pass TypeScript
- avoid breaking tests
- represent one logical change

Never combine unrelated work.

---

# 10. Commit Frequency

Commit whenever:

- one logical unit is complete
- one refactor is finished
- one bug is fixed
- one feature milestone is completed

Avoid committing after every file edit.

Avoid giant commits touching unrelated areas.

---

# 11. Before Every Commit

Verify:

- [ ] Project builds.
- [ ] TypeScript passes.
- [ ] ESLint passes.
- [ ] Formatting applied.
- [ ] No debug code.
- [ ] No commented-out code.
- [ ] No console logs (unless intentional).
- [ ] No temporary files.

---

# 12. Push Strategy

Push regularly.

Recommended:

- at the end of every working session
- after completing a milestone
- before switching tasks

Do not keep significant work only on a local machine.

---

# 13. Synchronizing With Main

Before opening a Pull Request:

```
git fetch origin

git rebase origin/main
```

Prefer a linear history.

Resolve conflicts locally before requesting review.

---

# 14. Pull Request Policy

Every Pull Request should have one objective.

The title should follow Conventional Commits.

Example:

```
feat(transactions): implement recurring transactions
```

---

# 15. Pull Request Description

Every PR should include:

## Summary

What changed?

---

## Motivation

Why was it necessary?

---

## Implementation

How was it implemented?

---

## Testing

How was it validated?

---

## Risks

Potential regressions.

---

## Screenshots

If UI changed.

---

## Checklist

- [ ] Builds successfully
- [ ] Tests pass
- [ ] Documentation updated
- [ ] Accessibility reviewed
- [ ] Architecture respected

---

# 16. PR Size

Recommended:

< 500 changed lines

Ideal:

< 300 changed lines

Large PRs should be divided into smaller logical units.

---

# 17. Review Guidelines

A reviewer should verify:

- architecture
- readability
- naming
- maintainability
- testing
- accessibility
- performance
- documentation

Reviews should improve the codebase, not simply approve changes.

---

# 18. Merge Strategy

**Mandatory strategy:**

✅ **Squash and Merge**

Reasons:

- cleaner history
- one commit per completed feature
- easier rollback
- simpler release history

Do not use:

- Merge Commit
- Rebase Merge

unless explicitly required.

---

# 19. Squash Commit Format

Example:

```
feat(transactions): implement recurring transaction workflow
```

The squash commit should summarize the completed work, not the intermediate development steps.

---

# 20. After Merge

After merging:

- delete the branch
- update local main
- remove stale branches
- begin the next feature from the latest main

Commands:

```bash
git checkout main
git pull origin main
git branch -d feature/example
```

---

# 21. Release Tags

Stable milestones should be tagged.

Format:

```
v0.1.0

v0.2.0

v1.0.0
```

Semantic Versioning applies:

```
MAJOR.MINOR.PATCH
```

---

# 22. Protected History

Never:

- force push to main
- rewrite published history
- delete release tags
- modify historical release commits

History should remain trustworthy.

---

# 23. AI Contribution Rules

When AI assistants generate code:

- changes should be committed by logical milestone
- generated code must be reviewed before commit
- commit messages must still follow project conventions
- AI-generated code is never exempt from testing or review

---

# 24. Git Workflow

```
Create Branch

↓

Implement

↓

Self Review

↓

Run Tests

↓

Commit

↓

Push

↓

Open Pull Request

↓

Code Review

↓

Address Feedback

↓

Squash & Merge

↓

Delete Branch

↓

Update Main
```

---

# 25. Final Principle

The Git history of **Cuentas** should read like the evolution of the product—not like a record of trial and error.

Each branch should represent one objective, each commit one logical step, and each merged Pull Request one completed piece of value. A developer joining the project years later should be able to understand the evolution of the application simply by reading its Git history.