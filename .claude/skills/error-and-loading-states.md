# Error and Loading States

## Shared Components

`components/ErrorState` and `components/LoadingState` are the default building blocks for full-section error and loading screens. Never hand-roll a spinner or error message inline — extend the shared component's props (icon, title, message, digest, onRetry) instead.

The one exception is a route-private, content-shaped skeleton (e.g. `app/_components/ProductCardSkeleton`) — see the Loading decision rule below for when that's warranted instead of `LoadingState`.

## Expected vs Unexpected Errors

- **Expected errors** (a fetch that fails, a missing resource) are values, not exceptions. Handle them with a plain `if (error)` check in the Server Component and return `<ErrorState />` directly. Never throw for something that can happen during normal operation.
- **Unexpected errors** (bugs, thrown exceptions) are caught automatically by the nearest `error.tsx` file convention. Only add a new `error.tsx` when a route segment introduces its own nested `layout.tsx` — otherwise the root one already covers it.
- An error thrown inside the root `layout.tsx` itself bypasses every `error.tsx`, since `error.tsx` wraps `page.tsx` and nested segments but never the `layout.tsx` sitting beside it. Only `global-error.tsx` can catch that case — it must define its own `<html>`/`<body>` tags and re-import global styles/fonts, since it replaces the root layout entirely when active.

## Loading

Any route that awaits a fetch in a Server Component should have a sibling `loading.tsx`. Next.js wraps that segment's `page.tsx` in Suspense automatically — it's not something you import or render yourself, just a filename Next.js detects.

Default to rendering `<LoadingState />` in it. Reach for a route-private skeleton instead only when the route's content has a stable, repeatable shape (a card grid, a list of rows) where swapping a small centered spinner for the full layout would cause a visible layout shift — e.g. `app/loading.tsx` rendering a grid of `ProductCardSkeleton` placeholders sized to match the real `ProductCard`. A skeleton is more code to maintain (it has to be kept in sync with the real component's dimensions), so don't reach for one unless layout shift is the actual problem being solved.

## Decision Rule

```
Does this route segment fetch data that can be slow or fail?
  Yes → add loading.tsx + handle the error case inline (ErrorState)
    Does the content have a stable, repeatable shape where a spinner
    would cause visible layout shift on swap?
      Yes → content-shaped skeleton, route-private
      No  → LoadingState (default)
  Does this route segment introduce a new layout.tsx?
  Yes → add an error.tsx there too
  No  → the nearest existing error.tsx already covers it
```
