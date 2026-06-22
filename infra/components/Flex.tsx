import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/infra/helpers/cn";

type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "col" | "row-reverse" | "col-reverse";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  gap?: Gap;
  inline?: boolean;
}

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      direction = "row",
      align,
      justify,
      wrap,
      gap,
      inline,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          inline ? "inline-flex" : "flex",
          direction !== "row" && `flex-${direction}`,
          align && alignMap[align],
          justify && justifyMap[justify],
          wrap && "flex-wrap",
          gap !== undefined && `gap-${gap}`,
          className
        )}
        {...props}
      />
    );
  }
);

Flex.displayName = "Flex";

export default Flex;
