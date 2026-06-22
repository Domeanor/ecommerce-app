import { serverFetch } from "@/infra/helpers/serverFetch";

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

describe("serverFetch", () => {
  it("returns data and a null error on a successful fetch", async () => {
    const payload = { id: 1, name: "Product" };
    mockFetch.mockReturnValue(makeResponse(payload));
    const result = await serverFetch("/api/test");
    expect(result).toEqual({ data: payload, error: null });
  });

  it("returns an error and null data when the response is not ok", async () => {
    mockFetch.mockReturnValue(makeResponse(null, false, 404));
    const result = await serverFetch("/api/test");
    expect(result).toEqual({
      data: null,
      error: "Request failed with status 404",
    });
  });

  it("returns an error and null data on network failure", async () => {
    mockFetch.mockReturnValue(Promise.reject(new Error("Network error")));
    const result = await serverFetch("/api/test");
    expect(result).toEqual({ data: null, error: "Network error" });
  });

  it("forwards the options argument to fetch", async () => {
    mockFetch.mockReturnValue(makeResponse({}));
    await serverFetch("/api/test", { cache: "force-cache" });
    expect(mockFetch).toHaveBeenCalledWith("/api/test", {
      cache: "force-cache",
    });
  });
});
