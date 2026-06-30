> Project: **Cuentas**
>
> Version: 2.0
>
> Status: Execution Framework
>
> This document defines how development is executed throughout the lifecycle of Cuentas Version 2. It establishes the mandatory workflow, self-evaluation process, quality gates, decision framework, and completion criteria that both human developers and AI coding assistants must follow.

---

# 1. Purpose

The purpose of this document is to ensure that development remains:

- predictable
- incremental
- verifiable
- maintainable
- architecture-driven
- quality-focused

Every implementation should follow the same execution methodology regardless of feature complexity.

---

# 2. Execution Philosophy

Development is not measured by:

- lines of code
- files created
- tasks completed

Development is measured by:

- working functionality
- architectural consistency
- maintainability
- correctness
- long-term value

Shipping incomplete architecture is considered unfinished work.

---

# 3. Standard Development Lifecycle

Every feature follows the same lifecycle.

```
Understand

↓

Analyze

↓

Design

↓

Plan

↓

Implement

↓

Validate

↓

Refactor

↓

Test

↓

Document

↓

Review

↓

Complete
```

Skipping phases is not allowed.

---

# 4. Pre-Implementation Checklist

Before writing code:

- Understand the feature.
- Identify the affected domains.
- Review existing architecture.
- Review dependencies.
- Identify reusable components.
- Identify reusable services.
- Identify reusable hooks.
- Define success criteria.
- Identify risks.
- Estimate implementation impact.

No implementation should begin with unresolved architectural questions.

---

# 5. Incremental Development

Large features should be divided into small, independently verifiable milestones.

Each milestone should:

- compile successfully
- preserve existing functionality
- be testable
- leave the project in a stable state

Avoid long-lived partially functional branches.

---

# 6. Mandatory Self-Evaluation Loop

After each meaningful implementation, perform the following evaluation.

## Step 1 — Correctness

Does the implementation solve the intended problem?

---

## Step 2 — Architecture

Does it respect the architectural documents?

---

## Step 3 — Simplicity

Can it be simplified?

---

## Step 4 — Reusability

Can any part become reusable?

---

## Step 5 — Maintainability

Will another developer understand it easily?

---

## Step 6 — Performance

Does it introduce unnecessary work?

---

## Step 7 — Accessibility

Has accessibility been preserved?

---

## Step 8 — Documentation

Is documentation required?

---

## Step 9 — Testing

Are automated tests sufficient?

---

## Step 10 — Technical Debt

Did the implementation introduce any debt?

If yes:

Document it before continuing.

---

# 7. Continuous Review Loop

Development should continuously repeat:

```
Implement

↓

Review

↓

Simplify

↓

Validate

↓

Continue
```

Do not postpone quality improvements until the end of a feature.

---

# 8. Decision Framework

When multiple solutions exist, evaluate them using the following priorities.

1. Correctness
2. Architectural consistency
3. Maintainability
4. Simplicity
5. Testability
6. Reusability
7. Performance
8. Developer Experience

Short-term implementation speed is never the deciding factor.

---

# 9. Stop Conditions

Development must stop immediately if:

- architecture becomes unclear
- requirements conflict
- circular dependencies appear
- business rules become ambiguous
- duplicated ownership emerges
- data integrity is at risk
- accessibility cannot be guaranteed
- implementation violates the System Contract

Clarify the issue before proceeding.

---

# 10. Continue Conditions

Development may continue only when:

- architecture remains valid
- dependencies are understood
- responsibilities are clear
- tests remain meaningful
- quality gates continue to pass

---

# 11. Refactoring Policy

Refactoring is expected throughout development.

Permitted refactoring includes:

- extracting components
- extracting hooks
- extracting services
- simplifying logic
- improving naming
- reducing duplication
- improving readability
- improving performance

Behavior must remain unchanged unless explicitly required.

---

# 12. Definition of Done — Component

A component is complete when:

- single responsibility
- reusable
- typed
- documented
- accessible
- responsive
- tested
- follows Design System
- follows architecture

---

# 13. Definition of Done — Feature

A feature is complete when:

- all acceptance criteria satisfied
- architecture respected
- business rules implemented
- tests passing
- documentation updated
- accessibility verified
- performance acceptable
- no known regressions

---

# 14. Definition of Done — Domain

A domain is complete when:

- public API defined
- business logic isolated
- repositories implemented
- validation complete
- selectors implemented
- tests passing
- documentation complete

---

# 15. Definition of Done — Phase

A project phase is complete when:

- all planned objectives delivered
- no blocking issues remain
- quality gates passed
- documentation synchronized
- architecture remains consistent

---

# 16. Global Definition of Done

Cuentas Version 2 is considered complete when:

- every planned feature implemented
- modular architecture achieved
- offline-first workflow functional
- business logic independent from UI
- state ownership clearly defined
- local persistence stable
- Design System fully adopted
- accessibility targets achieved
- documentation complete
- automated tests reliable
- production build stable

Completion requires both functionality and architectural integrity.

---

# 17. AI Execution Rules

AI coding assistants must:

- read relevant documentation before implementation
- follow architecture exactly
- avoid architectural assumptions
- reuse existing modules
- avoid duplicated logic
- avoid creating parallel solutions
- validate outputs before completion

Generated code is considered a proposal until reviewed.

---

# 18. AI Context Priority

When documentation conflicts, the following precedence applies:

1. 00_SYSTEM_CONTRACT.md
2. 02_ARCHITECTURE.md
3. 03_DATA_LAYER.md
4. 04_DESIGN_SYSTEM.md
5. Domain documentation
6. Existing implementation

Existing code never overrides architectural documentation.

---

# 19. Mandatory Deliverables

Every completed implementation should include, when applicable:

- source code
- tests
- documentation
- migration updates
- architecture updates
- changelog entries
- design updates

Implementation is not complete until supporting artifacts are updated.

---

# 20. Release Checklist

Before any release:

## Architecture

- [ ] System Contract respected
- [ ] Architecture documents synchronized
- [ ] No unresolved architectural violations

---

## Code Quality

- [ ] Build succeeds
- [ ] TypeScript passes
- [ ] ESLint passes
- [ ] Formatting passes

---

## Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Critical workflows verified
- [ ] Regression tests updated

---

## UI

- [ ] Responsive
- [ ] Accessible
- [ ] Consistent with Design System
- [ ] Loading and error states implemented

---

## Data

- [ ] Database migrations verified
- [ ] State ownership respected
- [ ] Persistence validated

---

## Documentation

- [ ] README updated
- [ ] ADRs updated where required
- [ ] Public APIs documented

---

# 21. Continuous Improvement Cycle

After every completed feature:

```
Measure

↓

Evaluate

↓

Learn

↓

Improve

↓

Standardize
```

Lessons learned should strengthen future development rather than remain isolated.

---

# 22. Project Success Criteria

The project is successful if:

- new features can be added without architectural rewrites
- domains remain independent
- business logic remains framework-independent
- onboarding new developers is straightforward
- AI assistants can contribute safely using documentation alone
- technical debt remains controlled
- long-term maintenance cost stays low

---

# 23. Final Principle

Every implementation in **Cuentas** should answer a single question before it is considered complete:

> **"If another developer—or an AI assistant—returns to this code two years from now, will they immediately understand why it exists, how it works, and how to extend it without breaking the architecture?"**

If the answer is **no**, the work is not yet finished.