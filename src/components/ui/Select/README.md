# Select

Token-styled native `<select>` primitive. A single reusable control — never
duplicated for stylistic differences (docs/04_DESIGN_SYSTEM.md §10/§20).

## Props

| Prop        | Type                                       | Default | Description                                 |
| ----------- | ------------------------------------------ | ------- | ------------------------------------------- |
| `isInvalid` | `boolean`                                  | `false` | Sets `aria-invalid` and error border.       |
| ...rest     | `SelectHTMLAttributes<HTMLSelectElement>`  | —       | `value`, `onChange`, `aria-*`, etc.         |

Options are passed as `<option>` children. The `ref` is forwarded to the
underlying `<select>`.

## Usage

```tsx
<label htmlFor="type">Type</label>
<Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
  <option value="checking">Checking</option>
  <option value="savings">Savings</option>
</Select>
```

## Accessibility

- Renders a real `<select>` — native keyboard and screen-reader support.
- Associate a `<label htmlFor>` and link error text via `aria-describedby`.
- `isInvalid` exposes `aria-invalid` for assistive technology.
