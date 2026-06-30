> Project: **Cuentas**
>
> Version: 2.0
>
> Status: Reverse Engineering & Migration Blueprint
>
> This document defines the mandatory methodology for analyzing the Version 1 prototype and transforming it into the Version 2 architecture. The objective is to preserve **behavior**, not implementation.

---

# 1. Objective

The purpose of this document is to completely understand the current application before implementing the new architecture.

The V1 codebase is considered the functional reference, not the architectural reference.

The migration process must:

- preserve every existing feature
- preserve user workflows
- preserve calculations
- preserve business rules
- preserve UX expectations

while replacing the underlying implementation with a modern architecture.

**Important**

The goal is **not** to rewrite the existing TSX file.

The goal is to understand it well enough that it can be rebuilt correctly.

---

# 2. Fundamental Principle

The existing implementation is **temporary**.

The application's behavior is **permanent**.

Therefore:

- Preserve behavior.
- Improve implementation.

Never migrate poor architecture into Version 2.

---

# 3. Scope

Claude must inspect every part of the existing TSX application.

This includes, but is not limited to:

- pages
- layouts
- components
- dialogs
- cards
- buttons
- tables
- charts
- forms
- navigation
- hooks
- state
- utility functions
- constants
- interfaces
- types
- enums
- calculations
- formatting helpers
- validation logic
- persistence logic
- business rules
- side effects
- animations
- icons
- styling decisions

No portion of the application may remain undocumented.

---

# 4. Reverse Engineering Process

The following process is mandatory.

No implementation work may begin before completing every step.

---

## Step 1 — Read

Read the complete TSX file.

Do not modify anything.

The purpose is understanding.

---

## Step 2 — Inventory

Create a complete inventory of every element found.

Every item must include:

- Name
- Type
- Responsibility
- Dependencies
- Inputs
- Outputs
- Current Location
- Future Location

---

## Step 3 — Functional Mapping

Document every feature provided by the application.

Focus on:

"What can the user do?"

Not:

"How was it implemented?"

---

## Step 4 — Business Logic Extraction

Identify every piece of business logic.

Business logic must be separated from presentation logic.

---

## Step 5 — Dependency Mapping

Identify every dependency between components.

Determine which dependencies should remain and which should disappear.

---

## Step 6 — Domain Classification

Assign every element to its future domain.

Nothing should remain "global" unless justified.

---

## Step 7 — Migration Planning

Create the migration path from V1 to V2.

Migration should occur incrementally.

No feature should be lost during the process.

---

# 5. Functional Inventory

Claude must produce a complete inventory.

## Pages

| Name | Purpose | Future Module |
|------|----------|---------------|

---

## Components

| Component | Responsibility | Destination |
|------------|---------------|-------------|

---

## Hooks

| Hook | Purpose | Destination |
|------|----------|-------------|

---

## Types

| Type | Purpose | Destination |
|------|----------|-------------|

---

## Interfaces

| Interface | Purpose | Destination |
|-----------|----------|-------------|

---

## Utility Functions

| Function | Purpose | Destination |
|----------|----------|-------------|

---

## Constants

| Constant | Purpose | Destination |
|----------|----------|-------------|

---

## Forms

| Form | Purpose | Destination |
|------|----------|-------------|

---

## Dialogs

| Dialog | Purpose | Destination |
|--------|----------|-------------|

---

## Charts

| Chart | Purpose | Destination |
|-------|----------|-------------|

---

## Navigation

| Element | Purpose | Destination |
|---------|----------|-------------|

---

# 6. Feature Inventory

Every user-visible capability must be documented.

Example categories:

- Dashboard
- Accounts
- Transactions
- Income
- Expenses
- Categories
- Budgets
- Savings Goals
- Analytics
- Reports
- Calendar
- Settings
- Search
- Filters
- Export
- Import
- Notifications

For each feature document:

- Purpose
- User Flow
- Dependencies
- Business Rules
- Data Used
- UI Components

---

# 7. Business Logic Analysis

Every calculation must be identified.

Examples include:

- balance calculations
- income totals
- expense totals
- monthly summaries
- yearly summaries
- category aggregation
- budget remaining
- savings progress
- transaction validation
- recurring transaction generation
- statistics
- averages
- percentages

