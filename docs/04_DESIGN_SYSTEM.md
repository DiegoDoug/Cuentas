> Project: **Cuentas**
>
> Version: 2.0
>
> Status: Design System & UI Specification
>
> This document defines the complete visual language of Cuentas Version 2. It establishes the Design Tokens, component architecture, accessibility requirements, interaction principles, and performance guidelines that ensure a consistent, scalable, and maintainable user interface.

---

# 1. Purpose

The Design System provides a single source of truth for the application's visual identity and interaction patterns.

Its objectives are to:

- ensure visual consistency
- maximize usability
- simplify UI development
- reduce duplicated components
- improve accessibility
- enable scalable feature development
- support theming
- provide reusable building blocks

No feature may introduce its own visual language.

---

# 2. Design Philosophy

The Cuentas interface should feel:

- Modern
- Calm
- Clean
- Fast
- Trustworthy
- Professional
- Minimalistic

The interface should reduce cognitive load while exposing financial information clearly.

Design should prioritize clarity over decoration.

---

# 3. Core Principles

Every UI decision should follow these principles.

## Clarity

Information should always be understandable.

---

## Consistency

Identical actions should look identical.

---

## Hierarchy

Visual weight should reflect importance.

---

## Feedback

Every interaction should provide immediate feedback.

---

## Accessibility

Accessibility is mandatory.

---

## Simplicity

Interfaces should expose only necessary information.

---

## Progressive Disclosure

Advanced functionality should appear only when needed.

---

# 4. Design Tokens

All visual values must originate from Design Tokens.

Hardcoded values are forbidden.

---

## Color Tokens

```
Primary

Secondary

Success

Warning

Danger

Info

Neutral
```

Example structure:

```
colors/

    primary.ts

    neutral.ts

    semantic.ts
```

---

## Typography Tokens

```
Font Family

Display

Heading

Title

Body

Caption

Label

Mono
```

Never hardcode font sizes.

---

## Spacing Tokens

Base spacing unit:

```
4px
```

Scale:

```
0

4

8

12

16

20

24

32

40

48

64

80

96
```

All spacing should reference tokens.

---

## Border Radius

```
xs

sm

md

lg

xl

full
```

---

## Shadows

```
xs

sm

md

lg

xl
```

---

## Opacity

```
disabled

hover

pressed

overlay
```

---

## Animation Tokens

```
Fast

Normal

Slow
```

No arbitrary animation durations.

---

## Z-Index Tokens

```
dropdown

modal

popover

toast

tooltip
```

---

# 5. Theme System

Themes should be token-driven.

Supported:

- Light
- Dark

Future support:

- Custom Themes
- High Contrast

Components must never depend on literal colors.

---

# 6. Typography System

Recommended hierarchy:

```
Display

H1

H2

H3

H4

Body Large

Body

Body Small

Caption

Label
```

Typography should communicate hierarchy without relying on color.

---

# 7. Iconography

Icons should be:

- consistent
- outlined or filled (not mixed)
- meaningful
- accessible

Avoid decorative icons without functional value.

---

# 8. Component Architecture

Components are divided into four layers.

---

## Primitives

Examples:

```
Button

Input

Card

Badge

Avatar

Icon

Separator

Spinner
```

---

## Composed Components

Examples:

```
TransactionCard

BudgetCard

AccountCard

StatisticCard
```

---

## Feature Components

Examples:

```
TransactionTable

BudgetOverview

DashboardSummary

SavingsProgress
```

---

## Page Layouts

Examples:

```
DashboardLayout

SettingsLayout

AnalyticsLayout
```

---

# 9. Component Rules

Every component should:

- have one responsibility
- expose a clean API
- be reusable
- be composable
- support accessibility
- avoid unnecessary props

Large components should be split.

---

# 10. Variant System

Components should expose variants.

Example:

```
Button

Primary

Secondary

Ghost

Outline

Danger

Success
```

