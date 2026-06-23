import Link from "next/link";
import { serverFetch } from "@/infra/helpers/serverFetch";
import Box from "@/infra/components/Box";
import Flex from "@/infra/components/Flex";
import Grid from "@/infra/components/Grid";
import Text from "@/infra/components/Text";
import ProductCard from "@/app/_components/ProductCard";
import Pagination from "@/app/_components/Pagination";
import { PRODUCTS_PAGE_SIZE } from "@/app/_components/productsConfig";
import ErrorState from "@/components/ErrorState";
import { Product } from "@/types/product";

type ProductsResponse = {
  products: Product[];
  total: number;
};

type HomePageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);
  const skip = (page - 1) * PRODUCTS_PAGE_SIZE;

  const { data, error } = await serverFetch<ProductsResponse>(
    `https://dummyjson.com/products?limit=${PRODUCTS_PAGE_SIZE}&skip=${skip}`,
    { cache: "force-cache" }
  );

  if (error) {
    return <ErrorState message={error} />;
  }

  const totalPages = Math.ceil(data!.total / PRODUCTS_PAGE_SIZE);

  if (data!.products.length === 0) {
    return (
      <Flex
        direction="col"
        align="center"
        justify="center"
        gap={3}
        className="min-h-[60vh] text-center"
      >
        <Text variant="h3">No products on this page</Text>
        <Text variant="body1" className="text-gray-500">
          Try going back to the first page.
        </Text>
        <Link
          href="/"
          className="mt-2 text-sm font-medium text-gray-900 underline"
        >
          ← Back to page 1
        </Link>
      </Flex>
    );
  }

  return (
    <Box>
      <Text variant="h2" className="mb-6">
        Products
      </Text>

      <Grid cols={1} smCols={2} mdCols={3} lgCols={4} gap={6}>
        {data!.products.map((product) => (
          <ProductCard key={product.id} product={product} page={page} />
        ))}
      </Grid>

      <Pagination currentPage={page} totalPages={totalPages} />
    </Box>
  );
}
