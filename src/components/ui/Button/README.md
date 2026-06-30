# Button

The base interactive control. A single, variant-driven primitive — never
duplicate it for stylistic differences (docs/04_DESIGN_SYSTEM.md §10/§20).

## Props

| Prop        | Type                                                                | Default     | Description                                       |
| ----------- | ------------------------------------------------------------------- | ----------- | ------------------------------------------------- |
| `variant`   | `primary \| secondary \| outline \| ghost \| danger \| success`     | `primary`   | Visual intent.                                    |
| `size`      | `sm \| md \| lg`                                                    | `md`        | Control size.                                     |
| `isLoading` | `boolean`                                                           | `false`     | Shows a spinner; marks the control busy/disabled. |
| `fullWidth` | `boolean`                                                           | `false`     | Stretches to the container width.                 |
| ...rest     | `ButtonHTMLAttributes<HTMLButtonElement>`                           | —           | `onClick`, `disabled`, `type`, `aria-*`, etc.     |

The `ref` is forwarded to the underlying `<button>`.

## Variants

```tsx
<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Delete</Button>
<Button variant="success">Confirm</Button>
```

## Accessibility

- Renders a real `<button>` — full keyboard and screen-reader support.
- Exposes `aria-busy` while loading and is automatically disabled in that state.
- Focus styling comes from the global `:focus-visible` ring (token-driven).
- Respects `prefers-reduced-motion` for the loading spinner.

## Limitations

- Icon-only usage should still provide an accessible name via `aria-label`.
- For navigation, prefer a link styled as a button rather than a click handler.
