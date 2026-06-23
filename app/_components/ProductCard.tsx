import Link from "next/link";
import Card from "@/infra/components/Card";
import Box from "@/infra/components/Box";
import Flex from "@/infra/components/Flex";
import Text from "@/infra/components/Text";
import LazyImage from "@/infra/components/LazyImage";
import { Product } from "@/types/product";
import AddToCartControl from "@/components/AddToCartControl";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group no-underline">
      <Card hoverable className="flex flex-col overflow-hidden h-full">
        <Box className="relative h-48 w-full isolate bg-gray-100">
          <LazyImage
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
          />
          <Box className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 shadow-sm">
            <Text variant="caption" className="text-yellow-500 text-sm">
              ★ {product.rating.toFixed(1)}
            </Text>
          </Box>
        </Box>

        <Flex direction="col" gap={2} className="flex-1 p-4">
          <Text
            variant="body2"
            className="font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600"
          >
            {product.title}
          </Text>

          <Flex align="center" justify="between" className="mt-auto">
            <Text variant="h6">${product.price}</Text>
            <AddToCartControl product={product} variant="compact" />
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
}
