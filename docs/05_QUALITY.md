> Project: **Cuentas**
>
> Version: 2.0
>
> Status: Quality Assurance & Engineering Standards
>
> This document defines the engineering quality standards for Cuentas Version 2. It establishes the testing strategy, documentation requirements, QA process, AI collaboration workflow, and quality gates that every contribution must satisfy before being merged.

---

# 1. Purpose

Quality is a first-class feature of Cuentas.

This document ensures that every feature is:

- correct
- maintainable
- documented
- testable
- performant
- accessible
- production-ready

Code that works but does not meet these standards is considered incomplete.

---

# 2. Quality Principles

Every contribution should improve one or more of the following:

- readability
- maintainability
- reliability
- performance
- consistency
- accessibility
- documentation
- test coverage

The quality bar should continuously increase.

---

# 3. Testing Philosophy

Testing exists to verify behavior, not implementation.

Tests should remain stable during refactoring.

Avoid tests tightly coupled to internal implementation details.

Prefer:

> "What should happen?"

Instead of:

> "How was it implemented?"

---

# 4. Testing Pyramid

The recommended distribution is:

```
                E2E
             Integration
           Component Tests
            Unit Tests
```

Approximate target:

- Unit Tests → 70%
- Integration Tests → 20%
- End-to-End Tests → 10%

---

# 5. Unit Testing

Unit tests should cover:

- business rules
- services
- selectors
- validation
- utility functions
- repositories (mocked where appropriate)

Every unit test should be:

- deterministic
- isolated
- fast
- repeatable

---

# 6. Component Testing

Components should verify:

- rendering
- user interactions
- accessibility
- loading states
- error states
- empty states

Avoid testing implementation details.

---

# 7. Integration Testing

Integration tests should verify complete workflows.

Examples:

- Create Transaction
- Edit Budget
- Delete Account
- Update Settings
- Import Data

Multiple modules should be tested together.

---

# 8. End-to-End Testing

Critical user journeys should always be covered.

Minimum scenarios:

- First application launch
- Create account
- Add income
- Add expense
- Create budget
- View dashboard
- Edit transaction
- Delete transaction
- Export data
- Settings persistence

---

# 9. Edge Cases

Every feature should test:

- empty inputs
- invalid values
- duplicate entries
- extremely large values
- missing data
- offline behavior
- corrupted database
- migration failures

Edge cases are mandatory.

---

# 10. Accessibility Testing

Every feature must verify:

- keyboard navigation
- screen reader compatibility
- focus management
- semantic HTML
- ARIA usage
- color contrast
- reduced motion support

Accessibility regressions block releases.

---

# 11. Performance Testing

Measure:

- render count
- bundle size
- loading time
- interaction latency
- database performance
- memory usage

Optimize only after measurement.

---

# 12. Documentation Standards

Documentation is part of the implementation.

Every public API should explain:

- purpose
- parameters
- return value
- possible errors
- usage examples

---

## Domain Documentation

Each domain should contain:

```
README.md
```

Including:

- responsibilities
- architecture
- dependencies
- public API
- future roadmap

---

## Architecture Decisions

Significant decisions should be recorded as ADRs (Architecture Decision Records).

Each ADR should include:

- Context
- Problem
- Decision
- Alternatives Considered
- Consequences

---

# 13. Mandatory AI Subagents

Claude Code should divide complex work into specialized reasoning contexts whenever appropriate.

Recommended specialization includes:

## Architecture

Responsible for:

- architecture validation
- dependency analysis
- folder organization

---

## Frontend

Responsible for:

- React
- UI
- component composition
- accessibility

---

## State Management

Responsible for:

- Zustand
- React Query
- selectors
- derived state

---

## Database

Responsible for:

- Dexie
- repositories
- migrations
- persistence

---

## Performance

Responsible for:

- rendering
- memoization
- bundle optimization

---

## Testing

Responsible for:

- unit tests
- integration tests
- coverage validation

---

## Documentation

Responsible for:

- README updates
- ADRs
- inline documentation

---

# 14. Code Review Checklist

Every pull request should answer:

- Does the code solve the intended problem?
- Is the architecture respected?
- Is duplication avoided?
- Is naming consistent?
- Is business logic separated from UI?
- Are tests included?
- Is documentation updated?
- Is accessibility preserved?
- Is performance maintained?
- Is the code understandable?

---

# 15. QA Checklist

Before merging:

## Architecture

- [ ] Folder structure respected
- [ ] No circular dependencies
- [ ] Correct domain ownership

---

## Code

- [ ] No duplicated logic
- [ ] No dead code
- [ ] No TODOs without tracking
- [ ] TypeScript strict mode passes
- [ ] Lint passes
- [ ] Formatting passes

---

## UI

- [ ] Responsive
- [ ] Accessible
- [ ] Consistent with Design System
- [ ] Loading states implemented
- [ ] Error states implemented

---

## Data

- [ ] Validation completed
- [ ] Repository pattern respected
- [ ] Database migration considered
- [ ] State ownership respected

---

## Tests

- [ ] Unit tests
- [ ] Integration tests
- [ ] Critical flows tested
- [ ] Edge cases covered

---

## Documentation

- [ ] README updated
- [ ] ADR created if required
- [ ] Public API documented

---

# 16. Continuous Quality Gates

Every completed feature should pass:

```
Compile

↓

Lint

↓

Type Check

↓

Unit Tests

↓

Integration Tests

↓

Accessibility Checks

↓

Performance Review

↓

Documentation Review

↓

Ready for Review
```

Failure at any stage blocks completion.

---

# 17. Technical Debt Policy

Technical debt must never be silently introduced.

If unavoidable:

- document it
- explain why
- estimate impact
- create a follow-up task

Untracked technical debt is forbidden.

---

# 18. Refactoring Standards

Refactoring should:

- preserve behavior
- improve readability
- reduce complexity
- simplify maintenance
- improve testability

Refactoring should not introduce new features.

---

# 19. Regression Prevention

Every bug fix should include:

- reproduction scenario
- automated test
- verification after fix

A bug without a regression test is considered incompletely resolved.

---

# 20. Release Readiness

A feature is release-ready only when:

- functionality is complete
- tests pass
- accessibility verified
- documentation updated
- performance acceptable
- architecture respected

---

# 21. Quality Metrics

Target metrics:

| Metric | Target |
|----------|---------|
| TypeScript Errors | 0 |
| ESLint Errors | 0 |
| Build Errors | 0 |
| Circular Dependencies | 0 |
| Accessibility Violations | 0 |
| Critical Bugs | 0 |
| Public APIs Documented | 100% |
| Business Logic Tested | 100% |
| Domain READMEs | 100% |

These targets represent the desired engineering standard rather than absolute coverage percentages.

---

# 22. Continuous Improvement

Each completed feature should leave the project in a better state than before.

Possible improvements include:

- extracting reusable components
- simplifying logic
- improving naming
- increasing test coverage
- improving documentation
- reducing complexity
- improving accessibility
- improving performance

Small improvements accumulated over time produce long-term maintainability.

---

# 23. Final Principle

Quality is not a phase performed after development—it is the standard applied throughout development.

Every contribution to **Cuentas** should be understandable, testable, maintainable, documented, and production-ready from the moment it is merged.