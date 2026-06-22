import { ElementType, ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@/infra/helpers/cn";

type BoxOwnProps<E extends ElementType> = {
  as?: E;
  className?: string;
};

type BoxProps<E extends ElementType> = BoxOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof BoxOwnProps<E>>;

// forwardRef doesn't play nicely with generics — inner impl uses `any` and
// the exported signature is typed correctly via the cast below.
const BoxInner = forwardRef(function Box(
  { as: Tag = "div", className, ...props }: BoxProps<ElementType>,
  ref: React.Ref<Element>
) {
  return <Tag ref={ref} className={cn(className)} {...props} />;
});

BoxInner.displayName = "Box";

const Box = BoxInner as <E extends ElementType = "div">(
  props: BoxProps<E> & { ref?: React.Ref<Element> }
) => React.ReactElement;

export default Box;
