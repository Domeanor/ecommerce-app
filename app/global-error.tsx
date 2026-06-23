"use client";

import { useEffect } from "react";
import { Geist } from "next/font/google";
import ErrorState from "@/components/ErrorState";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

type GlobalErrorProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

export default function GlobalError({ error, unstable_retry }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className="h-full">
      <body className={`${geist.className} min-h-full bg-gray-50 antialiased`}>
        <ErrorState
          title="Something went wrong"
          message={error.message || "An unexpected error occurred."}
          digest={error.digest}
          onRetry={unstable_retry}
        />
      </body>
    </html>
  );
}
