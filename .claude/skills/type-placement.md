# Type Placement

Types live as close as possible to where they are used.

## Decision Rule

```
Used by one file only?              → inline in that file
Used across two or more pages?      → types/ at root
```

## Promotion Rule

Start inline. Move to `types/` the moment a second file needs to import it. Never put types in `types/` pre-emptively — it becomes a dumping ground.

## What Stays Inline Forever

- Component props — they describe the component's API, never shared
- Internal shapes for hooks and helpers — implementation details, not contracts
- Response wrapper types for a single page fetch

## type, Never interface

Always declare object shapes with `type`, never `interface`. Extending another shape is an intersection (`type Props = HTMLAttributes<HTMLDivElement> & { hoverable?: boolean }`), not `extends`.

`type` handles unions, intersections, and primitives the same way it handles object shapes — one mental model for every kind of type in the codebase, rather than reaching for `interface` only when the shape happens to be an object. `interface` also supports declaration merging (re-opening the same name from another file), which is a useful escape hatch for ambient/global type declarations but not something this codebase relies on — `type` aliases reject accidental duplicate names outright instead of silently merging them.
