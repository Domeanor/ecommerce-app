"use client";

/**
 * Client-side data fetching hook for use inside Client Components ("use client").
 *
 * Use this when data depends on runtime state, user interaction, or needs to
 * re-fetch dynamically in the browser. Handles loading, error, and automatic
 * request cancellation via AbortController on unmount or url change.
 *
 * For server-side fetching in Server Components (async components without
 * "use client"), use `fetchQuery` from `@/infra/helpers/fetchQuery` instead.
 *
 * @example
 * const { data, loading, error } = useFetchQuery<Product>(`/api/products/${id}`);
 */

import { useState, useEffect } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetchQuery<T>(url: string | null) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: !!url,
    error: null,
  });

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    const run = async () => {
      setState({ data: null, loading: true, error: null });
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const data = (await res.json()) as T;
        setState({ data, loading: false, error: null });
      } catch (err: unknown) {
        if ((err as Error).name === "AbortError") return;
        setState({ data: null, loading: false, error: (err as Error).message });
      }
    };

    run();
    return () => controller.abort();
  }, [url]);

  return state;
}
