import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/infra/helpers/cn";

type ButtonVariant = "solid" | "outline" | "ghost" | "text" | "plain";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantMap: Record<ButtonVariant, string> = {
  solid: "bg-gray-900 text-white hover:bg-gray-700",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  ghost: "text-gray-700 hover:bg-gray-100",
  text: "text-gray-900 underline hover:text-gray-700",
  plain: "",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "solid", type = "button", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center transition disabled:pointer-events-none disabled:opacity-50",
          variantMap[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
