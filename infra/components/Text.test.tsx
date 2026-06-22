import { render, screen } from "@testing-library/react";
import Text from "@/infra/components/Text";

describe("Text", () => {
  it("renders the correct HTML tag for each variant", () => {
    const cases = [
      { variant: "h1", tag: "H1" },
      { variant: "h3", tag: "H3" },
      { variant: "body1", tag: "P" },
      { variant: "caption", tag: "SPAN" },
      { variant: "label", tag: "LABEL" },
    ] as const;

    for (const { variant, tag } of cases) {
      const { container, unmount } = render(
        <Text variant={variant}>content</Text>
      );
      expect(container.firstChild?.nodeName).toBe(tag);
      unmount();
    }
  });

  it("allows overriding the tag with the as prop", () => {
    const { container } = render(
      <Text variant="body1" as="section">
        hello
      </Text>
    );
    expect(container.firstChild?.nodeName).toBe("SECTION");
  });

  it("merges extra className onto the element", () => {
    render(
      <Text variant="body1" className="custom-class" data-testid="t">
        hello
      </Text>
    );
    expect(screen.getByTestId("t")).toHaveClass("custom-class");
  });
});
