<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# ShopNext

E-commerce app — Next.js App Router, TypeScript, Tailwind CSS v4, Jest.

## Conventions

Before writing any code, read `.claude/skills/`. The skills documents are the source of truth for how this codebase is structured and why.

Key principles:
- Components have three layers: infra primitives → shared (`components/`) → route-private (`_components/`). The shared layer is empty until a component is needed by two or more pages. See `component-architecture.md`.
- Types live inline; promote to `types/` only when shared across pages. See `type-placement.md`.
- Server Components use `serverFetch`, Client Components use `useFetchQuery`. See `data-fetching.md`.
- Tests are co-located next to source files, not in a global folder. See `testing.md`.
- No barrel `index.ts` files — import directly from the file path.
