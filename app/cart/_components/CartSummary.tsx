import Box from "@/infra/components/Box";
import Flex from "@/infra/components/Flex";
import Text from "@/infra/components/Text";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";

type CartSummaryProps = {
  items: CartItem[];
  products: Product[];
  totalCount: number;
};

export default function CartSummary({
  items,
  products,
  totalCount,
}: CartSummaryProps) {
  const totalPrice = items.reduce((sum, item, index) => {
    const product = products[index];
    const unitPrice = product.price * (1 - product.discountPercentage / 100);
    return sum + unitPrice * item.quantity;
  }, 0);

  return (
    <Box className="mt-8 border-t border-gray-200 pt-6">
      <Flex direction="col" gap={2} className="ml-auto max-w-xs">
        <Flex justify="between">
          <Text variant="body1" className="text-gray-500">
            Total items
          </Text>
          <Text variant="body1">{totalCount}</Text>
        </Flex>
        <Flex justify="between">
          <Text variant="h4">Total price</Text>
          <Text variant="h4">${totalPrice.toFixed(2)}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
