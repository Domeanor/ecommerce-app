import { SearchX } from "lucide-react";
import ErrorState from "@/components/ErrorState";

export default function NotFound() {
  return (
    <ErrorState
      icon={SearchX}
      title="Page not found"
      message="The page you're looking for doesn't exist."
    />
  );
}
