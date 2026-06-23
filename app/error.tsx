"use client";

import { useEffect } from "react";
import ErrorState from "@/components/ErrorState";

type ErrorPageProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function Error({ error, unstable_retry }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      title="Something went wrong"
      message={error.message || "An unexpected error occurred."}
      digest={error.digest}
      onRetry={unstable_retry}
    />
  );
}
