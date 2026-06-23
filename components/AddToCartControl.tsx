"use client";

import { MouseEvent } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/_components/CartProvider";
import Button from "@/infra/components/Button";
import Flex from "@/infra/components/Flex";
import Text from "@/infra/components/Text";
import { cn } from "@/infra/helpers/cn";
import { Product } from "@/types/product";

type AddToCartControlProps = {
  product: Product;
  variant?: "full" | "compact";
};

// Used inside a card that's itself a Link in the "compact" context — always
// guard against triggering that navigation; harmless when there's no
// ancestor link (the product page's "full" variant).
function stopNavigation(event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
}

const sizing = {
  full: {
    stepperContainer:
      "mt-2 w-full overflow-hidden rounded-lg border border-gray-300 lg:w-40",
    stepperButton: "h-11 w-11",
    icon: "h-4 w-4",
    qtyVariant: "label" as const,
    qtyClassName: undefined,
    addButton:
      "mt-2 w-full gap-2 rounded-lg px-6 py-3 text-sm font-semibold lg:w-fit",
  },
  compact: {
    stepperContainer: "overflow-hidden rounded-full border border-gray-300",
    stepperButton: "h-7 w-7",
    icon: "h-3 w-3",
    qtyVariant: "caption" as const,
    qtyClassName: "w-4 text-center",
    addButton: "h-7 w-7 rounded-full",
  },
};

export default function AddToCartControl({
  product,
  variant = "full",
}: AddToCartControlProps) {
  const { items, addItem, decreaseItem } = useCart();
  const cartItem = items.find((item) => item.id === product.id);
  const sizes = sizing[variant];

  return cartItem ? (
    <Flex
      align="center"
      justify="between"
      onClick={stopNavigation}
      className={sizes.stepperContainer}
    >
      <Button
        variant="ghost"
        onClick={(event) => {
          stopNavigation(event);
          decreaseItem(product.id);
        }}
        aria-label="Decrease quantity"
        className={sizes.stepperButton}
      >
        <Minus className={sizes.icon} />
      </Button>
      <Text variant={sizes.qtyVariant} className={sizes.qtyClassName}>
        {cartItem.quantity}
      </Text>
      <Button
        variant="ghost"
        onClick={(event) => {
          stopNavigation(event);
          addItem(product.id);
        }}
        aria-label="Increase quantity"
        className={sizes.stepperButton}
      >
        <Plus className={sizes.icon} />
      </Button>
    </Flex>
  ) : (
    <Button
      variant="solid"
      onClick={(event) => {
        stopNavigation(event);
        addItem(product.id);
      }}
      aria-label={variant === "compact" ? "Add to cart" : undefined}
      className={cn("gap-2", sizes.addButton)}
    >
      <ShoppingCart className={sizes.icon} strokeWidth={2} />
      {variant === "full" && "Add to Cart"}
    </Button>
  );
}
