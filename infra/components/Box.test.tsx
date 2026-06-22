import { render, screen } from "@testing-library/react";
import Box from "@/infra/components/Box";

describe("Box", () => {
  it("renders a div by default", () => {
    const { container } = render(<Box>content</Box>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("renders the tag passed via the as prop", () => {
    const { container } = render(<Box as="section">content</Box>);
    expect(container.firstChild?.nodeName).toBe("SECTION");
  });

  it("merges extra className onto the element", () => {
    render(
      <Box className="custom-class" data-testid="b">
        content
      </Box>
    );
    expect(screen.getByTestId("b")).toHaveClass("custom-class");
  });

  it("forwards arbitrary props to the underlying tag", () => {
    render(<Box as="button" data-testid="b" disabled />);
    expect(screen.getByTestId("b")).toBeDisabled();
  });
});
