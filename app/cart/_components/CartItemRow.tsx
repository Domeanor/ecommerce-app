"use client";

import { Trash2 } from "lucide-react";
import Box from "@/infra/components/Box";
import Button from "@/infra/components/Button";
import Flex from "@/infra/components/Flex";
import Text from "@/infra/components/Text";
import LazyImage from "@/infra/components/LazyImage";
import { useCart } from "@/app/_components/CartProvider";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";

type CartItemRowProps = {
  item: CartItem;
  product: Product;
};

export default function CartItemRow({ item, product }: CartItemRowProps) {
  const { removeItem } = useCart();
  const unitPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <Flex
      align="center"
      gap={4}
      className="rounded-lg border border-gray-200 p-4"
    >
      <Box className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100">
        <LazyImage
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-contain p-1"
          sizes="64px"
        />
      </Box>

      <Flex direction="col" className="flex-1 min-w-0">
        <Text variant="label" className="break-words">
          {product.title}
        </Text>
        <Text variant="body2" className="text-gray-500">
          ${unitPrice.toFixed(2)} × {item.quantity}
        </Text>
      </Flex>

      <Text variant="body1" className="font-semibold">
        ${(unitPrice * item.quantity).toFixed(2)}
      </Text>

      <Button
        variant="plain"
        onClick={() => removeItem(item.id)}
        aria-label={`Remove ${product.title} from cart`}
        className="text-gray-400 hover:text-red-500"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </Flex>
  );
}
