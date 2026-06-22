import { render } from "@testing-library/react";
import Flex from "./Flex";

function getClass(container: HTMLElement) {
  return container.firstElementChild!.className;
}

describe("Flex", () => {
  it("renders a div with flex class by default", () => {
    const { container } = render(<Flex />);
    expect(container.firstChild?.nodeName).toBe("DIV");
    expect(getClass(container)).toContain("flex");
  });

  it("applies inline-flex when inline prop is set", () => {
    const { container } = render(<Flex inline />);
    expect(getClass(container)).toContain("inline-flex");
    expect(getClass(container)).not.toContain(" flex ");
  });

  it("applies direction class for non-default direction", () => {
    const { container } = render(<Flex direction="col" />);
    expect(getClass(container)).toContain("flex-col");
  });

  it("does not apply direction class for default row direction", () => {
    const { container } = render(<Flex direction="row" />);
    expect(getClass(container)).not.toContain("flex-row");
  });

  it("applies align class", () => {
    const { container } = render(<Flex align="center" />);
    expect(getClass(container)).toContain("items-center");
  });

  it("applies justify class", () => {
    const { container } = render(<Flex justify="between" />);
    expect(getClass(container)).toContain("justify-between");
  });

  it("applies flex-wrap when wrap is set", () => {
    const { container } = render(<Flex wrap />);
    expect(getClass(container)).toContain("flex-wrap");
  });

  it("applies gap class", () => {
    const { container } = render(<Flex gap={4} />);
    expect(getClass(container)).toContain("gap-4");
  });

  it("merges extra className", () => {
    const { container } = render(<Flex className="custom" />);
    expect(getClass(container)).toContain("custom");
  });
});
