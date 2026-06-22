"use client";

import { ShoppingCart } from "lucide-react";

export default function AddToCartButton() {
  return (
    <button
      type="button"
      onClick={() => console.log("Add to cart clicked")}
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-700 lg:w-fit"
    >
      <ShoppingCart className="h-4 w-4" strokeWidth={2} />
      Add to Cart
    </button>
  );
}
