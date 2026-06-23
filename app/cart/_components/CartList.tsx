import Flex from "@/infra/components/Flex";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";
import CartItemRow from "./CartItemRow";

type CartListProps = {
  items: CartItem[];
  products: Product[];
};

export default function CartList({ items, products }: CartListProps) {
  return (
    <Flex direction="col" gap={4}>
      {items.map((item, index) => (
        <CartItemRow key={item.id} item={item} product={products[index]} />
      ))}
    </Flex>
  );
}
