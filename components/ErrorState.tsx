import Link from "next/link";
import { AlertTriangle, type LucideIcon } from "lucide-react";
import Button from "@/infra/components/Button";
import Flex from "@/infra/components/Flex";
import Text from "@/infra/components/Text";

type ErrorStateProps = {
  icon?: LucideIcon;
  title?: string;
  message: string;
  digest?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  icon: Icon = AlertTriangle,
  title = "Something went wrong",
  message,
  digest,
  onRetry,
}: ErrorStateProps) {
  return (
    <Flex
      direction="col"
      align="center"
      justify="center"
      gap={3}
      className="min-h-[60vh] text-center"
    >
      <Icon className="h-10 w-10 text-gray-400" strokeWidth={1.5} />
      <Text variant="h3">{title}</Text>
      <Text variant="body1" className="text-gray-500">
        {message}
      </Text>
      {digest && (
        <Text variant="caption" className="text-gray-400">
          Error ID: {digest}
        </Text>
      )}
      <Flex align="center" gap={4} className="mt-2">
        {onRetry && (
          <Button variant="text" onClick={onRetry} className="text-sm font-medium">
            Try again
          </Button>
        )}
        <Link href="/" className="text-sm font-medium text-gray-900 underline">
          ← Back to home
        </Link>
      </Flex>
    </Flex>
  );
}
