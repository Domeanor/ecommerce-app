interface FetchResult<T> {
  data: T | null;
  error: string | null;
}

export async function serverFetch<T>(
  url: string,
  options?: RequestInit
): Promise<FetchResult<T>> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    const data = (await res.json()) as T;
    return { data, error: null };
  } catch (err: unknown) {
    return { data: null, error: (err as Error).message };
  }
}
