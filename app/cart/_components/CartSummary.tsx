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
  const { totalPrice, totalOriginalPrice } = items.reduce(
    (totals, item, index) => {
      const product = products[index];
      const unitPrice = product.price * (1 - product.discountPercentage / 100);
      return {
        totalPrice: totals.totalPrice + unitPrice * item.quantity,
        totalOriginalPrice:
          totals.totalOriginalPrice + product.price * item.quantity,
      };
    },
    { totalPrice: 0, totalOriginalPrice: 0 }
  );
  const totalSaved = totalOriginalPrice - totalPrice;

  return (
    <Box className="mt-8 border-t border-gray-200 pt-6">
      <Flex direction="col" gap={2} className="ml-auto max-w-xs">
        <Flex justify="between">
          <Text variant="body1" className="text-gray-500">
            Total items
          </Text>
          <Text variant="body1">{totalCount}</Text>
        </Flex>

        {totalSaved > 0 && (
          <>
            <Flex justify="between">
              <Text variant="body2" className="text-gray-500">
                Original price
              </Text>
              <Text variant="body2" className="text-gray-400 line-through">
                ${totalOriginalPrice.toFixed(2)}
              </Text>
            </Flex>
            <Flex justify="between">
              <Text variant="body2" className="font-semibold text-green-600">
                You saved
              </Text>
              <Text variant="body2" className="font-semibold text-green-600">
                ${totalSaved.toFixed(2)}
              </Text>
            </Flex>
          </>
        )}

        <Flex justify="between">
          <Text variant="h4">Total price</Text>
          <Text variant="h4">${totalPrice.toFixed(2)}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
