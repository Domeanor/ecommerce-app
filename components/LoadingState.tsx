import Box from "@/infra/components/Box";
import Flex from "@/infra/components/Flex";
import Text from "@/infra/components/Text";

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({
  message = "Loading...",
}: LoadingStateProps) {
  return (
    <Flex
      direction="col"
      align="center"
      justify="center"
      gap={3}
      className="min-h-[60vh]"
    >
      <Box className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />
      <Text variant="body2" className="text-gray-500">
        {message}
      </Text>
    </Flex>
  );
}
