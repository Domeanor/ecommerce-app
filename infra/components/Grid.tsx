import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/infra/helpers/cn";

type ColCount = 1 | 2 | 3 | 4 | 5 | 6 | 12;

type GridProps = HTMLAttributes<HTMLDivElement> & {
  cols?: ColCount;
  smCols?: ColCount;
  mdCols?: ColCount;
  lgCols?: ColCount;
  gap?: number;
};

const colClass = (prefix: string, count: ColCount) =>
  `${prefix}grid-cols-${count}`;

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ cols = 1, smCols, mdCols, lgCols, gap, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          colClass("", cols),
          smCols && colClass("sm:", smCols),
          mdCols && colClass("md:", mdCols),
          lgCols && colClass("lg:", lgCols),
          gap !== undefined && `gap-${gap}`,
          className
        )}
        {...props}
      />
    );
  }
);

Grid.displayName = "Grid";

export default Grid;
