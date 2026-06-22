import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import Box from "@/infra/components/Box";
import Container from "@/infra/components/Container";
import Flex from "@/infra/components/Flex";
import Text from "@/infra/components/Text";

export default function Header() {
  return (
    <Box
      as="header"
      className="sticky top-0 z-10 border-b border-gray-200 bg-white py-4"
    >
      <Container>
        <Flex align="center" justify="between">
          <Link href="/" className="no-underline">
            <Text variant="h5">ShopNext</Text>
          </Link>

          <nav>
          <Flex align="center" gap={6}>
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 no-underline"
            >
              Home
            </Link>

            <Link
              href="/cart"
              className="no-underline"
            >
              <Flex align="center" gap={1} className="text-gray-600 hover:text-gray-900">
                <ShoppingCart className="h-4 w-4" strokeWidth={2} />
                <Text variant="label" className="text-inherit">
                  Cart
                </Text>
                <Box className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs text-white">
                  0
                </Box>
              </Flex>
            </Link>
          </Flex>
          </nav>
        </Flex>
      </Container>
    </Box>
  );
}
