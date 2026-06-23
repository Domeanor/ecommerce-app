import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "@/app/_components/CartProvider";

function renderUseCart() {
  return renderHook(() => useCart(), { wrapper: CartProvider });
}

describe("useCart", () => {
  it("throws when used outside a CartProvider", () => {
    expect(() => renderHook(() => useCart())).toThrow(
      "useCart must be used within a CartProvider"
    );
  });

  it("starts with an empty cart", () => {
    const { result } = renderUseCart();
    expect(result.current.items).toEqual([]);
    expect(result.current.totalCount).toBe(0);
  });

  it("adds a new product to the cart with quantity 1", () => {
    const { result } = renderUseCart();
    act(() => result.current.addItem(1));
    expect(result.current.items).toEqual([{ id: 1, quantity: 1 }]);
    expect(result.current.totalCount).toBe(1);
  });

  it("increments quantity when the same id is added again", () => {
    const { result } = renderUseCart();
    act(() => result.current.addItem(1));
    act(() => result.current.addItem(1));
    expect(result.current.items).toEqual([{ id: 1, quantity: 2 }]);
    expect(result.current.totalCount).toBe(2);
  });

  it("removes a product from the cart", () => {
    const { result } = renderUseCart();
    act(() => result.current.addItem(1));
    act(() => result.current.removeItem(1));
    expect(result.current.items).toEqual([]);
    expect(result.current.totalCount).toBe(0);
  });

  it("tracks separate line items for different products", () => {
    const { result } = renderUseCart();
    act(() => result.current.addItem(1));
    act(() => result.current.addItem(2));
    expect(result.current.items).toHaveLength(2);
    expect(result.current.totalCount).toBe(2);
  });

  it("decreases the quantity of an existing item", () => {
    const { result } = renderUseCart();
    act(() => result.current.addItem(1));
    act(() => result.current.addItem(1));
    act(() => result.current.decreaseItem(1));
    expect(result.current.items).toEqual([{ id: 1, quantity: 1 }]);
    expect(result.current.totalCount).toBe(1);
  });

  it("removes the item when decreasing below a quantity of 1", () => {
    const { result } = renderUseCart();
    act(() => result.current.addItem(1));
    act(() => result.current.decreaseItem(1));
    expect(result.current.items).toEqual([]);
    expect(result.current.totalCount).toBe(0);
  });

  it("does nothing when decreasing an item that isn't in the cart", () => {
    const { result } = renderUseCart();
    act(() => result.current.addItem(1));
    act(() => result.current.decreaseItem(999));
    expect(result.current.items).toEqual([{ id: 1, quantity: 1 }]);
  });
});
