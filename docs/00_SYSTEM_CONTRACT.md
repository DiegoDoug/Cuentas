> Project: **Cuentas**
>
> Version: 2.0
>
> Status: System Contract
>
> This document is the highest authority of the project. Every implementation, refactor, architectural decision, UI component, feature, test, and future contribution must comply with this contract.

---

# 1. Purpose

Cuentas is a modern personal finance application focused on helping users manage their financial life through an intuitive, fast, offline-first, and highly maintainable platform.

The objective of Version 2 is **not** to reproduce the existing React TSX application.

The objective is to transform the existing prototype into a scalable production-grade application built using modern frontend architecture.

Every decision made throughout the project must maximize:

- scalability
- maintainability
- readability
- extensibility
- performance
- developer experience
- long-term evolution

Short-term implementation speed must never take precedence over long-term quality.

---

# 2. Architectural Vision

Cuentas shall evolve from a single-file prototype into a modular application composed of independent domains.

The architecture must prioritize:

- separation of concerns
- feature isolation
- reusable UI
- deterministic state management
- predictable data flow
- strong typing
- testability
- offline capabilities
- incremental feature development

No module may become responsible for multiple unrelated concerns.

---

# 3. Core Philosophy

The project follows the principle:

> **Simple for the user.
>
> Sophisticated internally.
>
> Invisible complexity.**

The application should feel effortless while maintaining a highly structured internal architecture.

---

# 4. Product Principles

Every feature must satisfy the following principles.

## 4.1 Offline First

The application must continue working without internet whenever possible.

Internet connectivity should enhance the experience—not enable it.

---

## 4.2 Local First

User data belongs to the user.

The local database is considered the primary source of truth unless synchronization is explicitly enabled.

---

## 4.3 Fast by Default

Every interaction should feel immediate.

The user should never wait because of unnecessary rendering, expensive computations, or poor state management.

---

## 4.4 Progressive Complexity

The interface should expose complexity only when needed.

Beginner users should never feel overwhelmed.

Advanced users should have access to richer functionality.

---

## 4.5 Predictable Behavior

The same action must always produce the same result.

Hidden side effects are forbidden.

---

## 4.6 Recoverability

Users should be able to undo mistakes whenever technically possible.

Deleting data should require deliberate confirmation.

---

## 4.7 Consistency

Navigation, typography, spacing, icons, colors, terminology, and interaction patterns must remain consistent across the entire application.

---

# 5. Non-Negotiable Rules

The following rules cannot be overridden.

## Rule 1

Never sacrifice architecture for speed.

---

## Rule 2

Never introduce technical debt knowingly.

---

## Rule 3

Never duplicate business logic.

---

## Rule 4

Never duplicate UI logic.

---

## Rule 5

Never place business logic inside UI components.

---

## Rule 6

Never create God Components.

---

## Rule 7

Never create God Stores.

---

## Rule 8

Never use "temporary" code in production.

---

## Rule 9

Never leave TODOs without an associated issue or roadmap item.

---

## Rule 10

Every new feature must improve—not degrade—the overall architecture.

---

# 6. Source of Truth Hierarchy

When conflicts exist, this hierarchy applies.

1. System Contract
2. Architecture Documents
3. Domain Contracts
4. Component Contracts
5. Existing Code

Existing code is never considered authoritative if it violates this document.

---

# 7. Refactoring Policy

Refactoring is considered part of feature development.

Every feature implementation should leave the surrounding codebase in a better state than before.

Boy Scout Rule:

> Leave the code cleaner than you found it.

Refactoring must be:

- incremental
- safe
- tested
- documented

Large-scale rewrites without justification are discouraged.

---

# 8. Code Ownership

Every file should have one clear responsibility.

Every function should have one purpose.

Every component should solve one problem.

Every hook should encapsulate one behavior.

Every store should manage one domain.

If responsibilities begin to overlap, extraction is required.

---

# 9. Simplicity Rule

When multiple implementations exist:

Choose the solution that is:

- easiest to understand
- easiest to test
- easiest to maintain
- easiest to extend

Never choose cleverness over clarity.

---

# 10. Scalability Rule

Every implementation must assume the application will eventually include:

- multiple financial accounts
- budgeting
- investments
- recurring transactions
- subscriptions
- goals
- reports
- analytics
- synchronization
- cloud backup
- AI-powered insights
- plugins/extensions

No architectural decision should prevent future expansion.

---

# 11. UI Philosophy

The interface must feel:

- calm
- modern
- lightweight
- responsive
- polished
- trustworthy

Visual noise should be minimized.

Animations should communicate state—not decorate the interface.

Whitespace is a design tool.

Accessibility is mandatory.

---

# 12. Data Philosophy

Data integrity has priority over convenience.

Transactions must remain internally consistent.

Corrupted state is unacceptable.

Validation should happen as early as possible.

Invalid state should be impossible whenever feasible.

---

# 13. Performance Philosophy

Performance is a feature.

The application should avoid:

- unnecessary renders
- unnecessary state updates
- unnecessary network calls
- unnecessary allocations
- unnecessary effects

Optimization should follow measurement—not assumptions.

---

# 14. Security Philosophy

Although Cuentas is primarily a local-first application, security principles must always be respected.

Sensitive information should never be exposed unnecessarily.

Secrets must never be hardcoded.

User data should remain isolated.

Future synchronization must assume zero trust between client and server.

---

# 15. Documentation Philosophy

Architecture decisions must be documented.

Complex code must explain *why*, not *what*.

Public APIs require documentation.

Breaking changes require migration notes.

Documentation is considered part of the product.

---

# 16. AI Collaboration Policy

AI assistants (Claude Code, ChatGPT, Copilot, etc.) are implementation assistants—not architects.

Architecture decisions originate from this documentation.

If generated code conflicts with this contract:

- the contract is correct
- the generated code is wrong

AI-generated code must always be reviewed before integration.

---

# 17. Continuous Improvement

Every completed feature should improve at least one of the following:

- readability
- consistency
- performance
- architecture
- maintainability
- testing
- documentation
- accessibility

No feature should leave the codebase worse than before.

---

# 18. Definition of Success

Version 2 will be considered successful when:

- the application is fully modular
- every domain is isolated
- business logic is independent of UI
- state management is predictable
- components are reusable
- offline-first functionality is preserved
- the architecture supports future growth without major rewrites
- new developers can understand the project quickly
- AI agents can contribute safely using the documented architecture

---

# 19. Final Principle

Every decision made during the development of Cuentas should answer one question:

> **Will this make the project easier to evolve five years from now?**

If the answer is **no**, reconsider the implementation.
