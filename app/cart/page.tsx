"use client";

import { useMemo } from "react";
import Box from "@/infra/components/Box";
import Text from "@/infra/components/Text";
import ErrorState from "@/components/ErrorState";
import LoadingState from "@/components/LoadingState";
import { useCart } from "@/app/_components/CartProvider";
import { useFetchQuery } from "@/infra/hooks/useFetchQuery";
import { Product } from "@/types/product";
import EmptyCart from "./_components/EmptyCart";
import CartList from "./_components/CartList";
import CartSummary from "./_components/CartSummary";

export default function CartPage() {
  const { items, totalCount } = useCart();

  const urls = useMemo(
    () => items.map((item) => `https://dummyjson.com/products/${item.id}`),
    [items]
  );
  const { data: products, loading, error } = useFetchQuery<Product>(urls);

  if (items.length === 0) return <EmptyCart />;
  if (loading) return <LoadingState message="Loading cart..." />;
  if (error) return <ErrorState message={error} />;

  return (
    <Box>
      <Text variant="h2" className="mb-6">
        Cart
      </Text>

      <CartList items={items} products={products!} />
      <CartSummary items={items} products={products!} totalCount={totalCount} />
    </Box>
  );
}
