import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider } from "@/app/_components/CartProvider";
import AddToCartControl from "@/components/AddToCartControl";
import { Product } from "@/types/product";

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 1,
    title: "Test Product",
    price: 100,
    rating: 4.5,
    thumbnail: "/test.jpg",
    description: "A test product",
    discountPercentage: 10,
    images: ["/test.jpg"],
    ...overrides,
  };
}

function renderControl(props: Partial<React.ComponentProps<typeof AddToCartControl>> = {}) {
  return render(
    <CartProvider>
      <AddToCartControl product={makeProduct()} {...props} />
    </CartProvider>
  );
}

describe("AddToCartControl", () => {
  it("renders an 'Add to Cart' label in the full variant when not in cart", () => {
    renderControl({ variant: "full" });
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  it("renders an icon-only button in the compact variant when not in cart", () => {
    renderControl({ variant: "compact" });
    expect(screen.queryByText("Add to Cart")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add to cart" })).toBeInTheDocument();
  });

  it("shows a quantity stepper instead once the product is added", () => {
    renderControl();
    fireEvent.click(screen.getByText("Add to Cart"));
    expect(screen.queryByText("Add to Cart")).not.toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Increase quantity" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Decrease quantity" })).toBeInTheDocument();
  });

  it("increases the quantity when + is clicked", () => {
    renderControl();
    fireEvent.click(screen.getByText("Add to Cart"));
    fireEvent.click(screen.getByRole("button", { name: "Increase quantity" }));
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("removes the item and reverts to the add button when - is clicked at quantity 1", () => {
    renderControl();
    fireEvent.click(screen.getByText("Add to Cart"));
    fireEvent.click(screen.getByRole("button", { name: "Decrease quantity" }));
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });
});
