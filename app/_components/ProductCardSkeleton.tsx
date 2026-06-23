import Card from "@/infra/components/Card";
import Box from "@/infra/components/Box";
import Flex from "@/infra/components/Flex";

export default function ProductCardSkeleton() {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <Box className="h-48 w-full animate-pulse bg-gray-200" />

      <Flex direction="col" gap={2} className="flex-1 p-4">
        <Box className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <Box className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />

        <Flex align="center" justify="between" className="mt-auto">
          <Box className="h-5 w-12 animate-pulse rounded bg-gray-200" />
          <Box className="h-7 w-7 animate-pulse rounded-full bg-gray-200" />
        </Flex>
      </Flex>
    </Card>
  );
}
