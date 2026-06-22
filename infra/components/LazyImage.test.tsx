import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LazyImage from "@/infra/components/LazyImage";

describe("LazyImage", () => {
  it("renders a loading skeleton and a transparent image initially", () => {
    const { container } = render(
      <LazyImage src="/test.jpg" alt="test" width={100} height={100} />
    );
    expect(container.querySelector(".animate-pulse")).not.toBeNull();
    expect(screen.getByAltText("test")).toHaveClass("opacity-0");
  });

  it("shows the image and removes the skeleton once loaded", async () => {
    const { container } = render(
      <LazyImage src="/test.jpg" alt="test" width={100} height={100} />
    );
    fireEvent.load(screen.getByAltText("test"));
    await waitFor(() =>
      expect(screen.getByAltText("test")).toHaveClass("opacity-100")
    );
    expect(container.querySelector(".animate-pulse")).toBeNull();
  });

  it("shows a fallback message when the image fails to load", async () => {
    render(<LazyImage src="/test.jpg" alt="test" width={100} height={100} />);
    fireEvent.error(screen.getByAltText("test"));
    await waitFor(() =>
      expect(screen.getByText("No image")).toBeInTheDocument()
    );
  });

  it("sets loading to lazy when priority is not set", () => {
    render(<LazyImage src="/test.jpg" alt="test" width={100} height={100} />);
    expect(screen.getByAltText("test")).toHaveAttribute("loading", "lazy");
  });

  it("omits the loading attribute when priority is set", () => {
    render(
      <LazyImage
        src="/test.jpg"
        alt="test"
        width={100}
        height={100}
        priority
      />
    );
    expect(screen.getByAltText("test")).not.toHaveAttribute("loading");
  });

  it("merges extra className onto the image", () => {
    render(
      <LazyImage
        src="/test.jpg"
        alt="test"
        width={100}
        height={100}
        className="custom-class"
      />
    );
    expect(screen.getByAltText("test")).toHaveClass("custom-class");
  });
});
