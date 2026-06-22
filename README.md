# ShopNext

A simple e-commerce app built with Next.js App Router, TypeScript, and Tailwind CSS. Products are sourced from the [DummyJSON API](https://dummyjson.com).

## Features

- Product listing with lazy-loaded images and shimmer skeletons
- Product detail page
- Add to Cart action (UI only — see Known Limitations)
- Loading states and error/not-found screens for every route
- Responsive layout

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm test        # run tests
npm run lint    # run ESLint
```

## Thought Process and Trade-offs

### Component Architecture
The codebase uses three explicit layers: infrastructure primitives (`infra/components/`), shared page components (`components/`), and route-private components (`app/<route>/_components/`). This keeps domain-free UI building blocks separate from page-specific code and makes the intended scope of each component clear without needing comments.

### Data Fetching Split
Server Components fetch with `serverFetch` (a plain async helper), Client Components use the `useFetchQuery` hook. The split is intentional — hooks can't run in Server Components, and using a Client Component for data that's known at request time would sacrifice server rendering, SEO, and initial load performance. The naming makes the distinction self-evident.

### No Barrel Exports
Each import points directly to its file (`@/infra/components/Box`) rather than going through an `index.ts`. Barrel files hide what a module actually exports, slow down editors, and cause circular dependency issues as projects grow.

### Type Placement
Types are defined inline where they're used and only promoted to `types/` when a second file needs to import them. This avoids a global types folder that becomes a dumping ground for types of varying relevance.

### Testing
Tests are co-located next to their source files rather than in a global `__tests__` folder. Moving or deleting a module takes its test with it naturally, and it's immediately visible which modules have coverage.

### Error and Loading States
Two shared components, `ErrorState` and `LoadingState`, back every route's error and loading UI. Next.js's special route files (`loading.tsx`, `error.tsx`, `global-error.tsx`, `not-found.tsx`) wire them in automatically — `loading.tsx` wraps a route in Suspense, `error.tsx` catches unexpected exceptions, and `global-error.tsx` covers the rare case of the root layout itself throwing, which a regular `error.tsx` structurally can't reach. Expected errors (a failed fetch, an invalid product id) are handled separately as plain return values in the page itself, not thrown — they're normal outcomes, not bugs.

## Known Limitations

- **No authentication** — the app is fully public with no user sessions.
- **Cart has no state management yet** — the Add to Cart button and header cart count are placeholders (the button currently just logs a click); there is no Context, persistence, or real cart page content.
- **DummyJSON is read-only** — even once cart state is wired up, checkout would be UI-only; no real orders are placed.
- **No pagination** — the product list fetches a fixed set of 30 products. DummyJSON supports pagination but it is not wired up yet.
- **No search or filtering** — products cannot be filtered by category or price.
