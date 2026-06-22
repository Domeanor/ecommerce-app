import Link from "next/link";
import Box from "@/infra/components/Box";
import Flex from "@/infra/components/Flex";
import Text from "@/infra/components/Text";
import LazyImage from "@/infra/components/LazyImage";
import { Product } from "@/types/product";
import AddToCartButton from "./AddToCartButton";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const discountedPrice = (
    product.price * (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <Box>
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 no-underline"
      >
        ← Back to products
      </Link>

      <Flex direction="col" gap={8} className="mt-6 lg:flex-row">
        {/* Image */}
        <Box className="relative w-full h-80 shrink-0 overflow-hidden rounded-xl bg-gray-100 lg:w-1/2 lg:h-[480px]">
          <LazyImage
            src={product.images[0] ?? product.thumbnail}
            alt={product.title}
            fill
            className="object-contain p-6"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </Box>

        {/* Details */}
        <Flex direction="col" gap={4} className="flex-1 min-w-0">
          <Text variant="h2" className="break-words">
            {product.title}
          </Text>

          {/* Price row */}
          <Flex align="center" gap={3}>
            <Text variant="h3" className="text-gray-900">
              ${discountedPrice}
            </Text>
            <Text
              variant="body2"
              className="line-through text-gray-400"
            >
              ${product.price}
            </Text>
            <Box className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
              -{product.discountPercentage}% off
            </Box>
          </Flex>

          {/* Rating */}
          <Flex align="center" gap={2}>
            <Text variant="caption" className="text-yellow-500 text-base">
              {"★".repeat(Math.round(product.rating))}
              {"☆".repeat(5 - Math.round(product.rating))}
            </Text>
            <Text variant="caption">{product.rating.toFixed(1)} / 5</Text>
          </Flex>

          {/* Divider */}
          <Box className="h-px bg-gray-200" />

          {/* Description */}
          <Text
            variant="body1"
            className="text-gray-600 leading-relaxed break-words"
          >
            {product.description}
          </Text>

          <AddToCartButton />
        </Flex>
      </Flex>
    </Box>
  );
}