Never duplicate components for style differences.

---

# 11. Size System

Common sizes:

```
xs

sm

md

lg

xl
```

Used consistently across:

- buttons
- inputs
- badges
- avatars
- icons

---

# 12. Layout Principles

Use Flexbox and CSS Grid.

Avoid deeply nested containers.

Whitespace should create structure.

Layouts should adapt naturally to screen size.

---

# 13. Responsive Design

Primary targets:

- Mobile
- Tablet
- Desktop
- Large Desktop

Responsive behavior should prioritize usability rather than simply resizing elements.

---

# 14. Feedback Components

The Design System must include:

- Loading States
- Skeletons
- Empty States
- Error States
- Success Messages
- Toasts
- Confirmations

Every asynchronous action should provide user feedback.

---

# 15. Forms

Forms should provide:

- inline validation
- clear labels
- helper text
- error messages
- success feedback

Validation should occur as early as appropriate.

---

# 16. Data Visualization

Charts should emphasize readability.

Guidelines:

- avoid unnecessary decoration
- consistent color palette
- accessible color contrast
- clear legends
- responsive sizing

Financial information should remain understandable at a glance.

---

# 17. Motion Guidelines

Animations should communicate:

- state changes
- transitions
- loading
- focus

Animations should never delay user interaction.

Respect reduced motion preferences.

---

# 18. Accessibility Standards

Cuentas targets WCAG 2.2 AA compliance.

Requirements:

- keyboard navigation
- visible focus indicators
- semantic HTML
- screen reader compatibility
- sufficient color contrast
- accessible labels
- logical tab order

Accessibility is part of the Definition of Done.

---

# 19. Performance Guidelines

The UI should:

- avoid unnecessary renders
- lazy load large modules
- virtualize long lists
- minimize layout shifts
- optimize bundle size
- preload critical assets only

Performance improvements should never reduce usability.

---

# 20. Design System Folder Structure

```
styles/

    tokens/

        colors.ts

        spacing.ts

        typography.ts

        radius.ts

        shadows.ts

        motion.ts

        zIndex.ts

    themes/

        light.ts

        dark.ts

components/

    ui/

        Button/

        Card/

        Input/

        Badge/

        Modal/

        Dialog/

        Select/

        Table/

        Tabs/

        Tooltip/

        Spinner/

        Skeleton/

        Toast/
```

---

# 21. Naming Conventions

Component names:

```
PascalCase
```

Props:

```
camelCase
```

Variants:

```
primary

secondary

outline

ghost

danger
```

Boolean props:

```
isLoading

isDisabled

isSelected
```

---

# 22. Documentation Requirements

Every reusable component must document:

- purpose
- props
- variants
- accessibility considerations
- usage examples
- limitations

Components without documentation are considered incomplete.

---

# 23. Design QA Checklist

Before merging any UI work:

- [ ] Uses Design Tokens only.
- [ ] No hardcoded colors.
- [ ] No hardcoded spacing.
- [ ] Responsive on supported breakpoints.
- [ ] Keyboard accessible.
- [ ] Focus states implemented.
- [ ] Screen reader friendly.
- [ ] Variants follow Design System.
- [ ] No duplicated components.
- [ ] Animations respect reduced motion.
- [ ] Meets WCAG AA contrast requirements.
- [ ] No layout shifts introduced.

---

# 24. Future Evolution

The Design System should support future additions without structural changes.

Potential future components include:

- Kanban Views
- Financial Calendars
- AI Assistant Panels
- Multi-Currency Widgets
- Investment Dashboards
- Plugin Components
- Collaborative Workspaces

These should integrate through the existing component hierarchy rather than introducing parallel systems.

---

# 25. Final Principle

The Design System of **Cuentas** is not a collection of UI components—it is the visual contract of the application.

Every interface should feel cohesive regardless of when it was built, every component should be reusable across features, and every visual decision should improve clarity, accessibility, and long-term maintainability.