Each calculation should document:

Current Location

↓

Future Domain

↓

Future Service

↓

Future Tests

---

# 8. UI Analysis

The current interface should be decomposed into reusable building blocks.

Document every:

- Button
- Card
- Input
- Select
- Checkbox
- Switch
- Badge
- Dialog
- Modal
- Sheet
- Navigation Item
- Tab
- Chart
- Table
- List
- Progress Indicator
- Empty State
- Loading State
- Error State

Each element should specify:

Current Component

↓

Future Design System Component

---

# 9. State Analysis

Identify every state variable.

Classify it as:

## Local UI State

Temporary interface state.

Examples:

- dialog open
- selected tab
- dropdown state

---

## Global UI State

Shared UI state.

Examples:

- theme
- sidebar
- language

---

## Domain State

Business entities.

Examples:

- accounts
- transactions
- budgets

---

## Persistent State

State stored locally.

Examples:

- IndexedDB
- Dexie

---

## Derived State

Computed values.

Examples:

- total balance
- monthly income
- budget utilization

---

## Server State

Future synchronized state.

---

# 10. Data Flow Analysis

Claude should describe the application's data flow.

Example:

```text
User

↓

UI Event

↓

Validation

↓

Business Logic

↓

State Store

↓

Database

↓

Computed Selectors

↓

UI Components
```

Every important flow should be documented.

---

# 11. Dependency Analysis

Document every dependency.

Examples:

Component

↓

Hook

↓

Store

↓

Database

↓

Utility

↓

UI

Dependencies should become directional.

Circular dependencies are forbidden.

---

# 12. Technical Debt Report

Claude must identify every architectural weakness.

Examples include:

- duplicated code
- duplicated logic
- oversized components
- oversized hooks
- oversized functions
- prop drilling
- excessive local state
- mixed responsibilities
- weak typing
- repeated calculations
- dead code
- inconsistent naming
- inconsistent styling
- magic numbers
- magic strings
- hidden side effects

Each issue should include:

Problem

Impact

Recommendation

Priority

---

# 13. Migration Classification

Every identified element must receive one classification.

Allowed classifications:

## Keep

No change required.

---

## Move

Architecture changes only.

---

## Refactor

Improve without changing behavior.

---

## Rewrite

Replace implementation.

Behavior remains identical.

---

## Split

Break into multiple modules.

---

## Merge

Combine with another element.

---

## Delete

Safe to remove.

Unused.

---

# 14. Migration Order

Migration must follow this sequence.

1. Shared Types
2. Domain Models
3. Utility Functions
4. Validation
5. Design Tokens
6. UI Components
7. Layout System
8. Hooks
9. State Management
10. Database Layer
11. Feature Modules
12. Pages
13. Navigation
14. Performance Optimization
15. Testing
16. Documentation

---

# 15. Risk Assessment

Potential risks include:

- regression
- lost functionality
- broken calculations
- incorrect persistence
- inconsistent UI
- data corruption
- rendering issues
- performance degradation

Each identified risk should include a mitigation strategy.

---

# 16. Deliverables

The reverse engineering phase is complete only when the following artifacts exist:

- Complete feature inventory
- Complete component inventory
- Complete business logic inventory
- Complete state inventory
- Complete dependency map
- Technical debt report
- Migration classification
- Migration roadmap

---

# 17. Acceptance Criteria

The reverse engineering phase is considered complete only if:

- Every feature has been documented.
- Every component has been classified.
- Every calculation has a future owner.
- Every piece of state has a future owner.
- Every dependency has been analyzed.
- Every technical debt item has been identified.
- Every migration decision is documented.
- No behavior has been lost.
- No undocumented functionality remains.
- The migration plan can be executed without re-analyzing the original TSX.

---

# 18. Final Principle

The TSX prototype is **the source of functional truth**, but **not** the source of architectural truth.

The responsibility of Version 2 is to preserve everything the user can do while replacing almost everything the developer sees.

If an implementation detail from Version 1 conflicts with the architecture defined for Version 2:

- Preserve the behavior.
- Replace the implementation.
- Never compromise the architecture.