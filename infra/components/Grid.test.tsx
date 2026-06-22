import { render } from "@testing-library/react";
import Grid from "./Grid";

function getClass(container: HTMLElement) {
  return container.firstElementChild!.className;
}

describe("Grid", () => {
  it("renders a div with grid class by default", () => {
    const { container } = render(<Grid />);
    expect(container.firstChild?.nodeName).toBe("DIV");
    expect(getClass(container)).toContain("grid");
  });

  it("applies the correct base column class", () => {
    const { container } = render(<Grid cols={3} />);
    expect(getClass(container)).toContain("grid-cols-3");
  });

  it("applies responsive column classes", () => {
    const { container } = render(<Grid cols={1} smCols={2} mdCols={3} lgCols={4} />);
    const cls = getClass(container);
    expect(cls).toContain("grid-cols-1");
    expect(cls).toContain("sm:grid-cols-2");
    expect(cls).toContain("md:grid-cols-3");
    expect(cls).toContain("lg:grid-cols-4");
  });

  it("applies gap class when gap is provided", () => {
    const { container } = render(<Grid gap={6} />);
    expect(getClass(container)).toContain("gap-6");
  });

  it("merges extra className", () => {
    const { container } = render(<Grid className="custom" />);
    expect(getClass(container)).toContain("custom");
  });
});
