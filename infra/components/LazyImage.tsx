"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/infra/helpers/cn";

type LazyImageProps = Omit<ImageProps, "placeholder" | "onLoad" | "onError">;

type Status = "loading" | "loaded" | "error";

export default function LazyImage({ alt, className, ...props }: LazyImageProps) {
  const [status, setStatus] = useState<Status>("loading");

  return (
    <>
      {status === "loading" && (
        <span className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
      {status === "error" && (
        <span className="absolute inset-0 flex items-center justify-center bg-gray-100 text-xs text-gray-400">
          No image
        </span>
      )}
      <Image
        {...props}
        alt={alt}
        loading="lazy"
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        className={cn(
          "transition-opacity duration-300",
          status === "loaded" ? "opacity-100" : "opacity-0",
          className
        )}
      />
    </>
  );
}
