import { renderHook, waitFor } from "@testing-library/react";
import { useFetchQuery } from "@/infra/hooks/useFetchQuery";

const mockFetch = jest.fn();
global.fetch = mockFetch;

function makeResponse(data: unknown, ok = true, status = 200) {
  return Promise.resolve({
    ok,
    status,
    json: () => Promise.resolve(data),
  } as Response);
}

beforeEach(() => mockFetch.mockReset());

describe("useFetchQuery", () => {
  it("starts in loading state when a url is provided", () => {
    mockFetch.mockReturnValue(new Promise(() => {})); // never resolves
    const { result } = renderHook(() => useFetchQuery("/api/test"));
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("sets data on successful fetch", async () => {
    const payload = { id: 1, name: "Product" };
    mockFetch.mockReturnValue(makeResponse(payload));
    const { result } = renderHook(() => useFetchQuery("/api/test"));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual(payload);
    expect(result.current.error).toBeNull();
  });

  it("sets error when the response is not ok", async () => {
    mockFetch.mockReturnValue(makeResponse(null, false, 404));
    const { result } = renderHook(() => useFetchQuery("/api/test"));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Request failed with status 404");
    expect(result.current.data).toBeNull();
  });

  it("sets error on network failure", async () => {
    mockFetch.mockReturnValue(Promise.reject(new Error("Network error")));
    const { result } = renderHook(() => useFetchQuery("/api/test"));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Network error");
  });

  it("aborts the request on unmount", async () => {
    let capturedSignal: AbortSignal | undefined;
    mockFetch.mockImplementation((_url: string, opts: RequestInit) => {
      capturedSignal = opts.signal as AbortSignal;
      return new Promise(() => {}); // never resolves
    });
    const { unmount } = renderHook(() => useFetchQuery("/api/test"));
    unmount();
    expect(capturedSignal?.aborted).toBe(true);
  });

  it("does nothing when url is null", () => {
    const { result } = renderHook(() => useFetchQuery(null));
    expect(result.current.loading).toBe(false);
    expect(mockFetch).not.toHaveBeenCalled();
  });
});
