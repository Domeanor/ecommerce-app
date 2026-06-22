import { serverFetch } from "@/infra/helpers/serverFetch";
import Box from "@/infra/components/Box";
import Grid from "@/infra/components/Grid";
import Text from "@/infra/components/Text";
import ProductCard from "@/app/_components/ProductCard";
import ErrorState from "@/components/ErrorState";
import { Product } from "@/types/product";

interface ProductsResponse {
  products: Product[];
}

export default async function HomePage() {
  const { data, error } = await serverFetch<ProductsResponse>(
    "https://dummyjson.com/products?limit=30",
    { cache: "force-cache" }
  );

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <Box>
      <Text variant="h2" className="mb-6">
        Products
      </Text>

      <Grid cols={1} smCols={2} mdCols={3} lgCols={4} gap={6}>
        {data!.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Box>
  );
}
