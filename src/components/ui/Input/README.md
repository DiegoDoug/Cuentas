# Input

Token-styled text input primitive. A single control reused everywhere — never
duplicated for stylistic differences (docs/04_DESIGN_SYSTEM.md §10/§20).

## Props

| Prop        | Type                                     | Default  | Description                                  |
| ----------- | ---------------------------------------- | -------- | -------------------------------------------- |
| `isInvalid` | `boolean`                                | `false`  | Sets `aria-invalid` and error border.        |
| ...rest     | `InputHTMLAttributes<HTMLInputElement>`  | —        | `value`, `onChange`, `type`, `aria-*`, etc.  |

The `ref` is forwarded to the underlying `<input>`.

## Usage

```tsx
<label htmlFor="name">Name</label>
<Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
```

## Accessibility

- Renders a real `<input>` — native labelling and validation.
- Associate a `<label htmlFor>` and link error text via `aria-describedby`.
- `isInvalid` exposes `aria-invalid` for assistive technology.
- Focus ring comes from the global `:focus-visible` style (token-driven).
