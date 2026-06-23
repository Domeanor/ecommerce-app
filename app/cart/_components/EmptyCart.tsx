import Link from "next/link";
import Flex from "@/infra/components/Flex";
import Text from "@/infra/components/Text";

export default function EmptyCart() {
  return (
    <Flex
      direction="col"
      align="center"
      justify="center"
      gap={3}
      className="min-h-[60vh] text-center"
    >
      <Text variant="h3">Your cart is empty</Text>
      <Text variant="body1" className="text-gray-500">
        Browse products and add something you like.
      </Text>
      <Link
        href="/"
        className="mt-2 text-sm font-medium text-gray-900 underline"
      >
        ← Continue shopping
      </Link>
    </Flex>
  );
}
