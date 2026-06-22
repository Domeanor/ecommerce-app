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
