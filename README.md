# ShopNext

A simple e-commerce app built with Next.js App Router, TypeScript, and Tailwind CSS. Products are sourced from the [DummyJSON API](https://dummyjson.com).

## Features

- Product listing with lazy-loaded images, card-shaped loading skeletons, and number-based pagination
- Product detail page
- Cart — add products, remove products, live item count and total price
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

### Cart State
Cart state lives in a `CartContext` (React Context + `useState`), provided once via the existing `Providers` pattern and read through a `useCart` hook. Context was chosen over Redux or Zustand because there's only one slice of global state and updates are infrequent and user-triggered — the overhead of a dedicated state library wouldn't pay for itself here. State is in-memory only and is lost on a page refresh; persisting it to `localStorage` would be a small, isolated addition (sync on every cart change, hydrate on mount) if that's needed later.

The context only stores `{ id, quantity }` pairs and a derived `totalCount` — not product details. Storing a price/title snapshot was tempting since the add-to-cart button already has the full product in hand, but it would mean the cart page shows whatever the price was at the moment of adding, not the current price. Instead, the cart page fetches each item's live product details by id (via `useFetchQuery`, which accepts either a single URL or an array of URLs to fetch in parallel) and computes `totalPrice` itself from that fresh data.

### Add to Cart Control
The home page's product cards and the product detail page both need an add-to-cart button that turns into a +/- quantity stepper once the item is in the cart — same logic, different sizing (a compact icon-only control on the card vs. a full-width labeled button on the detail page). Rather than duplicating that logic in two components, there's a single `AddToCartControl` in the shared `components/` layer with a `variant` prop. Since it's nested inside the card's own link to the product page, every click handler stops event propagation so adding to cart doesn't also navigate.

### Pagination
The product list uses classic number-based pagination (`?page=2`) rather than infinite scroll — the page stays a Server Component that reads `searchParams`, fetches just that page's slice via DummyJSON's `limit`/`skip`, and renders plain `<Link>`s for the page numbers. No client-side state at all. Page numbers collapse into an ellipsis once there are enough pages to make that worthwhile (`1 2 3 … 17`), but show every page when the total is small enough that collapsing would save less than it costs in clarity.

The current page is stored in the URL rather than in local component state, which would require turning the page into a Client Component and fetching on the client instead. The URL approach is strictly better here: the page survives a refresh, a link to page 3 is shareable and bookmarkable, browser back/forward works for free, and the product grid stays server-rendered with zero client JS for navigation. Product cards carry the current page along to the detail page (`/products/42?page=3`), so the "← Back to products" link can return you to the exact page you came from instead of always landing on page 1.

### Skeleton Loading
`app/loading.tsx` renders a grid of `ProductCardSkeleton` placeholders — shaped to match `ProductCard`'s actual image height, title lines, and price/button row — instead of a centered spinner. A spinner communicates "something is happening" but gives no sense of the page's shape, and swapping a small centered spinner for a full product grid causes a jarring layout jump. Skeletons shaped like the real content keep the page geometry stable across the loading → loaded transition.

## Known Limitations

- **No authentication** — the app is fully public with no user sessions.
- **Cart does not persist across a page refresh** — state lives in React Context only, with no `localStorage`/server backing yet. Reloading the page or closing the tab clears it.
- **DummyJSON is read-only** — add to cart and checkout are UI-only; no real orders are placed.
- **No search or filtering** — products cannot be filtered by category or price.
- **Cart items aren't clickable** — there's no way to open a product's detail page from the cart; the thumbnail and title in each cart row are plain text/image, not a link.
