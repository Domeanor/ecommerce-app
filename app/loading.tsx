import Box from "@/infra/components/Box";
import Grid from "@/infra/components/Grid";
import Text from "@/infra/components/Text";
import ProductCardSkeleton from "@/app/_components/ProductCardSkeleton";
import { PRODUCTS_PAGE_SIZE } from "@/app/_components/productsConfig";

export default function Loading() {
  return (
    <Box>
      <Text variant="h2" className="mb-6">
        Products
      </Text>

      <Grid cols={1} smCols={2} mdCols={3} lgCols={4} gap={6}>
        {Array.from({ length: PRODUCTS_PAGE_SIZE }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </Grid>
    </Box>
  );
}
