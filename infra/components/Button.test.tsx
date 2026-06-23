import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/infra/components/Button";

describe("Button", () => {
  it("renders a button element with type=button by default", () => {
    render(<Button data-testid="b">click</Button>);
    const button = screen.getByTestId("b");
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("type", "button");
  });

  it("respects an explicit type prop", () => {
    render(
      <Button type="submit" data-testid="b">
        submit
      </Button>
    );
    expect(screen.getByTestId("b")).toHaveAttribute("type", "submit");
  });

  it("applies the solid variant by default", () => {
    render(<Button data-testid="b">click</Button>);
    expect(screen.getByTestId("b")).toHaveClass("bg-gray-900", "text-white");
  });

  it("applies the requested variant", () => {
    render(
      <Button variant="outline" data-testid="b">
        click
      </Button>
    );
    expect(screen.getByTestId("b")).toHaveClass("border", "border-gray-300");
  });

  it("applies no default colors for the plain variant", () => {
    render(
      <Button variant="plain" data-testid="b">
        click
      </Button>
    );
    expect(screen.getByTestId("b")).not.toHaveClass("bg-gray-900");
  });

  it("merges extra className onto the element", () => {
    render(
      <Button className="custom-class" data-testid="b">
        click
      </Button>
    );
    expect(screen.getByTestId("b")).toHaveClass("custom-class");
  });

  it("fires onClick", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>click</Button>);
    fireEvent.click(screen.getByText("click"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("respects the disabled prop", () => {
    render(<Button disabled data-testid="b">click</Button>);
    expect(screen.getByTestId("b")).toBeDisabled();
  });

  it("shows a pointer cursor, overriding Tailwind's default-cursor reset on buttons", () => {
    render(<Button data-testid="b">click</Button>);
    expect(screen.getByTestId("b")).toHaveClass("cursor-pointer");
  });

  it("shows a not-allowed cursor when disabled", () => {
    render(<Button disabled data-testid="b">click</Button>);
    expect(screen.getByTestId("b")).toHaveClass("disabled:cursor-not-allowed");
  });
});
