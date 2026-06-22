import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/infra/helpers/cn";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const maxWidthMap = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
  full: "max-w-full",
};

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ maxWidth = "xl", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mx-auto w-full px-6", maxWidthMap[maxWidth], className)}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export default Container;
