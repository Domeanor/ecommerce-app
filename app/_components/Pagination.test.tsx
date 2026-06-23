import { render, screen } from "@testing-library/react";
import Pagination, { getPageNumbers } from "@/app/_components/Pagination";

describe("getPageNumbers", () => {
  it("returns every page when the total is small", () => {
    expect(getPageNumbers(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("collapses pages far from the current one into a single ellipsis", () => {
    expect(getPageNumbers(1, 10)).toEqual([1, 2, "ellipsis", 10]);
  });

  it("shows pages on both sides of the current page", () => {
    expect(getPageNumbers(5, 10)).toEqual([
      1,
      "ellipsis",
      4,
      5,
      6,
      "ellipsis",
      10,
    ]);
  });

  it("never shows two ellipses back to back", () => {
    const pages = getPageNumbers(2, 4);
    const ellipsisCount = pages.filter((p) => p === "ellipsis").length;
    expect(ellipsisCount).toBeLessThanOrEqual(1);
  });

  it("handles a single page", () => {
    expect(getPageNumbers(1, 1)).toEqual([1]);
  });
});

describe("Pagination", () => {
  it("renders nothing when there is only one page", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders a link for each visible page with the right href", () => {
    render(<Pagination currentPage={1} totalPages={3} />);
    expect(screen.getByRole("link", { name: "1" })).toHaveAttribute(
      "href",
      "?page=1"
    );
    expect(screen.getByRole("link", { name: "3" })).toHaveAttribute(
      "href",
      "?page=3"
    );
  });

  it("marks the current page with aria-current", () => {
    render(<Pagination currentPage={2} totalPages={3} />);
    expect(screen.getByRole("link", { name: "2" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("link", { name: "1" })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("disables the previous link on the first page", () => {
    render(<Pagination currentPage={1} totalPages={3} />);
    expect(screen.getByLabelText("Previous page")).toHaveClass(
      "pointer-events-none"
    );
  });

  it("disables the next link on the last page", () => {
    render(<Pagination currentPage={3} totalPages={3} />);
    expect(screen.getByLabelText("Next page")).toHaveClass(
      "pointer-events-none"
    );
  });
});
