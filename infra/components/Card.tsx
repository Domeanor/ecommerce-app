import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/infra/helpers/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hoverable, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-gray-200 bg-white shadow-sm",
          hoverable && "transition hover:shadow-md",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export default Card;
