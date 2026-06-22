# Data Fetching

Two utilities with the same return shape — pick based on where the component runs.

## Decision Rule

```
Is the component a Server Component (no "use client")?
  Yes → serverFetch   — async/await, returns { data, error }, no loading state
  No  → useFetchQuery — hook, returns { data, loading, error }, handles abort
```

## serverFetch

For Server Components that fetch at request or build time. Supports Next.js cache options (`force-cache`, `no-store`, `revalidate`) via the options argument. Never use inside a hook or Client Component.

## useFetchQuery

For Client Components that fetch based on runtime state or user interaction. Automatically cancels the in-flight request via AbortController on unmount or URL change. Pass `null` as the URL to skip fetching conditionally.

## Why the Split Exists

React hooks (`useState`, `useEffect`) only run in the browser — a component using them cannot be `async`. Making a page a Client Component to use a hook loses server rendering, slower perceived load, and no SEO benefit. Use `serverFetch` for anything the server can know at request time.
