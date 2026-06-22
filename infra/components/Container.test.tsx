import { render, screen } from "@testing-library/react";
import Container from "@/infra/components/Container";

describe("Container", () => {
  it("renders a div with the default xl max-width", () => {
    render(<Container data-testid="c">content</Container>);
    expect(screen.getByTestId("c")).toHaveClass("max-w-6xl");
  });

  it("applies the max-width class for the given prop", () => {
    render(
      <Container maxWidth="sm" data-testid="c">
        content
      </Container>
    );
    expect(screen.getByTestId("c")).toHaveClass("max-w-2xl");
  });

  it("merges extra className onto the element", () => {
    render(
      <Container className="custom-class" data-testid="c">
        content
      </Container>
    );
    expect(screen.getByTestId("c")).toHaveClass("custom-class");
  });
});
