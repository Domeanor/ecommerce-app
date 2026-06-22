import { ElementType, ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@/infra/helpers/cn";

const variantStyles = {
  h1: "text-4xl font-bold tracking-tight text-gray-900",
  h2: "text-3xl font-bold tracking-tight text-gray-900",
  h3: "text-2xl font-semibold text-gray-900",
  h4: "text-xl font-semibold text-gray-900",
  h5: "text-lg font-semibold text-gray-900",
  h6: "text-base font-semibold text-gray-900",
  body1: "text-base leading-7 text-gray-700",
  body2: "text-sm leading-6 text-gray-600",
  caption: "text-xs text-gray-500",
  label: "text-sm font-medium text-gray-700",
} as const;

type Variant = keyof typeof variantStyles;

const defaultTag: Record<Variant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body1: "p",
  body2: "p",
  caption: "span",
  label: "label",
};

type TextOwnProps<E extends ElementType> = {
  as?: E;
  variant?: Variant;
  className?: string;
};

type TextProps<E extends ElementType> = TextOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof TextOwnProps<E>>;

const TextInner = forwardRef(function Text(
  {
    as,
    variant = "body1",
    className,
    ...props
  }: TextProps<ElementType>,
  ref: React.Ref<Element>
) {
  const Tag = as ?? defaultTag[variant];
  return (
    <Tag
      ref={ref}
      className={cn(variantStyles[variant], className)}
      {...props}
    />
  );
});

TextInner.displayName = "Text";

const Text = TextInner as <E extends ElementType = "p">(
  props: TextProps<E> & { ref?: React.Ref<Element> }
) => React.ReactElement;

export default Text;
