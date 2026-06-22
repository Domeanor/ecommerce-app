# Error and Loading States

## Shared Components

`components/ErrorState` and `components/LoadingState` are the only building blocks for full-section error and loading screens. Never hand-roll a spinner or error message inline — extend the shared component's props (icon, title, message, digest, onRetry) instead.

## Expected vs Unexpected Errors

- **Expected errors** (a fetch that fails, a missing resource) are values, not exceptions. Handle them with a plain `if (error)` check in the Server Component and return `<ErrorState />` directly. Never throw for something that can happen during normal operation.
- **Unexpected errors** (bugs, thrown exceptions) are caught automatically by the nearest `error.tsx` file convention. Only add a new `error.tsx` when a route segment introduces its own nested `layout.tsx` — otherwise the root one already covers it.
- An error thrown inside the root `layout.tsx` itself bypasses every `error.tsx`, since `error.tsx` wraps `page.tsx` and nested segments but never the `layout.tsx` sitting beside it. Only `global-error.tsx` can catch that case — it must define its own `<html>`/`<body>` tags and re-import global styles/fonts, since it replaces the root layout entirely when active.

## Loading

Any route that awaits a fetch in a Server Component should have a sibling `loading.tsx` rendering `<LoadingState />`. Next.js wraps that segment's `page.tsx` in Suspense automatically — it's not something you import or render yourself, just a filename Next.js detects.

## Decision Rule

```
Does this route segment fetch data that can be slow or fail?
  Yes → add loading.tsx (LoadingState) + handle the error case inline (ErrorState)
  Does this route segment introduce a new layout.tsx?
  Yes → add an error.tsx there too
  No  → the nearest existing error.tsx already covers it
```
