"use client";

/**
 * Client-side data fetching hook for use inside Client Components ("use client").
 *
 * Use this when data depends on runtime state, user interaction, or needs to
 * re-fetch dynamically in the browser. Handles loading, error, and automatic
 * request cancellation via AbortController on unmount or when the url(s) change.
 *
 * Pass a single URL to fetch one resource, an array to fetch several in
 * parallel, or null to skip fetching conditionally.
 *
 * For server-side fetching in Server Components (async components without
 * "use client"), use `serverFetch` from `@/infra/helpers/serverFetch` instead.
 *
 * @example
 * const { data, loading, error } = useFetchQuery<Product>(`/api/products/${id}`);
 * const { data, loading, error } = useFetchQuery<Product>(urls); // urls: string[]
 */

import { useState, useEffect } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useFetchQuery<T>(url: string | null): FetchState<T>;
export function useFetchQuery<T>(urls: string[]): FetchState<T[]>;
export function useFetchQuery<T>(
  input: string | string[] | null
): FetchState<T> | FetchState<T[]> {
  const isList = Array.isArray(input);
  const urls = input === null ? [] : isList ? input : [input];
  const key = urls.join(",");

  const [state, setState] = useState<FetchState<unknown>>({
    data: null,
    loading: urls.length > 0,
    error: null,
  });

  useEffect(() => {
    if (urls.length === 0) {
      setState({ data: isList ? [] : null, loading: false, error: null });
      return;
    }

    const controller = new AbortController();

    const run = async () => {
      setState({ data: null, loading: true, error: null });
      try {
        const responses = await Promise.all(
          urls.map((u) => fetch(u, { signal: controller.signal }))
        );
        for (const res of responses) {
          if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
          }
        }
        const results = await Promise.all(responses.map((res) => res.json()));
        setState({
          data: isList ? results : results[0],
          loading: false,
          error: null,
        });
      } catch (err: unknown) {
        if ((err as Error).name === "AbortError") return;
        setState({ data: null, loading: false, error: (err as Error).message });
      }
    };

    run();
    return () => controller.abort();
    // urls/isList are derived fresh every render; key is the stable dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, isList]);

  return state as FetchState<T> | FetchState<T[]>;
}
