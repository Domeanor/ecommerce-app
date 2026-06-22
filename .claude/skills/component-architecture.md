# Component Architecture

## Three Layers

**`infra/components/`** — Domain-free UI primitives. No knowledge of products, cart, or any app concept. Accept only HTML/style props. These are the building blocks everything else is composed from.

**`components/`** — Components used across two or more pages. Start in `_components/` and promote here only when a second page needs it. Never add here pre-emptively.

**`app/<route>/_components/`** — Components private to one route. The `_` prefix opts the folder out of Next.js routing. App-shell components wired once into `layout.tsx` belong here too — they are not reusable, so they don't belong in `components/`.

## Decision Rule

```
Is it a domain-free UI primitive?   → infra/components/
Is it used by 2+ pages?             → components/
Otherwise                           → app/<route>/_components/
```

## Providers Pattern

All React context providers stack inside a single `Providers` component in `app/_components/`. The root `layout.tsx` imports it once and never changes when new providers are added.

## RSC Constraint

Infra component `as` prop only accepts HTML string tags (`"div"`, `"section"`, etc.). Never pass a React component as `as` — Server Components cannot serialize function props. Wrap in the component instead.
