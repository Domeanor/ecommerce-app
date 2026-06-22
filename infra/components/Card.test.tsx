import { render, screen } from "@testing-library/react";
import Card from "@/infra/components/Card";

describe("Card", () => {
  it("renders a div with the base card styling", () => {
    render(<Card data-testid="c">content</Card>);
    expect(screen.getByTestId("c")).toHaveClass("rounded-xl", "border");
  });

  it("does not apply hover styles by default", () => {
    render(<Card data-testid="c">content</Card>);
    expect(screen.getByTestId("c")).not.toHaveClass("hover:shadow-md");
  });

  it("applies hover styles when hoverable is set", () => {
    render(
      <Card hoverable data-testid="c">
        content
      </Card>
    );
    expect(screen.getByTestId("c")).toHaveClass("hover:shadow-md");
  });

  it("merges extra className onto the element", () => {
    render(
      <Card className="custom-class" data-testid="c">
        content
      </Card>
    );
    expect(screen.getByTestId("c")).toHaveClass("custom-class");
  });
});
