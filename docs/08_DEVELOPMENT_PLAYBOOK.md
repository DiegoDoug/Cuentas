> Project: **Cuentas**
>
> Version: 2.0
>
> Status: Development Operating Manual
>
> This document defines the operational playbook for executing development work in Cuentas. It translates architecture, quality, execution, and git standards into a concrete step-by-step working procedure for both humans and AI agents.

---

# 1. Purpose

This document defines **how work is actually performed** inside the project.

It ensures that every task follows a consistent, deterministic process regardless of:

- feature complexity
- developer experience
- AI involvement
- urgency

This is the **execution layer above all other documentation**.

---

# 2. Hierarchy of Authority

When conflicts appear:

1. System Contract
2. Architecture (02)
3. Data Layer (03)
4. Design System (04)
5. Quality (05)
6. Execution (06)
7. Git Workflow (07)
8. Development Playbook (this document)
9. Codebase

The codebase is never authoritative over documentation.

---

# 3. Core Philosophy

Development is a controlled process, not improvisation.

Every change must pass through:

- understanding
- design
- implementation
- validation
- integration

Skipping steps is not allowed.

---

# 4. Work Unit Definition

All work must be structured as a **Work Unit**.

A Work Unit is:

> A single, atomic, verifiable change that delivers one meaningful improvement.

Examples:

- Add recurring transactions feature
- Refactor transaction repository
- Fix budget calculation bug
- Introduce new selector for dashboard totals

Not valid:

- “Improve app”
- “Fix stuff”
- “Refactor everything”

---

# 5. Standard Workflow (Mandatory)

Every Work Unit follows this pipeline:

```
1. Understand
2. Analyze
3. Design
4. Plan
5. Implement
6. Validate
7. Refactor
8. Test
9. Document
10. Commit
11. Review
12. Merge
```

No step can be skipped.

---

# 6. Phase 1 — Understand

Before writing any code:

- Read relevant documentation
- Identify affected domains
- Understand existing behavior
- Identify dependencies
- Clarify expected outcome

Output of this phase:

> Clear mental model of the feature

---

# 7. Phase 2 — Analyze

Break down:

- existing code impact
- required changes
- reusable components
- reusable hooks
- reusable services
- data dependencies
- UI dependencies

Output:

> Impact map

---

# 8. Phase 3 — Design

Define:

- architecture approach
- domain boundaries
- data flow
- component structure
- state ownership
- repository usage

Output:

> Implementation blueprint

No coding yet.

---

# 9. Phase 4 — Plan

Convert design into steps:

Example:

1. Create types
2. Update domain model
3. Add repository method
4. Implement service
5. Create hook
6. Build UI component
7. Connect store
8. Add tests

Output:

> Ordered execution plan

---

# 10. Phase 5 — Implement

Implement step-by-step.

Rules:

- follow architecture strictly
- avoid shortcuts
- do not mix concerns
- ensure compile stability after each step when possible

---

# 11. Phase 6 — Validate

Verify:

- correctness
- data integrity
- UI behavior
- edge cases
- state consistency

No assumptions allowed.

---

# 12. Phase 7 — Refactor

Improve:

- naming
- structure
- duplication
- readability
- separation of concerns

Do not change behavior.

---

# 13. Phase 8 — Testing

Ensure:

- unit tests for logic
- integration tests for workflows
- component tests for UI
- edge case coverage

All critical logic must be tested.

---

# 14. Phase 9 — Documentation

Update:

- domain README (if needed)
- public APIs
- architecture notes (if impacted)
- inline comments (only for complex logic)

No undocumented business logic allowed.

---

# 15. Phase 10 — Commit

Follow Git Workflow (07_GIT_WORKFLOW.md).

Rules:

- one logical commit per milestone
- must pass lint + typecheck + tests
- no incomplete work

---

# 16. Phase 11 — Review

Self-review checklist:

## Architecture

- respects domain boundaries
- no circular dependencies
- no leakage between layers

## Code

- readable
- typed
- no duplication
- no dead code

## UI

- consistent with design system
- accessible
- responsive

## Data

- correct ownership
- no duplicated state
- correct persistence layer usage

---

# 17. Phase 12 — Merge

Before merging:

- rebase on latest main
- resolve conflicts
- ensure CI passes
- squash commits
- ensure PR is complete

---

# 18. Work Unit Completion Criteria

A Work Unit is complete only when:

- feature is fully implemented
- tests are passing
- no regressions introduced
- documentation updated
- architecture respected
- code reviewed
- PR merged

---

# 19. Parallel Work Rule

Only one Work Unit should be active per domain at a time unless explicitly separated.

Avoid:

- concurrent conflicting refactors
- overlapping feature implementations
- duplicated domain modifications

---

# 20. Change Size Control

Preferred Work Unit size:

- small → ideal
- medium → acceptable
- large → must be split

If a Work Unit cannot be completed in one cycle:

→ split immediately into smaller Work Units

---

# 21. Error Handling Policy

When errors are encountered:

1. Identify root cause
2. Classify (logic / architecture / data / UI)
3. Fix at correct layer
4. Add regression test
5. Document if systemic

Never patch blindly.

---

# 22. Refactor Triggers

Refactoring is mandatory when:

- duplication appears
- domain boundaries blur
- components exceed responsibility
- hooks grow too large
- services mix concerns
- readability decreases

Refactor immediately, not later.

---

# 23. AI Collaboration Rules

When using AI agents:

- always provide context from architecture documents
- never allow AI to override domain boundaries
- validate all generated code
- treat AI output as draft until verified
- enforce consistency manually if needed

AI accelerates work, it does not define architecture.

---

# 24. Debugging Protocol

When debugging:

1. Reproduce issue
2. Identify affected domain
3. Trace data flow
4. Inspect state source of truth
5. Validate assumptions
6. Fix root cause
7. Add test

No guess-based fixes.

---

# 25. Performance Awareness

Before optimizing:

- measure first
- identify bottleneck
- isolate cause
- apply minimal fix
- re-measure

Premature optimization is prohibited.

---

# 26. Definition of Success

A Work Unit is successful if:

- feature works as intended
- architecture remains intact
- no regression introduced
- tests are stable
- code is maintainable
- documentation is updated

---

# 27. Final Principle

Development in **Cuentas** is a disciplined engineering process.

Every change must be:

- intentional
- structured
- verifiable
- reversible
- documented

The goal is not just to build features, but to build a system that remains stable, understandable, and extensible over time—even under continuous evolution and AI-assisted development.